import React, { useEffect, useState } from 'react'
import LoadingAnimation from '../../component/loadingAnimation'
import { useParams } from 'react-router-dom'
import { PageLayout } from '../../component/pageLayout'
import { MenuCard } from '../../component/menuCard'
import { ApiController } from '../../function/api.controller'

export function RestaurantMenu() {
  let { restaurantId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [menuPayload, setMenuPayload] = useState([])
  useEffect(() => {
    ApiController.menuList(restaurantId).then((data) => {
      setMenuPayload(data)
      setIsLoading(false)
    })
  }, [])
  if (isLoading) return <LoadingAnimation/>
  return (
      <PageLayout>
        {menuPayload &&
          menuPayload.map((menu, index) => {
            return <MenuCard key={index} menu={menu}/>
          })}
      </PageLayout>
    )
}
