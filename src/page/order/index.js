import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import axios from 'axios'
import liff from '@line/liff'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { OrderCard } from '../../component/orderCard'
import { Container, Text, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import { DetailHome } from './detail'

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})
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
  const [isLoading, setIsLoading] = useState(true)
  const [orderPayload, setOrderPayload] = useState([])
  useEffect(() => {
    ; (async () => {
      try {
        await liff.ready
        backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
        const api = await backendInstance.post('/order/list')
        setOrderPayload(api.data)
        console.log(api.data)

        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        alert(e.message)
      }
    })()
  }, [])
  if (!isLoading)
    return (
      <>
        <Container py={2} >
          <Text fontSize="3xl" marginTop="10px">Order Detail</Text>
            <Tabs variant="unsytle" marginTop="20px" marginBottom="20px">
              <TabList>
                <Tab _selected={{ color: "white", bg: "red.300" }} borderRadius="20px">COOKING</Tab>
                <Tab _selected={{ color: "white", bg: "green.300" }} borderRadius="20px">COMPLETE</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {orderPayload &&
                    orderPayload.filter((i) => i.status === "COOKING").map((i, index) => {
                      if (index < 10) {
                        return <OrderCard key={index} order={i} statusColor="#F56565"/>
                      }
                      return ""
                    })}
                </TabPanel>
                <TabPanel>
                  {orderPayload &&
                      orderPayload.filter((i) => i.status === "COMPLETE").map((i, index) => {
                        if (index < 10) {
                          return <OrderCard key={index} order={i} statusColor="#68D391"/>
                        }
                        return ""
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
