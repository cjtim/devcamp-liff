import { AddIcon } from '@chakra-ui/icons'
import {
  Heading,
  Input,
  Button,
  Stack,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom'
import axios from 'axios'
import liff from '@line/liff/dist/lib'

export function DashBoardCreateMenuRoute() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={match.path} component={() => <CreateMenuHome />} />
      <Route component={() => 'เกิดข้อผิดพลาด'} />
    </Switch>
  )
}

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

function CreateMenuHome() {
  const history = useHistory()
  const format = val => val + ' Bath'
  const parse = val => val.replace(/^\$/, '')

  const [value, setValue] = React.useState('0.00')
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    liff.ready.then(() => {
      backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
    })
  }, [])

  async function addMenu() {
    try {
      const restaurantId = (
        await backendInstance.post('/restaurant/getbylineuid', {
          lineUid: (await liff.getProfile()).userId
        })
      ).data.id
      const payload = {
        name: name,
        url: url,
        price: value,
        restaurantId: restaurantId
      }
      const api = await backendInstance.post('/menu/create', payload)
      console.log(api.data)
      alert('สร้างเมนูสำเร็จ')
      history.push('/dashboard/menu')
    } catch (e) {
      alert(e.message)
    }
  }
  return (
    <>
      <Stack spacing={5}>
        <br></br>
        <Heading as="h1">เพิ่มเมนูอาหาร</Heading>

        <br></br>

        <Input
          placeholder="ชื่อเมนู"
          size="md"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <NumberInput onChange={valueString => setValue(parse(valueString))} value={format(value)}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <InputGroup size="sm">
          <InputLeftAddon children="URL" />
          <Input
            borderRadius="0"
            placeholder="รูปอาหาร"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </InputGroup>

        <Button
          leftIcon={<AddIcon />}
          colorScheme="green"
          variant="solid"
          onClick={() => addMenu()}
        >
          เพิ่มเมนู
        </Button>
      </Stack>
    </>
  )
}
