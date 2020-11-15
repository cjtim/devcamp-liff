import React from 'react'
import { useDisclosure } from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button
} from '@chakra-ui/react'
import liff from '@line/liff'
import axios from 'axios'
import { HamburgerIcon } from '@chakra-ui/icons'
import { IconButton, Flex, Spinner } from '@chakra-ui/react'
import { cart as atomCart } from '../../recoil'
import { useRecoilState } from 'recoil'
import { MenuCard } from '../menuCard'

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

export default function CartDrawer() {
  // Drawer controller
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  // State
  const [cart, setCart] = useRecoilState(atomCart)
  const [isLoading, setIsLoading] = React.useState(false)
  // First load
  React.useEffect(() => {
    ;(async () => {
      await liff.ready
      backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
      // Get cart data from localstorage if exist
      // localstorage is not realtime sync like recoil
      const localCart = localStorage.getItem('cart')
      if (localCart) setCart(JSON.parse(localCart))
    })()
  }, [])

  function onClearBtn() {
    onClose()
    setCart([])
    localStorage.setItem('cart', [])
  }

  async function onCheckoutBtn() {
    setIsLoading(true)
    try {
      const scb = await checkout(cart)
      window.open('/redirect?url=' + scb.deeplinkUrl)
      setCart([])
      localStorage.setItem('cart', [])
      onClose()
    } catch (e) {
      alert(e.message)
    }
    setIsLoading(false)
  }

  return (
    <Cart
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      btnRef={btnRef}
      onClearBtn={onClearBtn}
      onCheckoutBtn={async () => onCheckoutBtn()}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading &&
        cart.selectedMenu &&
        cart.selectedMenu.map((i, index) => {
          return (
            <MenuCard key={index} name={i.name} img={i.img} url={'/menu/' + i.id} price={i.unit} />
          )
        })}
      {!cart.selectedMenu && !isLoading && 'Cart is empty'}
    </Cart>
  )
}

async function checkout(cart) {
  const payload = await backendInstance.post('/order/create', cart)
  console.log(payload.data)
  const scb = await backendInstance.post('/transaction/create', {
    payAmount: payload.data.totalAmount,
    orderId: payload.data.id
  })
  console.log(scb.data)
  return scb.data
}

function LoadingSpinner() {
  return (
    <Flex justify="center" alignItems="center" justifyContent="center" height="50%">
      <Spinner size="xl" thickness="4px" />
    </Flex>
  )
}
function Cart({ children, isOpen, onOpen, onClose, btnRef, onClearBtn, onCheckoutBtn }) {
  return (
    <>
      <Flex justify="center">
        <IconButton
          alignSelf="flex-end"
          marginBottom="36"
          aria-label="Cart Icon"
          ref={btnRef}
          colorScheme="teal"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          w="90%"
        >
          Open
        </IconButton>
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="xl">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Cart</DrawerHeader>
            <DrawerBody>{children}</DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClearBtn}>
                Clear
              </Button>
              <Button colorScheme="blue" textColor="white" onClick={onCheckoutBtn}>
                Checkout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
