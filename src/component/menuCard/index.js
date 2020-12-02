import React, { useState } from 'react'
import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Link,
  IconButton,
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Center
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { CartController } from '../../function/cart.controller'

export function MenuCard({ menu }) {
  const [unit, setUnit] = useState(1)
  const [note, setNote] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  async function addToBasket(menu, unit, note) {
    try {
      await CartController.addMenu(menu, unit, note, menu.restaurantId)
    } catch (e) {
      CartController.clear()
    }
  }
  return (
    <>
      <Link onClick={onOpen} style={{ textDecoration: 'none' }}>
        <Flex justify="center">
          <Box w="sm" borderWidth="1px" rounded="lg" overflow="hidden" bg="white">
            <Flex alignContent="center" alignItems="center">
              <Box width="120px" height="100px">
                <Image
                  src={menu.img}
                  objectFit="cover"
                  w="100%"
                  height="100%"
                  alt={'รูปร้านเมนู ' + menu.name}
                  rounded="lg"
                />
              </Box>
              <Box px={2}>
                <Heading size="md" fontFamily="'Prompt'">
                  {menu.name}
                </Heading>
              </Box>
              <Text fontSize="md" fontFamily="prompt" marginLeft="auto">
                {menu.price + ' บาท'}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Link>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} finalFocusRef={btnRef} size="sm">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Text fontSize="lg" fontWeight={700}>
                {menu.name}
              </Text>
            </DrawerHeader>

            <DrawerBody>
              <Center>
                <IconButton
                  m={2}
                  colorScheme="teal"
                  aria-label="Call Segun"
                  size="md"
                  icon={<MinusIcon />}
                  onClick={() => (unit - 1 <= 0 ? onClose() : setUnit(unit - 1))}
                />
                <Text fontSize="lg" fontWeight={700} px={3}>{` ${unit} `}</Text>
                <IconButton
                  m={2}
                  colorScheme="teal"
                  aria-label="Call Segun"
                  size="md"
                  icon={<AddIcon />}
                  onClick={() => setUnit(unit + 1)}
                />
              </Center>
            </DrawerBody>
            <DrawerFooter>
              <Button
                color="white"
                bg="#38A169"
                size="md"
                width="100%"
                onClick={() => {
                  onClose()
                  addToBasket(menu, unit, note, menu.restaurantId)
                  setUnit(1)
                  setNote('')
                }}
              >
                Add To Basket
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
