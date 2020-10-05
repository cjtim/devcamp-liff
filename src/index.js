import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { RecoilRoot } from 'recoil'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
