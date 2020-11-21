import liff from '@line/liff'
import axios from 'axios'

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})
async function setHeaders() {
  await liff.ready
  backendInstance.defaults.headers['authorization'] = `Bearer ${liff.getAccessToken()}`
}

export class ConsoleApiController {
  static async getActiveOrder() {
    await setHeaders()
    const api = await backendInstance.post('/console/activeorder')
    return api.data
  }
  /**
   * @param {string} orderId
   * @param {string} status 'WAIT_FOR_PAYMENT' | 'COOKING' | 'WAIT_FOR_PICKUP' | 'COMPLETE' | 'FAILED'
   * @param {string} FailedReason
   */
  static async updateOrderStatus(orderId, status, reason = undefined) {
    await setHeaders()
    const api = await backendInstance.post('/console/updatestatus', {
      orderId: orderId,
      status: status,
      reason: reason
    })
    return api.data
  }
  static async isRestaurant() {
    await setHeaders()
    const api = await backendInstance.post('/console/isrestaurant')
    if (api.status === 200) return true
    return false
  }
}
