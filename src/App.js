import React from 'react'


import { Route, Switch } from 'react-router-dom'
import RedirectTo from './page/redirect'
import Home from './page/home'
import Logout from './page/logout'


function App() {
  
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/pay/:orderid" component={RedirectTo}/>
      <Route exact path="/logout" component={Logout}>
      </Route>
    </Switch>
  )
}

export default App
