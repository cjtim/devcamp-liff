import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { RestaurantMenu } from './allMenu'
import { RestaurantHome} from './home'
import { SearchMenuPage } from './search'

export function RestaurantRoute() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={match.path} component={() => <RestaurantHome />} />
      <Route path={match.path + '/search' + '/:restaurantId'} component={() => <SearchMenuPage />} />
      <Route path={match.path + '/:restaurantId'} component={() => <RestaurantMenu />} />
      <Route component={() => 'ไม่พบร้านอาหาร'} />
    </Switch>
  )
}
