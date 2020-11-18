import React from 'react'
import { Box, Flex, Text, Link } from '@chakra-ui/react'
export function OrderCard({ order }) {
  return (
    <>
      <Link href={order.url} style={{ textDecoration: 'none' }}>
        <Flex justify="center">
          <Box w="md" borderWidth="1px" rounded="lg" overflow="hidden" bg="white">
            <Flex alignContent="center" alignItems="center">
              <Text>{order.id}</Text>
            </Flex>
          </Box>
        </Flex>
      </Link>
    </>
  )
}
