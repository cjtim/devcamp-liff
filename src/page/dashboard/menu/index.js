import { Button } from '@chakra-ui/react'
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { DashBoardCreateMenuRoute } from '../create'

export function DashBoardMenuRoute() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={match.path} component={() => <MenuHome />} />
      <Route path={match.path + '/createMenu'} component={() => <DashBoardCreateMenuRoute/> } />
      <Route component={() => 'ไม่พบร้านอาหาร'} />
    </Switch>
  )
}


function MenuHome() {
    return (
        <>
        <Button
          as="a"
          href="/dashboard/menu/createMenu"
          colorScheme="blue"
          color="white"
        >
          Add menu
        </Button>
        All menu
        </>
    )
}
