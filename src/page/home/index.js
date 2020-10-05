import React, { useEffect } from 'react'
import { lineState } from '../../recoil'
import { Input, Flex } from '@chakra-ui/core'
import { useRecoilState } from 'recoil'
import liff from '@line/liff'

function Home() {
  const [lineToken, setlineToken] = useRecoilState(lineState)
  useEffect(() => {
    async function liffLogin() {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID })
      if (!liff.isLoggedIn()) {
        liff.login()
      }
      setlineToken(liff.getAccessToken())
      console.log(liff.getProfile())
    }
    liffLogin()
  }, [])
  return (
    <main>
      <Flex justify="center" py={'20%'}>
        <Input width="50%" al placeholder="Restaurant ID" size="lg" defaultValue={lineToken}/>
      </Flex>
    </main>
  )
}
export default Home
