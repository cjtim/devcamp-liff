// import { lineState } from '../../recoil'
// import { useRecoilState } from 'recoil'
import React, { useState } from 'react'
import { Flex, Button } from '@chakra-ui/react'
import liff from '@line/liff'
import axios from 'axios'
import LoadingAnimation from './../../component/loadingAnimation'
import { orderPayload } from './../../mockupData'

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

export function Home() {
  const [isLoading, setisLoading] = useState(false)
  React.useEffect(() => {
    ;(async () => {
      await liff.ready
      backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
      console.log((await backendInstance.get('')).data)
    })()
  }, [])
  if (isLoading) return <LoadingAnimation />
  return (
    <main>
      <Flex justify="center" py={4}>
        <Button
          bg="#4e2e7f"
          color="white"
          onClick={async () => {
            setisLoading(true)
            await createSCBLink().then(scb => {
              liff.openWindow({
                url: '/redirect?url=' + scb.deeplinkUrl
              })
            })
            setisLoading(false)
          }}
        >
          Pay with SCB
        </Button>
      </Flex>
    </main>
  )
}

async function createSCBLink() {
  const payload = await backendInstance.post('/order/create', orderPayload)
  console.log(payload.data)
  const scb = await backendInstance.post('/transaction/create', {
    payAmount: payload.data.totalAmount,
    orderId: payload.data.id
  })
  console.log(scb.data)
  return scb.data
}
