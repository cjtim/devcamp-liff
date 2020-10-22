import { Flex, Text } from '@chakra-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import SuccessLogo from './../../component/icon/success'

function PaymentSuccess() {
  const { transactionId } = useParams()
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
export default PaymentSuccess
