import React from 'react'
import { ConsoleApiController } from '../../function/consoleapi.controller'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { DashBoardOrderCard } from '../../component/dashboardCard'
import { useHistory } from 'react-router-dom'

export function DashBoardHome() {
  let history = useHistory()
  const { data, error, isRestaurant, isLoading } = ConsoleApiController.realTimeOrder()
  if (!isRestaurant) {
    alert('You are not restaurant account')
    history.push('/')
  }
  if (error) {
    history.push('/')
  }
  if (isLoading) return <LoadingAnimation />
  if (data.length === 0) return "no new order"
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
