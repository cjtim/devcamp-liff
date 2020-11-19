import liff from '@line/liff'
import axios from 'axios'

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})
async function setHeaders() {
  await liff.ready
  backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
}
export class ApiController {
  static async restaurantList() {
    await setHeaders()
    const api = await backendInstance.post('/restaurant/list')
    return api.data
  }
  static async checkout(cart, currentRestaurant) {
    await setHeaders()
    const payload = await backendInstance.post('/order/create', {
      selectedMenu: cart.map(object => ({ ...object })),
      restaurantId: currentRestaurant
    })
    console.log(payload.data)
    const scb = await backendInstance.post('/transaction/create', {
      payAmount: payload.data.totalAmount,
      orderId: payload.data.id
    })
    console.log(scb.data)
    return scb.data.deeplinkUrl
  }
  static async menuList(restaurantId) {
    const api = await backendInstance.post('/menu/list', {
      restaurantId: restaurantId
    })
    return api.data
  }
  static async transactionIsPaid(transactionId){
    await setHeaders()
    const response = await backendInstance.post('/transaction/ispaid', {
      transactionId: transactionId
    })
    return response.data.paid
  }
}
