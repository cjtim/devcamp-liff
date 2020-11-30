import React, { useEffect } from 'react'
import liff from '@line/liff'
import { Route, Switch } from 'react-router-dom'
import RedirectTo from './page/redirect'
import { Home } from './page/home'
import { Logout } from './page/logout'
import { PaymentRoute } from './page/payment'
import { RestaurantRoute } from './page/restaurant'
import { OrderRoute } from './page/order'
import { CartController } from './function/cart.controller'
import { DashBoardRoute } from './page/dashboard'
import { RegisterRoute } from './page/register'
import { useSetRecoilState } from 'recoil'
import {
  lineAcctoken,
  cart as atomCart,
  currentRestaurant as atomCurrentRestaurant
} from './recoil'

export default function App() {
  const setLineAccToken = useSetRecoilState(lineAcctoken)
  const setCart = useSetRecoilState(atomCart)
  const setCurrentRestaurant = useSetRecoilState(atomCurrentRestaurant)
  useEffect(() => {
    liffLogin().then(() => {
      alert("app.js lineAccToken " + liff.getAccessToken())
      setLineAccToken(liff.getAccessToken())
    })
    const localCart = localStorage.getItem('cart')
    if (localCart) setCart(JSON.parse(localCart))
    const localCurrentRestaurant = localStorage.getItem('currentRestaurant')
    if (localCurrentRestaurant) setCurrentRestaurant(JSON.parse(localCurrentRestaurant))
    CartController.load()
  }, [])
  return (
    <Switch>
      <Route exact path="/" component={() => <Home />} />
      <Route exact path="/redirect" component={() => <RedirectTo />} />
      <Route exact path="/logout" component={() => <Logout />} />
      <Route path="/dashboard" component={() => <DashBoardRoute />} />
      <Route path="/restaurant" component={() => <RestaurantRoute />} />
      <Route path="/payment" component={() => <PaymentRoute />} />
      <Route path="/order" component={() => <OrderRoute />} />
      <Route path="/register" component={() => <RegisterRoute />} />
      <Route component={() => <h1>Not found</h1>} />
    </Switch>
  )
}

async function liffLogin() {
  await liff.init({ liffId: process.env.REACT_APP_LIFF_ID })
  if (!liff.isLoggedIn()) liff.login({ redirectUri: window.location.href })
  await liff.ready
  console.log(liff.getAccessToken())
  console.log(await liff.getProfile())
}
