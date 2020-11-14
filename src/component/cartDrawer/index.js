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

export default function CartDrawer() {
  const [cart, setCart] = useRecoilState(atomCart)
  const [isLoading, setIsLoading] = React.useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  React.useEffect(() => {
    ;(async () => {
      await liff.ready
      backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
      console.log((await backendInstance.get('')).data)
      const localCart = localStorage.getItem('cart')
      if (localCart) setCart(JSON.parse(localCart))

    })()
  }, [])
  return (
    <>
      <IconButton
        aria-label="Search database"
        ref={btnRef}
        colorScheme="teal"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        position="fixed"
        right="10px"
        
      >
        Open
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'xl'}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Cart</DrawerHeader>

            <DrawerBody>
              {isLoading && (
                <Flex
                  justify="center"
                  alignItems="center"
                  justifyContent="center"
                  height="50%"
                >
                  <Spinner size="xl" thickness="4px" />
                </Flex>
              )}
              {!isLoading &&
                cart.selectedMenu &&
                cart.selectedMenu.map((i, index) => {
                  return (
                    <MenuCard
                      key={index}
                      name={i.name}
                      img={i.img}
                      url={'/menu/' + i.id}
                      price={i.unit}
                    />
                  )
                })}
            </DrawerBody>

            <DrawerFooter>
              <Button
                variant="outline"
                mr={3}
                onClick={() => {
                  onClose()
                  setCart([])
                  localStorage.setItem('cart', [])
                }}
              >
                Clear
              </Button>
              <Button
                colorScheme="blue"
                textColor="white"
                onClick={async () => {
                  setIsLoading(true)
                  try {
                    const scb = await createSCBLink(cart)
                    liff.openWindow({
                      url: '/redirect?url=' + scb.deeplinkUrl
                    })
                    setCart([])
                    localStorage.setItem('cart', [])
                    onClose()
                  } catch (e) {
                    alert(e.message)
                  }
                  setIsLoading(false)
                }}
              >
                Checkout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

async function createSCBLink(cart) {
  const payload = await backendInstance.post('/order/create', cart)
  console.log(payload.data)
  const scb = await backendInstance.post('/transaction/create', {
    payAmount: payload.data.totalAmount,
    orderId: payload.data.id
  })
  console.log(scb.data)
  return scb.data
}
