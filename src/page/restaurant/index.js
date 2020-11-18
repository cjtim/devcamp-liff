import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { RestaurantCard } from '../../component/restaurantCard'
import LoadingAnimation from '../../component/loadingAnimation'
import axios from 'axios'
import liff from '@line/liff'
import { RestaurantMenu } from './allMenu'

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})
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
    ;(async () => {
      try {
        await liff.ready
        backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
        const api = await backendInstance.post('/restaurant/list')
        setrestaurantPayload(api.data)
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        alert(e.message)
      }
    })()
  }, [])
  if (isLoading) return <LoadingAnimation />
  if (restaurantPayload) {
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
  return 'Internal Server Error'
}
