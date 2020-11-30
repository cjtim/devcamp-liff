import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { DashBoardHome } from './home'
import { DashBoardMenuRoute } from './menu'
import { DashBoardSummaryPage } from './summary'


export function DashBoardRoute() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={match.path} component={() => <DashBoardHome />} />
      <Route path={match.path + '/menu'} component={() => <DashBoardMenuRoute/> } />
      <Route path={match.path + '/summary'} component={() => <DashBoardSummaryPage/>}/>
      <Route component={() => 'ไม่พบร้านอาหาร'} />
    </Switch>
  )
}


