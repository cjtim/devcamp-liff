import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { RestaurantMenu } from './allMenu'
import { RestaurantHome} from './home'

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
