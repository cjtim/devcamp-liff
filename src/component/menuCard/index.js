import React from 'react'
import { Box, Flex, Text, Image, Heading, Link, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { CartController } from '../../function/cart.controller'

export function MenuCard({ menu }) {
  async function appendUnit(menu) {
    try {
      await CartController.plusMenuUnit(menu, menu.restaurantId)
    } catch (e) {
      CartController.clear()
    }
  }
  return (
    <Link href={menu.url} style={{ textDecoration: 'none' }}>
      <Flex justify="center">
        <Box w="md" borderWidth="1px" rounded="lg" overflow="hidden" bg="white">
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
            <IconButton m={2} colorScheme="teal" aria-label="Call Segun" size="sm" icon={<AddIcon onClick={() => appendUnit(menu)} />} />
          </Flex>
        </Box>
      </Flex>
    </Link>
  )
}
