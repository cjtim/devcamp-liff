import React, { useEffect, useState } from 'react'
// import { lineState } from '../../recoil'
import { Input, Flex, Button, Link } from '@chakra-ui/core'
// import { useRecoilState } from 'recoil'
import liff from '@line/liff'
import axios from 'axios'
import LoadingAnimation from './../../component/loadingAnimation'

const backendInstance = axios.create({
  baseURL: 'https://restaurant-helper-omise-nwbwsoebza-an.a.run.app'
})

function Home() {
  const [amount, setAmount] = useState(100)
  const [isLoading, setisLoading] = useState(false)
  useEffect(() => {
    async function liffLogin() {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID })
      if (!liff.isLoggedIn()) {
        liff.login()
      }
      await liff.ready
      console.log(liff.getAccessToken())
      console.log(await liff.getProfile())
    }
    liffLogin()
  }, [])
  if (isLoading) return <LoadingAnimation/>
  return (
    <main>
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
        <Button bg="#4e2e7f" color='white' onClick={async() => {
            setisLoading(true)
            const payload = await backendInstance.post('/payment/scb', {
              amount: amount
            }, {
              headers: {
                authorization: `Bearer ${liff.getAccessToken()}`
              }
            })
            window.open('/redirect?url=' + payload.data)
            setisLoading(false)
          }}>Pay with SCB</Button>
      </Flex>

    </main>
  )
}
export default Home
