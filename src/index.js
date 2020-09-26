import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { RecoilRoot } from 'recoil'
import customTheme from './theme'
import { ThemeProvider } from '@chakra-ui/core'

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={customTheme}>
      <App/>
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
