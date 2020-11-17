import React from 'react'
import { Stack, Text, useDisclosure, Box, Image, Heading, Link, Input } from '@chakra-ui/react'
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
import { cart as atomCart, currentRestaurant as atomCurrentRestaurant } from '../../recoil'
import { useRecoilState, useRecoilValue } from 'recoil'

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

async function checkout(cart, restaurantId) {
  const payload = await backendInstance.post('/order/create', {
    selectedMenu: cart,
    restaurantId: restaurantId
  })
  console.log(payload.data)
  const scb = await backendInstance.post('/transaction/create', {
    payAmount: payload.data.totalAmount,
    orderId: payload.data.id
  })
  console.log(scb.data)
  return scb.data
}
export default function CartDrawer() {
  // Drawer controller
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  // State
  const [cart, setCart] = useRecoilState(atomCart)
  const [isLoading, setIsLoading] = React.useState(false)
  const currentRestaurant = useRecoilValue(atomCurrentRestaurant)
  // First load
  React.useEffect(() => {
    ;(async () => {
      await liff.ready
      backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
    })()
  }, [])

  function onClearBtn() {
    onClose()
    setCart([])
    localStorage.removeItem('cart')
  }

  async function onCheckoutBtn() {
    setIsLoading(true)
    try {
      console.log(cart.map(object => ({ ...object })))
      console.log(currentRestaurant)
      const scb = await checkout(cart.map(object => ({ ...object }))  , currentRestaurant)
      window.open('/redirect?url=' + scb.deeplinkUrl)
      setCart([])
      localStorage.removeItem('cart')
      onClose()
    } catch (e) {
      alert(e.message)
    }
    setIsLoading(false)
  }
  if (cart.length > 0)
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
          cart &&
          cart.map((i, index) => {
            return (
              <OrderCard
                key={index}
                name={i.name}
                id={i.id}
                img={i.img}
                note={i.note}
                price={i.price}
                unit={i.unit}
              />
            )
          })}
        {!cart && !isLoading && 'Cart is empty'}
      </Cart>
    )
  return ''
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
      <Drawer isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef} size="xl">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Cart</DrawerHeader>
            <DrawerBody>{children}</DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Stack>
                <Flex>
                  <Text fontSize="lg" marginRight="auto">
                    Total
                  </Text>
                  <Text fontSize="lg" marginLeft="auto">
                    ฿100
                  </Text>
                </Flex>
                <Flex>
                  <Button variant="outline" mr={3} onClick={onClearBtn}>
                    Clear
                  </Button>
                  <Button colorScheme="blue" textColor="white" onClick={onCheckoutBtn}>
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
}

function OrderCard({ id, name, note, price, img, unit, restaurantId, url }) {
  return (
    <Link href={url} style={{ textDecoration: 'none' }}>
      <Flex justify="center">
        <Box w="md" borderWidth="1px" rounded="lg" py={2} overflow="hidden" bg="white">
          <Flex alignContent="center" alignItems="center">
            <Box width="120px" height="100px">
              <Image
                src={img}
                objectFit="cover"
                w="100%"
                height="100%"
                alt={'รูปร้านเมนู ' + name}
                rounded="lg"
              />
            </Box>
            <Box px={2}>
              <Heading size="md" fontFamily="'Prompt'">
                {name}
              </Heading>
            </Box>
            <Text fontSize="md" fontFamily="prompt" marginLeft="auto">
              {'total ' + price * unit + ' บาท'}
            </Text>
          </Flex>
          <Input placeholder="Note เช่น ไม่เผ็ด" size="md" />
        </Box>
      </Flex>
    </Link>
  )
}
