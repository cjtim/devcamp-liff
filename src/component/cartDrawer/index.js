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
import {
  cart as atomCart,
  currentRestaurant as atomCurrentRestaurant
  // lineAcctoken as atomLineAccToken
} from '../../recoil'
import { OrderCard } from './orderCard'
import { AskPaymentMethod } from './askPaymentMethod'
import { LoadingAnimation } from '../loadingAnimation'
import bent from 'bent'

const getJSON = bent(process.env.REACT_APP_BACKEND_URL, 'json', 'POST')
const getString = bent(process.env.REACT_APP_BACKEND_URL, 'string', 'POST')
const displayName = localStorage.getItem('displayName')

export function CartDrawer() {
  const cart = useRecoilValue(atomCart)
  const currentRestaurant = useRecoilValue(atomCurrentRestaurant)
  const [isCheckout, setIsCheckout] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()


  function GetTotalPrice() {
    const total = CartController.getTotalPrice(cart)
    return <>{total}</>
  }

  function checkout(bypass = false) {
    setIsLoading(true)
    const accToken = localStorage.getItem('lineToken')
    alert('Checking out line acc token is: ' + accToken)
    createOrder(cart, currentRestaurant, accToken, bypass)
      .then(order => {
        console.log(order)
        createTransaction(order, accToken, bypass).then(deepLink => {
          console.log(deepLink)
          window.open(deepLink, '_blank')
          CartController.clear()
          setIsLoading(false)
        })
      })
      .catch(e => {
        setIsLoading(false)
        alert(e)
        console.log(e)
      })
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
              <DrawerHeader>รายการอาหารของ {displayName}</DrawerHeader>

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

async function createOrder(cart, currentRestaurant, accToken, bypass = false) {
  return await getJSON(
    '/order/create',
    {
      selectedMenu: cart.map(object => ({ ...object })),
      restaurantId: currentRestaurant
    },
    {
      authorization: `Bearer ${accToken}`
    }
  )
}
async function createTransaction(order, accToken, bypass = false) {
  const transaction = await getJSON(
    '/transaction/create',
    {
      payAmount: order.totalAmount,
      orderId: order.id,
      bypass: bypass
    },
    {
      authorization: `Bearer ${accToken}`
    }
  )
  let deepLink = transaction.deeplinkUrl
  if (bypass) {
    getString('/scb/webhook', {
      transactionId: transaction.transactionId,
      bypass: bypass
    })
    const index = deepLink.indexOf('?callback_url=') + 14
    deepLink = deepLink.substring(index)
  }
  return deepLink
}
