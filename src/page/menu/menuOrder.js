// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LoadingAnimation from '../../component/loadingAnimation'
import liff from '@line/liff'
const backendInstance = axios.create({
  baseURL: 'https://restaurant-helper-omise-nwbwsoebza-an.a.run.app'
})
function MenuOrder() {
  const [isLoading, setisLoading] = useState(true)
  const { OmiseCard } = window
  async function onClickPay() {
    setisLoading(false)
    OmiseCard.open({
      amount: 12345,
      currency: 'THB',
      defaultPaymentMethod: 'internet_banking',
      image: 'https://cdn.omise.co/assets/dashboard/images/omise-logo.png',
      frameLabel: 'ร้านอาหารที่1',
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
        window.location.href = paymentUrl.data
      },
      onFormClosed: async () => {
        setisLoading(true)
        window.location.reload()
      }
    })
  }
  useEffect(() => {
    ;(async () => {
      OmiseCard.configure({
        publicKey: process.env.REACT_APP_OMISE_PUB_KEY
      })
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID })
      backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
      console.log(liff.getAccessToken())
      console.log(await liff.getProfile())
      onClickPay()
    })()
  }, [])
  if (isLoading) return <LoadingAnimation />
  return <></>
}
export default MenuOrder
