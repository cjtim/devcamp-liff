import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { DashBoardHome } from './home'


export function DashBoardRoute() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={match.path} component={() => <DashBoardHome />} />
      <Route component={() => 'ไม่พบร้านอาหาร'} />
    </Switch>
  )
}
