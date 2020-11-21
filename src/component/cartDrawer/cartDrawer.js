import React from 'react'
import { Button, Center } from '@chakra-ui/react'
import { Stack, Text, Flex } from '@chakra-ui/react'
import { ChakraDrawer } from '../ChakraDrawer'
export function Cart({
  children,
  isOpen,
  onOpen,
  onClose,
  btnRef,
  onClearBtn,
  onCheckoutBtn,
  total
}) {
  function DrawerFooter() {
    return (
      <Stack borderTopWidth="1px">
        <Flex>
          <Text fontSize="lg" marginRight="auto">
            Total
          </Text>
          <Text fontSize="lg" marginLeft="auto">
            ฿{total}
          </Text>
        </Flex>
        <Flex>
          <Button variant="outline" mr={3} onClick={onClearBtn} w="20%">
            Clear
          </Button>
          <Button colorScheme="blue" textColor="white" onClick={onCheckoutBtn} w="80%">
            Checkout
          </Button>
        </Flex>
      </Stack>
    )
  }
  return (
    <>
      <Flex justify="center" p={3}>
        <Button ref={btnRef} bg="#38A169" color="white" onClick={onOpen} w="100%">
          <Center>View Basket</Center>
          <Text marginLeft="auto">{'฿' + total}</Text>
        </Button>
      </Flex>
      <ChakraDrawer
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        size="xl"
        body={children}
        footer={<DrawerFooter />}
      />
    </>
  )
}
