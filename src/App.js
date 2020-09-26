import React from 'react'
import { useEffect, useState } from 'react'
import liff from '@line/liff'
import { lineState } from './recoil'

function App() {
  const [lineToken, setlineToken] = useState(lineState)

  useEffect(async () => {
    await liff.init({ liffId: '1654423128-VKZoXqXY' })
    if (!liff.isLoggedIn()) {
      liff.login()
    }
    setlineToken(liff.getAccessToken())
  }, [lineToken])
  if (!lineToken) return 'Not logged In'
  return (
    <main>
      <h1>AccessToken: {lineToken}</h1>
    </main>
  )
}

export default App
