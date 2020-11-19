import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
function LoadingAnimation({height=window.innerHeight}) {
  return (
    <Flex justify="center" alignItems="center" justifyContent="center" height={height}>
      <Spinner size="xl" thickness="4px" />
    </Flex>
  )
}
export default LoadingAnimation
