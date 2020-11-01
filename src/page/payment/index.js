import { Route, Switch, useRouteMatch } from 'react-router-dom'
import React from 'react'
import { PaymentSuccess } from './success'
import { PaymentFailed } from './failed'

export function PaymentRoute() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={match.path + '/success/:transactionId'}>
        <PaymentSuccess />
      </Route>
      <Route exact path={match.path + '/failed/:transactionId'}>
        <PaymentFailed />
      </Route>
    </Switch>
  )
}
