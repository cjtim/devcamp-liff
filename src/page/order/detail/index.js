import React, { useState, useEffect } from 'react'
import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import liff from '@line/liff'
import { LoadingAnimation } from '../../../component/loadingAnimation'
import { Container, HStack, Stack, Text, Box, Flex, Spacer, Divider } from '@chakra-ui/react'

const backendInstance = axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL
})
export function DetailHome() {
    const match = useRouteMatch()
    return (
            <Switch>
                <Route exact path = {match.path} component={() => <OrderDetail/>} />
            </Switch>
    )  
}

function OrderDetail(){
    let { orderId } = useParams()
    const [isLoading, setISLoading] = useState(true)
    const [orderReceipt, setOrderReceipt] = useState([])
    useEffect(() => {
        ;(async () =>{
            try{
                await liff.ready
                backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
                const api = await backendInstance.post('order/get', {orderId})
                console.log(api.data)
                setOrderReceipt(api.data)
                setISLoading(false)
            } catch (err){
                setISLoading(false)
                console.log(err.message)
            }
        })()
    }, [])
    if(!isLoading){
        return(
            <Container maxW="md" paddingLeft = "0px" paddingRight="0px">
                <Text fontWeight="bold" fontSize="3xl">Order Receipt</Text>
                <Stack>
                    <Box p={5} borderWidth="1px">
                        <HStack spacing="24px">
                            <Text fontSize="lg" fontWeight="bold">Restaurant Name</Text>
                        </HStack>
                    </Box>

                    <Box p={5}>
                        <Box marginBottom="10px" fontWeight="bold">Order Summary</Box>
                        <Divider />
                            {orderReceipt.selectedMenu.map((i, index) => {
                                return(
                                    <Flex paddingTop="10px" key={index}>
                                        <Box>{i.name}</Box>
                                        <Spacer/>
                                        <Box>{i.unit} x</Box>
                                    </Flex>
                                )
                            })}
                    </Box>

                    <Box p={5}>
                        <Flex>
                            <Box>Total:</Box>
                            <Spacer/>
                        <Box>{orderReceipt.Transactions[0].amount} บาท</Box>
                        </Flex>
                    </Box>
                </Stack>
            </Container>
        )
    }
    return <LoadingAnimation/>
}

