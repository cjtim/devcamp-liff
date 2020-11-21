import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import axios from 'axios'
import liff from '@line/liff'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { OrderCard } from '../../component/orderCard'

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})
export function OrderRoute() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={match.path} component={() => <OrderHome />} />
      {/* <Route path={match.path + '/:orderId'} component={() => <RestaurantMenu />} /> */}
      <Route component={() => 'ไม่พบร้านอาหาร'} />
    </Switch>
  )
}

function OrderHome() {
  const [isLoading, setIsLoading] = useState(true)
  const [orderPayload, setOrderPayload] = useState([])
  useEffect(() => {
    ;(async () => {
      try {
        await liff.ready
        backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
        const api = await backendInstance.post('/order/list')
        setOrderPayload(api.data)
        console.log(api.data)
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        alert(e.message)
      }
    })()
  }, [orderPayload])
  if (!isLoading)
    return (
      <>
        {orderPayload &&
          orderPayload.map((i, index) => {
            if (index < 30) return <OrderCard key={index} order={i} />
            return <></>
          })}
      </>
    )

  return <LoadingAnimation />
}
