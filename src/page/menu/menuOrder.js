import React from 'react'
import axios from 'axios'
const backendInstance = axios.create({
  url: 'https://restaurant-helper-omise-nwbwsoebza-an.a.run.app/'
})
export default function MenuOrder() {
  const { OmiseCard } = window
  OmiseCard.configure({
    publicKey: 'pkey_test_5lhqfzgfnn0fhy5zo3g'
  })
  async function onClickPay() {
    // event.preventDefault()
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
        console.log(nonce)
        const paymentUrl = await backendInstance.post(
          'https://restaurant-helper-omise-nwbwsoebza-an.a.run.app/payment/charges/create',
          {
            source: nonce
          }
        )
        document.write('Please wait redirecting.....')
        window.location.href = paymentUrl.data
      }
    })
  }
  onClickPay()
  return (
    <>
    </>
  )
}
