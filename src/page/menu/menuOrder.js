// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LoadingAnimation from '../../component/loadingAnimation'
import liff from '@line/liff'
import { useHistory } from 'react-router-dom'
export function MenuOrder() {
  const history = useHistory()
  const [isLoading, setisLoading] = useState(true)
  const amount = 12345
  // const [amount, setAmount] = useState(12345)
  const restaurantName = "Restaurant1"
  const restaurantIcon = 'https://cdn.omise.co/assets/dashboard/images/omise-logo.png'
  const backendInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
  })
  const { OmiseCard } = window

  async function onClickPay() {
    setisLoading(false)
    OmiseCard.open({
      amount: amount,
      currency: 'THB',
      defaultPaymentMethod: 'internet_banking',
      image: restaurantIcon,
      frameLabel: restaurantName,
      otherPaymentMethods: ['credit_card', 'truemoney', 'alipay'],
      onCreateTokenSuccess: async nonce => {
        setisLoading(true)
        console.log(nonce)
        const paymentUrl = await backendInstance.post(
          '/payment/charges/create',
          {
            source: nonce,
            amount: 20000
          }
        )
        liff.openWindow({url: paymentUrl.data, external: false})
        window.close()
      },
      onFormClosed: async () => {
        setisLoading(true)
        history.goBack()
      }
    })
  }
  useEffect(() => {
    ;(async () => {
      OmiseCard.configure({
        publicKey: process.env.REACT_APP_OMISE_PUB_KEY
      })
      await liff.ready
      backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
      onClickPay()
    })()
  }, [])
  if (isLoading) return <LoadingAnimation />
  return <></>
}
