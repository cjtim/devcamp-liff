import React from 'react'
import { Flex, Button, VStack, Center, Text } from '@chakra-ui/react'

export function Home() {
  return (
    <>
      <Flex justify="center" py={4}>
        <VStack>
          <Text fontSize="3xl" fontWeight="bold">EATME ตามสั่ง</Text>
          <Button as="a" href="/restaurant" colorScheme="blue" color="white">
            Order Food
          </Button>

          <Button as="a" href="/order" colorScheme="teal" color="white">
            View Order
          </Button>

          {/* <Button
            as="a"
            href="/dashboard"
            colorScheme="red"
            color="white">
              Dashboard
            </Button> */}

            {/* <Button as="a" href="/register" colorScheme="green" color="white">
              Register
            </Button> */}

            <Button as="a" href="/shuffle" colorScheme="green" color="white">
              Random
            </Button>
            <Button as="a" href="/profile" colorScheme="green" color="white">
              Profile
            </Button>
        </VStack>

      </Flex>
      
    </>
  )
}
