import React from 'react'
import { ConsoleApiController } from '../../function/consoleapi.controller'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { DashBoardOrderCard } from '../../component/dashboardCard'
export function DashBoardHome() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [orders, setorders] = React.useState(undefined)
  React.useEffect(() => {
    ConsoleApiController.getActiveOrder().then(data => {
      setorders(data)
      setIsLoading(false)
    })
  }, [])
  if (isLoading) return <LoadingAnimation />
  return (
    <>
      {orders &&
        orders.map((order, index) => {
          return (
            <DashBoardOrderCard
              key={index}
              index={index}
              id={order.id}
              selectedMenu={order.selectedMenu}
              status={order.status}
              totalPrice={order['Transactions.amount']}
            />
          )
        })}
    </>
  )
}
