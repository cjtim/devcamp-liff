import { Button, Flex } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import React from 'react'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Redirect() {
  let query = useQuery()
  const url = query.get('url')
  console.log(url)
  if (url) window.location.href = url
  return <Flex align="center" justify="center">
    <Button onClick={() => document.location.href = url}>Click here, if your browser not redirect.</Button>
  </Flex>
}
export default Redirect
