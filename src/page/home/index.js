import React from 'react'
import { Flex, Button, useToast } from '@chakra-ui/react'
import { orderPayload } from './../../mockupData'
import { cart as atomCart} from './../../recoil'
import { useSetRecoilState } from 'recoil'
import { PageLayout } from '../../component/pageLayout'


export function Home() {
  const toast = useToast()
  const setcart = useSetRecoilState(atomCart)
  return (
    <PageLayout>
      <Flex justify="center" py={4}>
        <Button
          colorScheme="blue"
          color="white"
          onClick={async () => {
            setcart(orderPayload)
            localStorage.setItem('cart', JSON.stringify(orderPayload))
            toast({
              title: "เพิ่มเมนูลงตระกร้าแล้ว",
              description: "ลองกดปุ่มตระกร้าเลย!",
              status: "success",
              duration: 4000,
              isClosable: true,
            })
          }}
        >
          Add Menu to cart
        </Button>
      </Flex>
    </PageLayout>
  )
}

