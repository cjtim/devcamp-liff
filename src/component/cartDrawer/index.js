import React from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { Cart } from './cartDrawer'
import { CartController } from '../../function/cart.controller'
import { useRecoilValue } from 'recoil'
import { cart as atomCart, currentRestaurant as atomCurrentRestaurant } from '../../recoil'
import { OrderCard } from './orderCard'
import { ApiController } from '../../function/api.controller'
import { LoadingAnimation } from '../loadingAnimation'

export default function CartDrawer() {
  const cart = useRecoilValue(atomCart)
  const currentRestaurant = useRecoilValue(atomCurrentRestaurant)
  const [isLoading, setIsLoading] = React.useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  async function onClearBtn() {
    onClose()
    CartController.clear()
  }

  async function onCheckoutBtn() {
    setIsLoading(true)
    const deepLink = await ApiController.checkout(cart, currentRestaurant)
    window.open(deepLink)
    CartController.clear()
    setIsLoading(false)
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
        </Cart>
      </>
    )
  return ''
}
