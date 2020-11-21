import React from 'react'
import { Center, Spinner } from '@chakra-ui/react'
export function LoadingAnimation({height=window.innerHeight}) {
  return (
    <Center height={height}>
      <Spinner size="xl" thickness="4px" />
    </Center>
  )
}
