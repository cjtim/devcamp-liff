import React from 'react'
import { Flex, Button } from '@chakra-ui/react'

export function Home() {
  return (
    <>
      <Flex justify="center" py={4}>
        <Button as="a" href="/restaurant" colorScheme="blue" color="white">
          Order Food
        </Button>

        <Button as="a" href="/order" colorScheme="teal" color="white">
          View Order
        </Button>

        <Button
          as="a"
          href="/dashboard"
          colorScheme="red"
          color="white">
            Dashboard
          </Button>
      </Flex>
      <br></br>
      <Flex justify="center" py={4}>
        <Button as="a" href="/register" colorScheme="green" color="white">
          Register
        </Button>
      </Flex>
    </>
  )
}
