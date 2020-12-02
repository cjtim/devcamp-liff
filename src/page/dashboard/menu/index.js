import { Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { DashBoardCreateMenuRoute } from '../create'
import axios from 'axios'
import liff from '@line/liff/dist/lib'

export function DashBoardMenuRoute() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={match.path} component={() => <MenuHome />} />
      <Route path={match.path + '/createMenu'} component={() => <DashBoardCreateMenuRoute />} />
      {/* <Route path={match.path + '/searchMenu'} component={() => <DashBoardSearchMenuRoute />} /> */}
      <Route component={() => 'ไม่พบร้านอาหาร'} />
    </Switch>
  )
}

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

function MenuHome() {
  const [menuPayload, setMenuPayload] = useState(undefined)
  useEffect(() => {
    ;(async () => {
      await liff.ready
      const restaurantId = (
        await backendInstance.post('/restaurant/getbylineuid', {
          lineUid: (await liff.getProfile()).userId
        })
      ).data.id
      const res = await backendInstance.post('/menu/list', {
        restaurantId: restaurantId
      })
      console.log(res.data)
      setMenuPayload(res.data)
    })()
  }, [])
  return (
    <>
      <Button as="a" href="/dashboard/menu/createMenu" colorScheme="blue" color="white">
        Add menu
      </Button>
      All menu
      {menuPayload &&
        menuPayload.map((menu, index) => {
          return (
            <>
              <li key={index}>{menu.name}</li>
            </>
          )
        })}

      <br></br>
      <br></br>
      <Button as="a" href="/dashboard/summary" colorScheme="orange" color="white">
        Summary
      </Button>
      <br></br>
      <br></br>
      <Button as="a" href="/dashboard/search" colorScheme="yellow" color="white">
        Search
      </Button>
    </>
  )
}
