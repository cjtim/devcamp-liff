import React, { useEffect, useState } from 'react'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { useParams } from 'react-router-dom'
import { PageLayout } from '../../component/pageLayout'
import { MenuCard } from '../../component/menuCard'
import liff from '@line/liff'
import axios from 'axios'

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

export function RestaurantMenu() {
  let { restaurantId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [menuPayload, setMenuPayload] = useState([])
  useEffect(() => {
    liff.ready.then(() => {
      backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
      backendInstance
        .post('/menu/list', {
          restaurantId: restaurantId
        })
        .then(res => {
          setMenuPayload(res.data)
          setIsLoading(false)
        })
    })
  }, [])
  if (isLoading) return <LoadingAnimation />
  return (
    <PageLayout>
      {menuPayload &&
        menuPayload.map((menu, index) => {
          return <MenuCard key={index} menu={menu} />
        })}
    </PageLayout>
  )
}
