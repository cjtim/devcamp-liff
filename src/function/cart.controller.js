import { cart as atomCart, currentRestaurant as atomCurrentRestaurant } from '../recoil'
import { promiseSetRecoil, promiseGetRecoil } from 'recoil-outside'
import { useRecoilValue } from 'recoil'

export class CartController {
  static clear() {
    localStorage.removeItem('cart')
    localStorage.removeItem('currentRestaurant')
    promiseSetRecoil(atomCart, [])
    promiseSetRecoil(atomCurrentRestaurant, '')
  }
  static load() {
    const localCart = localStorage.getItem('cart')
    if (localCart) {
      promiseSetRecoil(atomCart, JSON.parse(localCart))
    }
    const localCurrentRestaurant = localStorage.getItem('currentRestaurant')
    if (localCurrentRestaurant)
      promiseSetRecoil(atomCurrentRestaurant, JSON.parse(localCurrentRestaurant))
  }
  static async saveLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(await promiseGetRecoil(atomCart)))
    localStorage.setItem(
      'currentRestaurant',
      JSON.stringify(await promiseGetRecoil(atomCurrentRestaurant))
    )
  }
  static async addMenu(menuObj, unit, note, restaurantId) {
    const oldRestaurant = await promiseGetRecoil(atomCurrentRestaurant)
    if (restaurantId !== oldRestaurant && oldRestaurant !== '') {
      alert('คุณได้เปลี่ยนร้านอาหาร ตระกร้าของคุณจะถูกล้าง')
      this.clear()
    }
    const id = Math.floor(Math.random() * 10 ** 16)
    await promiseSetRecoil(atomCurrentRestaurant, restaurantId)
    const cart = await promiseGetRecoil(atomCart)
    await promiseSetRecoil(atomCart, [
      ...cart,
      {
        id: id,
        menuId: menuObj.id,
        name: menuObj.name,
        note: note,
        price: menuObj.price,
        unit: unit,
        img: menuObj.img,
        restaurantId: menuObj.restaurantId
      }
    ])
    await this.saveLocalStorage()
  }
  static async updateMenu(id, unit, note) {
    if (unit === 0) return this.removeMenu(id)
    const cart = await promiseGetRecoil(atomCart)
    let foundIndex = cart.findIndex(x => x.id === id)
    await promiseSetRecoil(
      atomCart,
      cart.map((i, index) => {
        if (index === foundIndex) {
          return {
            ...i,
            unit: unit,
            note: note
          }
        }
        return i
      })
    )
    await this.saveLocalStorage()
  }
  static async removeMenu(id) {
    const cart = await promiseGetRecoil(atomCart)
    let foundIndex = cart.findIndex(x => x.id === id)
    await promiseSetRecoil(
      atomCart,
      cart.filter((i, index) => index !== foundIndex)
    )
    await this.saveLocalStorage()
  }
  static getTotalPrice(cart) {
    let findMax = (prev, current) => {
      return prev + current.price * current.unit
    }
    let total = cart.reduce(findMax, 0)
    return total
  }
}
