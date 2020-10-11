import React, { useEffect } from 'react'
import { lineState } from '../../recoil'
import { Input, Flex, Button, Link } from '@chakra-ui/core'
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
      await liff.ready
      setlineToken(liff.getAccessToken())
      console.log(liff.getAccessToken())
      console.log(await liff.getProfile())
    }
    liffLogin()
  }, [])
  return (
    <main>
      <Flex justify="center" py={4}>
        <Input
          width="80%"
          al
          placeholder="Restaurant ID"
          size="lg"
          defaultValue={lineToken}
        />
      </Flex>
      <Flex justify="center" py={4}>
        <Link href="https://restaurant-helper-liff.vercel.app/menu/1">
          <Button variantColor="green">Pay</Button>
        </Link>
      </Flex>
    </main>
  )
}
export default Home
