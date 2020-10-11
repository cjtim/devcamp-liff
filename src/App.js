import React from 'react'


import { Route, Switch } from 'react-router-dom'
import RedirectTo from './page/redirect'
import Home from './page/home'
import Logout from './page/logout'
import MenuRoute from './page/menu'


function App() {
  
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/pay/:orderid" component={RedirectTo}/>
      <Route exact path="/logout" component={Logout}/>
      <Route exact path="/restaurant/:id"/>
      <Route path="/menu" component={MenuRoute}/>
      <Route component={() => <h1>Not found</h1>}/>
    </Switch>
  )
}

export default App
