import React from 'react'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { useParams } from 'react-router-dom'
import { MenuCard } from '../../component/menuCard'
import { useAPI } from '../../function/api'
import { CartDrawer } from '../../component/cartDrawer'
import { Box, Text, VStack } from '@chakra-ui/react'

export function RestaurantMenu() {
  let { restaurantId } = useParams()
  const { data, isLoading } = useAPI('/menu/list', {
    restaurantId: restaurantId
  })

  const { data: resName, isLoading: isWaitRestaurant} = useAPI('/restaurant/get', {
    restaurantId: restaurantId
  })

  if (isLoading && isWaitRestaurant) return <LoadingAnimation />
  return (
    <>
      <Box ml="20px" mt="20px" mb="20px">
        <Text fontSize="2xl" fontWeight="bold">{resName && resName.name}</Text>
      </Box>
      <VStack align="stretch" maxW={window.innerWidth} spacing ={4}>
        {data &&
          data.map((menu, index) => {
            return <MenuCard key={index} menu={menu} />
          })}
      </VStack>
      <CartDrawer />
    </>
  )
}
