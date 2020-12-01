import React from 'react'
import { Box, Flex, Text, Link, HStack, VStack, Circle, StackDivider } from '@chakra-ui/react'
export function OrderCard({ order }) {
  return (
    <>
      <Link href={"/order/" + order.id} style={{ textDecoration: 'none' }}>
        <Flex justify="center">
          <Box w="md" borderWidth="1px" rounded="lg" overflow="hidden" marginBottom="5px">
            <HStack spacing="24px">

              <Circle size="60px" bg="white" marginLeft="15px">
                  <Text fontSize="xl" fontStyle="bold">
                    {order.id}
                  </Text>
              </Circle>

              <VStack 
                align="stretch" 
                spacing={3} 
                divider={<StackDivider borderColor="green" />}>

                  <Box w="100% " bg="white" marginTop="10px">
                    <Text>{order.Restaurant.name}</Text>
                  </Box>

                  <Box h="50px" bg="white">
                    <Text>สถานะอาหาร: {order.status}</Text>
                  </Box>

                  <Box align="right" bg="white">
                    <Text>Total: {order.Transactions[0].amount}</Text>
                  </Box>

              </VStack>

            </HStack>

            {/* <Flex alignContent="center" alignItems="center">
              <Box bg="grey"></Box>
              <Text>{order.id}</Text>
              <Text>{order.status}</Text>
            </Flex> */}
          </Box>
        </Flex>
      </Link>
    </>
  )
}
