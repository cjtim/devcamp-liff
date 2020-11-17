import React, { useEffect, useState } from 'react'
import LoadingAnimation from '../../component/loadingAnimation'
import axios from 'axios'
import liff from '@line/liff'
import { useParams } from 'react-router-dom'
import { PageLayout } from '../../component/pageLayout'
import { MenuCard } from './../../component/menuCard'

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})
export function RestaurantMenu() {
  let { restaurantId } = useParams()
  const [menuPayload, setMenuPayload] = useState([])
  useEffect(() => {
    ;(async () => {
      try {
        await liff.ready
        backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
        const api = await backendInstance.post('/menu/list', {
          restaurantId: restaurantId
        })
        setMenuPayload(api.data)
      } catch (e) {
        alert(e.message)
      }
    })()
  }, [])
  if (menuPayload)
    return (
      <PageLayout>
        {menuPayload &&
          menuPayload.map((menu, index) => {
            return <MenuCard key={index} menu={menu}/>
          })}
      </PageLayout>
    )
  return <LoadingAnimation />
}
