import React from 'react'
import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom'
import { LoadingAnimation } from '../../../component/loadingAnimation'
import {
  Container,
  HStack,
  Stack,
  Text,
  Box,
  Flex,
  Spacer,
  Divider,
  Center,
  VStack
} from '@chakra-ui/react'
import { useAPI } from '../../../function/api'

export function DetailHome() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={match.path} component={() => <OrderDetail />} />
    </Switch>
  )
}

function OrderDetail() {
  let { orderId } = useParams()
  const { data: orderReceipt } = useAPI('/order/get', { orderId: orderId })
  const { data: queue } = useAPI('/order/queue', { orderId: orderId })
  console.log(queue)
  if (orderReceipt) {
    return (
      <Container bg="#EDF2F7" p={0} paddingBottom="30px" paddingTop="10px" h={window.innerHeight}>
        <Center marginBottom="10px">
          <Text fontWeight="bold" fontSize="3xl">
            Order Receipt
          </Text>
        </Center>
        <VStack align="stretch">
          <Box p={5} borderWidth="1px" bg="white" boxShadow="md">
            <HStack spacing="24px">
              <Text fontSize="lg" fontWeight="bold">
                {orderReceipt.Restaurant.name}
              </Text>
            </HStack>
          </Box>
          {/* queue */}
          <Box p={5} borderWidth="1px" bg="white" boxShadow="md">
            <HStack spacing="24px">
              <Text fontSize="lg" fontWeight="bold">
                {queue.queue > 0 && `มี ${queue.queue}คิวก่อนหน้า`}
                {queue.queue === 0 && `สถานะ ${queue.message}`}
              </Text>
            </HStack>
          </Box>

          <Box p={5} bg="white" boxShadow="md">
            <Box marginBottom="10px" fontWeight="bold">
              Order Summary
            </Box>
            <Divider />
            {orderReceipt.selectedMenu.map((i, index) => {
              return (
                <Flex paddingTop="10px" key={index}>
                  <Box marginRight="10px">{i.unit}x</Box>
                  <Box>{i.name}</Box>
                  <Spacer />
                  <Box>฿{i.price}</Box>
                </Flex>
              )
            })}
            <Divider marginTop="20px" />
          </Box>
          <Box p={5} bg="white" boxShadow="md">
            <Flex>
              <Box>Unit:</Box>
              <Spacer />
              <Box>{orderReceipt.selectedMenu.length}</Box>
            </Flex>
            <Flex>
              <Box>Total:</Box>
              <Spacer />
              <Box>
                ฿
                {orderReceipt.Transactions[0]
                  ? orderReceipt.Transactions[0].amount
                  : 'DB PAY BYPASS'}
              </Box>
            </Flex>
          </Box>
        </VStack>
      </Container>
    )
  }
  return <LoadingAnimation />
}
