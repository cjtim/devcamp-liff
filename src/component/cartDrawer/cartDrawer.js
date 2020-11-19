import React from 'react'
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
import { Stack, Text, Flex } from '@chakra-ui/react'
export function Cart({ children, isOpen, onClose, btnRef, onClearBtn, onCheckoutBtn, total }) {
  return (
    <>
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
