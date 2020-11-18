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
import { StateController } from '../../function/state'
import { useRecoilValue } from 'recoil'
import {
  cart as atomCart,
  currentRestaurant as atomCurrentRestaurant,
} from '../../recoil'

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
  const cart = useRecoilValue(atomCart)
  const currentRestaurant = useRecoilValue(atomCurrentRestaurant)
  const [isLoading, setIsLoading] = React.useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  
  React.useEffect(() => {
    ;(async () => {
      await liff.ready
      backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
    })()
  }, [])

  async function setNote(noteText, menuId) {
    await StateController.setOrderNote(noteText, menuId)
  }
  async function onClearBtn() {
    onClose()
    StateController.clear()
  }

  async function onCheckoutBtn() {
    setIsLoading(true)
    try {
      const scb = await checkout(
        cart.map(object => ({ ...object })),
        currentRestaurant
      )
      window.location.href = scb.deeplinkUrl
      // window.open('/redirect?url=' + scb.deeplinkUrl)
      StateController.clear()
      onClose()
    } catch (e) {
      alert(e.message)
    }
    setIsLoading(false)
  }
  function TotalPrice() {
    let total = StateController.getTotalPrice(cart)
    return <>{total}</>
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
        total={<TotalPrice />}
      >
        {isLoading && <LoadingSpinner />}
        {!isLoading &&
          cart &&
          cart.map((i, index) => {
            return (
              <OrderCard
                key={index}
                name={i.name}
                id={i.menuId}
                img={i.img}
                note={i.note}
                price={i.price}
                unit={i.unit}
                setNote={setNote}
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
function Cart({ children, isOpen, onOpen, onClose, btnRef, onClearBtn, onCheckoutBtn, total }) {
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
                    ฿{total}
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

function OrderCard({ id, name, note, price, img, unit, restaurantId, url, setNote }) {
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
            <Flex justify="center" flexDir="column" marginLeft="auto">
              <Text fontSize="md" fontFamily="prompt" marginLeft="auto">
                {`${unit} หน่วย`}
              </Text>
              <Text fontSize="md" fontFamily="prompt" marginLeft="auto">
                {price * unit + ' บาท'}
              </Text>
            </Flex>
          </Flex>
          <Input
            placeholder="Note เช่น ไม่เผ็ด"
            size="md"
            value={note}
            onChange={e => setNote(e.target.value, id)}
          />
        </Box>
      </Flex>
    </Link>
  )
}
