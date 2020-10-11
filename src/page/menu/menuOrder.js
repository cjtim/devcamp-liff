// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LoadingAnimation from '../../component/loadingAnimation'

function MenuOrder() {
  const [isLoading, setisLoading] = useState(true)
  const { OmiseCard } = window
  async function onClickPay() {
    OmiseCard.open({
      amount: 12345,
      currency: 'THB',
      defaultPaymentMethod: 'internet_banking',
      image: 'https://cdn.omise.co/assets/dashboard/images/omise-logo.png',
      frameLabel: 'ร้านอาหารที่1',
      otherPaymentMethods: [
        'credit_card',
        'truemoney',
        'internet_banking',
        'alipay',
        'promptpay'
      ],
      onCreateTokenSuccess: async nonce => {
        setisLoading(true)
        console.log(nonce)
        const paymentUrl = await axios.post(
          'https://restaurant-helper-omise-nwbwsoebza-an.a.run.app/payment/charges/create',
          {
            source: nonce
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
    OmiseCard.configure({
      publicKey: process.env.REACT_APP_OMISE_PUB_KEY
    })
    onClickPay()
    setisLoading(false)
  }, [])
  if (isLoading) return <LoadingAnimation />
  return <></>
}
export default MenuOrder
