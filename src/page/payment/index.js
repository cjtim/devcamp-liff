import { Route, Switch, useRouteMatch  } from 'react-router-dom'
import React from 'react'
import PaymentSuccess from './success';

function PaymentRoute() {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.path + "/success/:transactionId"}>
                <PaymentSuccess/>
            </Route>
        </Switch>
    )
}
export default PaymentRoute