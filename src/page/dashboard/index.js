import React from 'react'
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom'
import { ConsoleApiController } from '../../function/consoleapi.controller'
import { DashBoardHome } from './home'

export function DashBoardRoute() {
  const match = useRouteMatch()
  let history = useHistory();
  React.useEffect(() => {
    ConsoleApiController.isRestaurant().then((isRestaurant) => {
      if (!isRestaurant) {
        history.push('/')
      }
    })
  }, [])
  return (
    <Switch>
      <Route exact path={match.path} component={() => <DashBoardHome />} />
      <Route component={() => 'ไม่พบร้านอาหาร'} />
    </Switch>
  )
}
