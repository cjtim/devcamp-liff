import React from 'react'
import { ConsoleApiController } from '../../function/consoleapi.controller'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { DashBoardOrderCard } from '../../component/dashboardCard'
import { useHistory } from 'react-router-dom'
import useSWR from 'swr'

export function DashBoardHome({ liffAccessToken }) {
  const { data, error } = useSWR('/dashboard/activeorder', ConsoleApiController.realTimeOrder(liffAccessToken), { refreshInterval: 5000 })
  if (error) {
    let history = useHistory()
    alert('You are not restaurant account')
    history.push('/')
  }

  if (!data && !error) return <LoadingAnimation />
  return (
    <>
      {data && 
        data.map((order, index) => {
          return (
            <DashBoardOrderCard
              key={index}
              index={index+1}
              id={order.id}
              selectedMenu={order.selectedMenu}
              status={order.status}
              totalPrice={order['Transactions.amount']}
              updateFunc={ConsoleApiController.updateOrderStatus}
            />
          )
        })}
    </>
  )
}
