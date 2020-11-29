import { Box } from '@chakra-ui/react'
import React from 'react'
import { RestaurantCard } from '../../component/restaurantCard'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { useAPI } from '../../function/api'

export function RestaurantHome() {
  const { data: restaurantPayload, isLoading } = useAPI('/restaurant/list')

  if (isLoading) return <LoadingAnimation />
  return (
    <Box bg="#D7DBDD" height={window.innerHeight}>
      {restaurantPayload &&
        restaurantPayload.map((restraunt, index) => {
          return (
            <RestaurantCard
              key={index}
              name={restraunt.name}
              img={restraunt.imgUrl[0]}
              location={restraunt.address}
              url={'/restaurant/' + restraunt.id}
            />
          )
        })}
    </Box>
  )
}
