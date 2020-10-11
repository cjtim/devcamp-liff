import { Route, Switch, useRouteMatch  } from 'react-router-dom'
import React from 'react'
import MenuOrder from './menuOrder';

export default function MenuRoute() {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={match.path + "/1"}>
                <MenuOrder/>
            </Route>
        </Switch>
    )
}