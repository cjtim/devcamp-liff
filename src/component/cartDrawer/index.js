import React from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { Cart } from './cartDrawer'
import { CartController } from '../../function/cart.controller'
import { useRecoilValue } from 'recoil'
import { cart as atomCart, currentRestaurant as atomCurrentRestaurant } from '../../recoil'
import { OrderCard } from './orderCard'
import { AskPaymentMethod } from './askPaymentMethod'
import { LoadingAnimation } from '../loadingAnimation'
import { ApiController } from '../../function/api.controller'

export default function CartDrawer() {
  const cart = useRecoilValue(atomCart)
  const currentRestaurant = useRecoilValue(atomCurrentRestaurant)
  const [isCheckout, setIsCheckout] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  async function onClearBtn() {
    onClose()
    CartController.clear()
  }

  async function onCheckoutBtn() {
    setIsCheckout(true)
    // setIsLoading(false)
  }
  async function payWithSCB() {
    setIsLoading(true)
    const deepLink = await ApiController.checkout(cart, currentRestaurant)
    window.open(deepLink)
    CartController.clear()
    window.location.reload()
  }
  async function bypassPayment() {
    setIsLoading(true)
    const deepLink = await ApiController.checkout(cart, currentRestaurant, true)
    window.open(deepLink)
    CartController.clear()
    window.location.reload()
  }

  if (cart.length > 0)
    return (
      <>
        <Cart
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          btnRef={btnRef}
          onClearBtn={onClearBtn}
          onCheckoutBtn={onCheckoutBtn}
          total={CartController.getTotalPrice(cart)}
        >
          {isLoading && <LoadingAnimation height="50%" />}
          {!isLoading &&
            cart &&
            cart.map((i, index) => {
              return (
                <OrderCard
                  key={index}
                  name={i.name}
                  id={i.id}
                  menuId={i.menuId}
                  img={i.img}
                  note={i.note}
                  price={i.price}
                  unit={i.unit}
                />
              )
            })}
          {!cart && !isLoading && 'Cart is empty'}
          {isCheckout && (
            <AskPaymentMethod
              isOpen={isCheckout}
              setIsOpen={setIsCheckout}
              bypassPayment={bypassPayment}
              payWithSCB={payWithSCB}
            />
          )}
        </Cart>
      </>
    )
  return ''
}
