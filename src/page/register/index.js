import { AddIcon, PhoneIcon } from '@chakra-ui/icons'
import { Heading, InputLeftElement, Input, Text, Button, Stack, InputGroup, InputLeftAddon, NumberInput, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInputStepper, Textarea, useToast, FormControl, FormLabel } from '@chakra-ui/react'
import liff from '@line/liff/dist/lib'
import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import axios from 'axios'

export function RegisterRoute() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={match.path} component={() => <RegisterPage />} />
            <Route component={() => 'เกิดข้อผิดพลาด'} />
        </Switch>
    )
}


function RegisterPage() {

    const toast = useToast()

    const [name, setName] = useState("")

    const [description, setDescription] = useState("")

    const handleDescriptionInputChange = (e) => {
        let inputdescription = e.target.value
        setDescription(inputdescription)
    }

    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [url, setUrl] = useState("")

    const handleAddressInputChange = (e) => {
        let inputaddress = e.target.value
        setAddress(inputaddress)
    }
    useEffect(() => {
        liff.ready.then()
    }, [])

    async function register() {
        const lineUid = (await liff.getProfile()).userId
        const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/restaurant/create', {
            name: name,
            description: description,
            address: address,
            phone: phone,
            imgUrl: [url],
            lineUid: lineUid
        })
    }
    return (
        <>
            <Stack spacing={5}>
                <br></br>
                <Heading as="h1" textAlign={['left', 'center']}>สมัครสมาชิกร้านค้า</Heading>
                <br></br>

                <FormControl id="res-name" isRequired>
                    <FormLabel>ชื่อร้าน</FormLabel>
                </FormControl>
                <Input placeholder="ใส่ชื่อร้าน" size="md" value={description} value={name} onChange={(e) => setName(e.target.value)} />

                <Text mb="8px">คำอธิบายร้าน: {description}</Text>
                <Textarea
                    value={description}
                    onChange={handleDescriptionInputChange}
                    placeholder="ใส่คำอธิบายร้าน"
                    size="sm"
                />


                <Text mb="8px">ตำแหน่งร้าน: {address}</Text>
                <Textarea
                    value={address}
                    onChange={handleAddressInputChange}
                    placeholder="ใส่ตำแหน่งร้าน"
                    size="sm"
                />

                <FormControl id="phone-num" isRequired> 
                    <FormLabel>เบอร์ติดต่อ</FormLabel>
                </FormControl>

                <InputGroup>

                    <Input placeholder="ใส่เบอร์ติดต่อ" onChange={e => setPhone(e.target.value)} />
                    <InputLeftElement children={<PhoneIcon color="green.500" />} />
                </InputGroup>

                <InputGroup size="sm">
                    <InputLeftAddon children="URL" onChange={e => setUrl(e.target.value)} />
                    <Input borderRadius="0" placeholder="รูปร้านอาหาร" />
                </InputGroup>


                {/* <Input borderRadius="0" placeholder="Line ID" /> */}

                <Button leftIcon={<AddIcon />} colorScheme="green" variant="solid"
                    onClick={() => {
                        register()
                        toast({
                            title: "สมัครสมาชิกเสร็จเรียบร้อย",
                            description: "คุณสามารถเพิ่มรายการอาหารให้ร้านค้าของคุณได้ทันที",
                            status: "success" ,
                            duration: 4000,
                            isClosable: true,
                        })
                    }}>
                    สมัครสมาชิก
            </Button>


            </Stack>

            <br></br>

        </>
    )
}
