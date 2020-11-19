import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { RestaurantCard } from '../../component/restaurantCard'
import LoadingAnimation from '../../component/loadingAnimation'
import { RestaurantMenu } from './allMenu'
import { ApiController } from '../../function/api.controller'

export function RestaurantRoute() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={match.path} component={() => <RestaurantHome />} />
      <Route path={match.path + '/:restaurantId'} component={() => <RestaurantMenu />} />
      <Route component={() => 'ไม่พบร้านอาหาร'} />
    </Switch>
  )
}

function RestaurantHome() {
  const [isLoading, setIsLoading] = useState(true)
  const [restaurantPayload, setrestaurantPayload] = useState(undefined)
  useEffect(() => {
    ApiController.restaurantList().then((data) => {
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
