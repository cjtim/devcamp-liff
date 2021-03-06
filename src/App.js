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
import { ShuffleRoute } from './page/shuffle'
import { useSetRecoilState } from 'recoil'
import { lineAcctoken } from './recoil'
import { ProfileRoute } from './page/profile'

export default function App() {
  const setLineAccToken = useSetRecoilState(lineAcctoken)
  useEffect(() => {
    liffLogin().then(() => {
      liff.getProfile().then((profile) => {
        localStorage.setItem('lineUid', profile.userId)
        localStorage.setItem('displayName', profile.displayName)
      })
      localStorage.setItem('lineToken', liff.getAccessToken())
      setLineAccToken(liff.getAccessToken())
    })
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
      <Route path="/profile" component={() => <ProfileRoute />} />
      <Route path="/shuffle" component={() => <ShuffleRoute />} />
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
