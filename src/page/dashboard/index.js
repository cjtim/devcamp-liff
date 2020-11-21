import liff from '@line/liff/dist/lib'
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { DashBoardHome } from './home'
import {LoadingAnimation} from '../../component/loadingAnimation'

export function DashBoardRoute() {
  const [isLoading, setIsLoading] = React.useState(true)
  const match = useRouteMatch()
  React.useEffect(() => {
    liff.ready.then(() => setIsLoading(false))
  }, [isLoading])
  if (!isLoading)
    return (
      <Switch>
        <Route
          exact
          path={match.path}
          component={() => <DashBoardHome liffAccessToken={liff.getAccessToken()} />}
        />
        <Route component={() => 'ไม่พบร้านอาหาร'} />
      </Switch>
    )
  return <LoadingAnimation />
}
