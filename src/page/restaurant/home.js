import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RestaurantCard } from '../../component/restaurantCard'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { ApiController } from '../../function/api.controller'

export function RestaurantHome() {
  const [isLoading, setIsLoading] = useState(true)
  const [restaurantPayload, setrestaurantPayload] = useState(undefined)
  useEffect(() => {
    ApiController.restaurantList().then(data => {
      setrestaurantPayload(data)
      setIsLoading(false)
    })
  }, [])
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
