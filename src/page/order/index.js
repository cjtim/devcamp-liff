import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { OrderCard } from '../../component/orderCard'
import { Container, Text, Tabs, Tab, TabList, TabPanels, TabPanel, Center } from '@chakra-ui/react'
import { DetailHome } from './detail'
import { useAPI } from '../../function/api'

export function OrderRoute() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={match.path} component={() => <OrderHome />} />
      <Route path={match.path + '/:orderId'} component={() => <DetailHome />} />
      <Route component={() => 'ไม่พบร้านอาหาร'} />
    </Switch>
  )
}

function OrderHome() {
  const { data: orderPayload, isLoading } = useAPI('/order/list')

  if (orderPayload)
    return (
      <>
        <Container p={0} h={window.innerHeight}>
          <Center>
            <Text fontSize="3xl" fontWeight="bold" marginTop="10px">
              Order Detail
            </Text>
          </Center>
          <Tabs variant="unsytle" marginTop="20px" marginBottom="20px">
            <TabList pb={4} marginLeft="20px">
              <Tab _selected={{ color: 'white', bg: 'red.300' }} borderRadius="20px">
                COOKING
              </Tab>

              <Tab _selected={{ color: 'white', bg: 'yellow.300' }} borderRadius="20px">
                WAITING
              </Tab>

              <Tab _selected={{ color: 'white', bg: 'green.300' }} borderRadius="20px">
                COMPLETE
              </Tab>
            </TabList>
            <TabPanels bg="#EDF2F7" shadow="inner">
              <TabPanel>
                {orderPayload &&
                  orderPayload
                    .filter(i => i.status === 'COOKING')
                    .map((i, index) => {
                      if (index < 10) {
                        return <OrderCard key={index} order={i} statusColor="#F56565" />
                      }
                      return ''
                    })}
              </TabPanel>

              <TabPanel>
                {orderPayload &&
                  orderPayload
                    .filter(i => i.status === 'WAIT_FOR_PICKUP')
                    .map((i, index) => {
                      if (index < 10) {
                        return <OrderCard key={index} order={i} statusColor="#ECC94B" />
                      }
                      return ''
                    })}
              </TabPanel>

              <TabPanel>
                {orderPayload &&
                  orderPayload
                    .filter(i => i.status === 'COMPLETE')
                    .map((i, index) => {
                      if (index < 10) {
                        return <OrderCard key={index} order={i} statusColor="#68D391" />
                      }
                      return ''
                    })}
              </TabPanel>
            </TabPanels>

            {/* {
            orderPayload &&
            orderPayload.map((i, index) => {
              if (index < 10) {
                let color
                if (i.status === "COMPLETE") color = "#68D391"
                else if (i.status === "COOKING") color = "tomato"
                else color = "#FEFCBF"
                return <OrderCard key={index} order={i} statusColor={color} />
                // return (
                //   <OrderCard key={index} order={i} />
                // )
              }
              return <></>
            })
          } */}
          </Tabs>
        </Container>
      </>
    )

  return <LoadingAnimation />
}
