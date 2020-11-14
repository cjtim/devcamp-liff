import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { RestaurantCard } from '../../component/restaurantCard'
// import { allRestaurant } from './../../mockupData'
import LoadingAnimation from '../../component/loadingAnimation'
import axios from 'axios'
import useSWR from 'swr'
import liff from '@line/liff'
import { RestaurantMenu } from './restaurant'

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})
export function RestaurantRoute() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={match.path} component={() => <RestaurantHome />} />
      <Route path={match.path + "/:restaurantId"} component={() => <RestaurantMenu/>}/>
      <Route component={() => 'ไม่พบร้านอาหาร'} />
    </Switch>
  )
}

const api = url => backendInstance.post(url).then(res => res.data)
function UseRestaurant() {
  const { data, error } = useSWR('/restaurant/list', api, {
    errorRetryCount: 5,
    errorRetryInterval: 400
  })
  return { restaurantPayload: data, error: error, isLoading: !data }
}
function RestaurantHome() {
  const { restaurantPayload, isLoading } = UseRestaurant()
  useEffect(() => {
    ;(async () => {
      try {
        await liff.ready
        backendInstance.defaults.headers[
          'authorization'
        ] = `Bearer ${liff.getAccessToken()}`
      } catch (e) {
        // push to error page
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
