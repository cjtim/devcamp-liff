import React from 'react'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { useParams } from 'react-router-dom'
import { PageLayout } from '../../component/pageLayout'
import { MenuCard } from '../../component/menuCard'
import { useAPI } from '../../function/api'


export function RestaurantMenu() {
  let { restaurantId } = useParams()
  const { data, isLoading } = useAPI('/menu/list', {
    restaurantId: restaurantId
  })

  if (isLoading) return <LoadingAnimation />
  return (
    <PageLayout>
      {data &&
        data.map((menu, index) => {
          return <MenuCard key={index} menu={menu} />
        })}
    </PageLayout>
  )
}
