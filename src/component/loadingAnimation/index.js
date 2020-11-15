import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
function LoadingAnimation() {
  return (
    <Flex justify="center" alignItems="center" justifyContent="center" height={window.innerHeight}>
      <Spinner size="xl" thickness="4px" />
    </Flex>
  )
}
export default LoadingAnimation
