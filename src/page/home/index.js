import React from 'react'
import { Flex, Button } from '@chakra-ui/react'
import { PageLayout } from '../../component/pageLayout'

export function Home() {
  return (
    <PageLayout>
      <Flex justify="center" py={4}>
        <Button
          as="a"
          href="/restaurant"
          colorScheme="blue"
          color="white"
        >
          Order Food
        </Button>
      </Flex>
      <br>
      </br>
      <Flex justify="center" py={4}>
        <Button
          as="a"
          href="/register"
          colorScheme="green"
          color="white"
        >
          Register
        </Button>
      </Flex>
    </PageLayout>
  )
}
