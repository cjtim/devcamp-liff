import React, { useEffect } from 'react'
import liff from '@line/liff'
import { Route, Switch } from 'react-router-dom'
import RedirectTo from './page/redirect'
import { Home } from './page/home'
import { Logout } from './page/logout'
import { MenuRoute } from './page/menu'
import { PaymentRoute } from './page/payment'
import { RestaurantRoute } from './page/restaurant'
import { OrderRoute } from './page/order'
import {StateController} from './function/state'

export default function App() {
  useEffect(() => {
    async function liffLogin() {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID })
      if (!liff.isLoggedIn()) liff.login({ redirectUri: window.location.href })
      await liff.ready
      console.log(liff.getAccessToken())
      console.log(await liff.getProfile())
    }
    liffLogin()

    StateController.load()
  }, [])
  return (
    <Switch>
      <Route exact path="/" component={() => <Home />} />
      <Route exact path="/redirect" component={() => <RedirectTo />} />
      <Route exact path="/logout" component={() => <Logout />} />
      <Route path="/restaurant" component={() => <RestaurantRoute />} />
      <Route path="/payment" component={() => <PaymentRoute />} />
      <Route path="/order" component={() => <OrderRoute />} />
      <Route path="/menu" component={() => <MenuRoute />} />
      <Route component={() => <h1>Not found</h1>} />
    </Switch>
  )
}
