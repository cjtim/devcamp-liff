import React from 'react'
import { Box, Flex, Text, Image, Heading, Link } from '@chakra-ui/react'
import { cart as atomCart, currentRestaurant as atomCurrentRestaurant  } from '../../recoil'
import { AddIcon } from '@chakra-ui/icons'
import { useRecoilState, useSetRecoilState } from 'recoil'

export function MenuCard({ menu }) {
  const [cart, setCart] = useRecoilState(atomCart)
  const setCurrentRestaurant = useSetRecoilState(atomCurrentRestaurant)

  function appendUnit(menu) {
    var foundIndex = cart.findIndex(x => x.id === menu.id)
    if (foundIndex !== -1)
      setCart(
        cart.map(i => {
          if (i.menuId === menu.id) {
            return {
              ...i,
              unit: i.unit + 1
            }
          }
          return i
        })
      )
    else
      setCart([
        ...cart,
        {
          menuId: menu.id,
          name: menu.name,
          note: '',
          price: menu.price,
          unit: 1,
          img: menu.img,
          restaurantId: menu.restaurantId
        }
      ])
      setCurrentRestaurant(menu.restaurantId)
    setTimeout(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
      localStorage.setItem('currentRestaurant', JSON.stringify(menu.restaurantId))
    }, 100)
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
            <AddIcon
              onClick={() => {
                appendUnit(menu)
              }}
            />
          </Flex>
        </Box>
      </Flex>
    </Link>
  )
}
