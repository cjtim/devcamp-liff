import liff from '@line/liff'
import { useHistory } from 'react-router-dom'
// eslint-disable-next-line
import React from 'react'

export function Logout() {
  let history = useHistory()
  if (liff.isLoggedIn()) {
    liff.logout()
  }
  history.push('/')
}
