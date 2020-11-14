import React from 'react'
import { Flex, Button, useToast } from '@chakra-ui/react'
import { orderPayload } from './../../mockupData'
import CartDrawer from '../../component/cartDrawer'
import { cart as atomCart} from './../../recoil'
import { useSetRecoilState } from 'recoil'


export function Home() {
  const toast = useToast()
  const setcart = useSetRecoilState(atomCart)
  return (
    <main>
      <Flex justify="center" py={4}>
        <Button
          colorScheme="blue"
          color="white"
          onClick={async () => {
            setcart(orderPayload)
            toast({
              title: "เพิ่มเมนูลงตระกร้าแล้ว",
              description: "ลองกดปุ่มตระกร้าเลย!",
              status: "success",
              duration: 5000,
              isClosable: true,
            })
          }}
        >
          Add Menu to cart
        </Button>
      </Flex>
      <CartDrawer />
    </main>
  )
}

