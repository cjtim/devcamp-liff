import { Flex, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SuccessLogo from './../../component/icon/success'
import LoadingAnimation from './../../component/loadingAnimation'
import axios from 'axios'
import liff from '@line/liff/dist/lib'
const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})
export function PaymentSuccess() {
  const { transactionId } = useParams()
  const [isLoading, setisLoading] = useState(false)
  useEffect(() => {
    ;(async () => {
      setisLoading(true)
      await liff.ready
      backendInstance.defaults.headers[
        'authorization'
      ] = `Bearer ${liff.getAccessToken()}`
      const response = await backendInstance.post('/transaction/ispaid', {
        transactionId: transactionId
      })
      console.log(response.data)
      if (response.data.paid === false) {
        window.location.href = window.location.href.replace('success', 'failed')
      }
      setisLoading(false)
    })()
  }, [])
  if (isLoading) return <LoadingAnimation />
  return (
    <>
      <Flex alignItems="center" justify="center" p={4}>
        <SuccessLogo />
      </Flex>
      <Flex alignItems="center" justify="center">
        <Text fontFamily="Prompt" fontSize="2xl">
          ชำระเงินสำเร็จ
        </Text>
      </Flex>
      <Flex alignItems="center" justify="center">
        <Text fontFamily="Prompt" fontSize="sm" color="#909497">
          Transaction id: {transactionId || 'unknown'}
        </Text>
      </Flex>
      </>
  )
}
