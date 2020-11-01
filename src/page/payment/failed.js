import React from 'react'
import { ReactComponent as FailedIcon } from './../../component/icon/failed.svg'
import { Flex, Text } from '@chakra-ui/core'
import { useParams } from 'react-router-dom'

export function PaymentFailed() {
  const { transactionId } = useParams()
  return (
    <>
      <Flex alignItems="center" justify="center" p={4}>
        <FailedIcon />
      </Flex>
      <Flex alignItems="center" justify="center">
        <Text fontFamily="Prompt" fontSize="2xl">
          ชำระเงินไม่สำเร็จ
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
