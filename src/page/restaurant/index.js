import { Box } from '@chakra-ui/core'
import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { RestaurantCard } from '../../component/restaurantCard'
import { allRestaurant } from './../../mockupData'
import LoadingAnimation from '../../component/loadingAnimation'
import axios from 'axios'
import liff from '@line/liff'
const backendInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})
export function RestaurantRoute() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={match.path} component={() => <RestaurantHome/>}/>
      <Route component={() => "ไม่พบร้านอาหาร"}/>
    </Switch>
  )
}

function RestaurantHome() {
  const [restaurantPayload, setRestaurantPayload] = useState(undefined)
  useEffect(() => {
    ;(async() => {
        try{
            await liff.ready
            // backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
            // const response = await backendInstance.post('/restaurant/get')
            // setrestaurantPayload(response.data)
            setRestaurantPayload(allRestaurant)
        } catch (e) {
            // push to error page
        }
    })()
}, [])
  if (restaurantPayload) {
    return (
      <Box bg="#D7DBDD" height={window.innerHeight}>
        {restaurantPayload &&
          restaurantPayload.map((restraunt, index) => {
            return (
              <RestaurantCard
                key={index}
                name={restraunt.name}
                img={restraunt.img}
                location={restraunt.location}
                url={"/restaurant/" + restraunt.id}
              />
            )
          })}
      </Box>
    )
  }
  return <LoadingAnimation/>
}
