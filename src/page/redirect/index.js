import { Button, Flex } from '@chakra-ui/core'
import { useLocation } from 'react-router-dom'
import React from 'react'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Redirect() {
  let query = useQuery()
  const url = query.get('url')
  window.location.href = url
  return <Flex align="center" justify="center">
    <Button bg="#4e2e7f" href={url} color='white' onClick={() => document.location.href = url}>Pay with SCB</Button>
  </Flex>
}
export default Redirect
