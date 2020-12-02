import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { ShuffleMenu } from './home'

export function ShuffleRoute() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={match.path} component={() => <ShuffleMenu />} />
        </Switch>
    )
}
