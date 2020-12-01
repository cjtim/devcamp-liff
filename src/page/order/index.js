import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { OrderCard } from '../../component/orderCard'
import { Container, Text, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
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
        <Container py={2}>
          <Text fontSize="3xl" marginTop="10px">
            Order Detail
          </Text>
          <Tabs variant="unsytle" marginTop="20px" marginBottom="20px">
            <TabList>
              <Tab _selected={{ color: 'white', bg: 'red.300' }} borderRadius="20px">
                COOKING
              </Tab>
              <Tab _selected={{ color: 'white', bg: 'green.300' }} borderRadius="20px">
                COMPLETE
              </Tab>
            </TabList>
            <TabPanels>
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
