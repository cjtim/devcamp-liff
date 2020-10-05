import { Button, Flex } from '@chakra-ui/core'
import { useParams } from 'react-router-dom'
import React from 'react'

function Redirect() {
  let { orderid } = useParams()
  const newUrl = 'scbeasysim://purchase/' + orderid
  document.location.href = newUrl
  return <Flex align="center" justify="center">
    <Button bg="#4e2e7f" href={newUrl} color='white'>Pay with SCB</Button>
  </Flex>
}
export default Redirect
