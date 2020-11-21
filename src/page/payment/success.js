import { Flex, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SuccessLogo from './../../component/icon/success'
import { LoadingAnimation } from './../../component/loadingAnimation'
import { ApiController } from '../../function/api.controller'

export function PaymentSuccess() {
  const { transactionId } = useParams()
  const [isLoading, setisLoading] = useState(false)
  useEffect(() => {
    ;(async () => {
      setisLoading(true)
      const isPaid = await ApiController.transactionIsPaid(transactionId)
      if (isPaid === false) {
        window.location.href = window.location.href.replace('success', 'failed')
      }
      setisLoading(false)
    })()
  }, [isLoading])
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
