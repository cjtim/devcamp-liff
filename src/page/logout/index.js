import liff from '@line/liff'
import { useHistory } from 'react-router-dom'
// eslint-disable-next-line
import React from 'react'

async function logout() {
  let history = useHistory()
  await liff.init({ liffId: process.env.REACT_APP_LIFF_ID })
  if (liff.isLoggedIn()) {
    liff.logout()
  }
  history.push('/')
}

function LogoutPage() {
  logout()
  return <>Logout</>
}
export default LogoutPage
