import React from 'react'
import {
  Flex,
  Text,
  Box,
  Image,
  Heading,
  Input,
  useDisclosure,
  Center,
  IconButton,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { CartController } from '../../function/cart.controller'

export function OrderCard({ id, menuId, name, note, price, img, unit, restaurantId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [newNote, setNewNote] = React.useState(note)
  const [newUnit, setNewUnit] = React.useState(unit)
  return (
    <>
      <Flex justify="center" onClick={onOpen} py={2}>
        <Box w="md" borderWidth="1px" rounded="lg" overflow="hidden" bg="white">
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
        </Box>
      </Flex>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} finalFocusRef={btnRef} size="md">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Text fontSize="lg" fontWeight={700}>
                {name}
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
                  onClick={() => (newUnit - 1 < 0 ? setNewNote(0) : setNewUnit(newUnit - 1))}
                />
                <Text fontSize="lg" fontWeight={700} px={3}>{` ${newUnit} `}</Text>
                <IconButton
                  m={2}
                  colorScheme="teal"
                  aria-label="Call Segun"
                  size="md"
                  icon={<AddIcon />}
                  onClick={() => setNewUnit(newUnit + 1)}
                />
              </Center>
              <Center>
                <Input
                  placeholder="note"
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                ></Input>
              </Center>
            </DrawerBody>

            <DrawerFooter>
              <Button
                w="100%"
                onClick={() => {
                  CartController.updateMenu(id, newUnit, newNote)
                  onClose()
                }}
              >
                {newUnit === 0 ? 'Remove item' : 'Update'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
