import React, { useEffect, useState } from 'react'
import { lineState } from '../../recoil'
import { Input, Flex, Button, Link } from '@chakra-ui/core'
import { useRecoilState } from 'recoil'
import liff from '@line/liff'
import axios from 'axios'

const backendInstance = axios.create({
  baseURL: 'https://restaurant-helper-omise-nwbwsoebza-an.a.run.app'
})

function Home() {
  const [lineToken, setlineToken] = useRecoilState(lineState)
  const [amount, setAmount] = useState(0)
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
      {lineToken || ''}
      <Flex justify="center" py={4}>
        <Input
          width="80%"
          al
          placeholder="Amount"
          size="lg"
          defaultValue={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Flex>
      {/* Omise */}
      <Flex justify="center" py={4}>
        <Link href="https://restaurant-helper-liff.vercel.app/menu/1">
          <Button variantColor="green">Pay with Omise</Button>
        </Link>
      </Flex>
      {/* SCB */}
      <Flex justify="center" py={4}>
          <Button variantColor="green" onClick={async() => {
            window.open(
              await backendInstance.post('/payment/scb', {
              amount: amount
            }, {
              headers: {
                authorization: `Bearer ${liff.getAccessToken()}`
              }
            })
            )
          }}>Pay with SCB</Button>
      </Flex>

    </main>
  )
}
export default Home
