import React from 'react'
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Button,
  Center,
  Text,
  Stack
} from '@chakra-ui/react'
import { CartController } from '../../function/cart.controller'
import { useRecoilValue } from 'recoil'
import { cart as atomCart, currentRestaurant as atomCurrentRestaurant } from '../../recoil'
import { OrderCard } from './orderCard'
import { AskPaymentMethod } from './askPaymentMethod'
import { LoadingAnimation } from '../loadingAnimation'

import liff from '@line/liff'
import axios from 'axios'

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

export default function CartDrawer() {
  const cart = useRecoilValue(atomCart)
  const currentRestaurant = useRecoilValue(atomCurrentRestaurant)
  const [isCheckout, setIsCheckout] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  React.useEffect(() => {
    liff.ready.then(() => {
      backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
    })
  }, [])

  function GetTotalPrice() {
    const total = CartController.getTotalPrice(cart)
    return <>{total}</>
  }

  async function checkout(bypass = false) {
    setIsLoading(true)
    let deepLink
    const payload = await backendInstance.post('/order/create', {
      selectedMenu: cart.map(object => ({ ...object })),
      restaurantId: currentRestaurant
    })
    console.log(payload.data)
    const scb = await backendInstance.post('/transaction/create', {
      payAmount: payload.data.totalAmount,
      orderId: payload.data.id,
      bypass: bypass
    })
    console.log(scb.data)

    if (bypass) {
      await backendInstance.post('/scb/webhook', {
        transactionId: scb.data.transactionId,
        bypass: bypass
      })
      const index = scb.data.deeplinkUrl.indexOf('?callback_url=') + 14
      deepLink = scb.data.deeplinkUrl.substring(index)
    }
    deepLink = scb.data.deeplinkUrl
    window.open(deepLink)
    setIsLoading(false)
    CartController.clear()
  }

  if (cart.length > 0)
    return (
      <>
        <Flex justify="center" p={3}>
          <Button ref={btnRef} bg="#38A169" color="white" onClick={onOpen} w="100%">
            <Center>View Basket</Center>
            <Text marginLeft="auto">
              {'฿'}
              {<GetTotalPrice />}
            </Text>
          </Button>
        </Flex>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          size="xl"
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>My Basket{' ชื่อร้านอาหาร'}</DrawerHeader>

              <DrawerBody>
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
                {isCheckout && <AskPaymentMethod setIsOpen={setIsCheckout} checkout={checkout} />}
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Stack w="100%">
                  <Flex>
                    <Text fontSize="lg" marginRight="auto">
                      Total
                    </Text>
                    <Text fontSize="lg" marginLeft="auto">
                      ฿{<GetTotalPrice />}
                    </Text>
                  </Flex>
                  <Flex>
                    <Button variant="outline" mr={3} onClick={() => CartController.clear()} w="20%">
                      Clear
                    </Button>
                    <Button
                      colorScheme="blue"
                      textColor="white"
                      onClick={() => setIsCheckout(true)}
                      w="80%"
                    >
                      Checkout
                    </Button>
                  </Flex>
                </Stack>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
    )
  return ''
}
