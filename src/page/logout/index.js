import liff from '@line/liff'
import { Redirect } from 'react-router-dom'
import React from 'react'

export function Logout() {
  if (liff.isLoggedIn()) {
    liff.logout()
  }
  return <Redirect to="/"/>
}
