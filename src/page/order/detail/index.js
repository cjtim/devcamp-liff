import React from 'react'
import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom'
import { LoadingAnimation } from '../../../component/loadingAnimation'
import { Container, HStack, Stack, Text, Box, Flex, Spacer, Divider } from '@chakra-ui/react'
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

  if (orderReceipt) {
    return (
      <Container maxW="md" paddingLeft="0px" paddingRight="0px">
        <Text fontWeight="bold" fontSize="3xl" marginLeft="10px">
          Order Receipt
        </Text>
        <Stack>
          <Box p={5} borderWidth="1px">
            <HStack spacing="24px">
              <Text fontSize="lg" fontWeight="bold">
                Restaurant Name
              </Text>
            </HStack>
          </Box>

          <Box p={5}>
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
          <Box p={5}>
            <Flex>
              <Box>Unit:</Box>
              <Spacer />
              <Box>{orderReceipt.selectedMenu.length}</Box>
            </Flex>
            <Flex>
              <Box>Total:</Box>
              <Spacer />
              {/* <Box>฿{orderReceipt.Transactions[0].amount}</Box> */}
            </Flex>
          </Box>
        </Stack>
      </Container>
    )
  }
  return <LoadingAnimation />
}
