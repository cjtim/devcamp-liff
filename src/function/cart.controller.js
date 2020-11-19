import {
  cart as atomCart,
  currentRestaurant as atomCurrentRestaurant,
  currentRestaurant
} from '../recoil'
import { promiseSetRecoil, promiseGetRecoil } from 'recoil-outside'

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
  static async plusMenuUnit(menuObj, restaurantId) {
    try {
      await promiseSetRecoil(currentRestaurant, restaurantId)
      const cart = await promiseGetRecoil(atomCart)
      let foundIndex = cart.findIndex(x => x.menuId === menuObj.id)
      if (foundIndex >= 0) {
        await promiseSetRecoil(
          atomCart,
          cart.map((i, index) => {
            if (index === foundIndex) {
              return {
                ...i,
                unit: i.unit + 1
              }
            }
            return i
          })
        )
      } else {
        await promiseSetRecoil(atomCart, [
          ...cart,
          {
            menuId: menuObj.id,
            name: menuObj.name,
            note: '',
            price: menuObj.price,
            unit: 1,
            img: menuObj.img,
            restaurantId: menuObj.restaurantId
          }
        ])
      }
      await this.saveLocalStorage()
    } catch (e) {
      this.clear()
    }
  }
  static async setOrderNote(noteText, menuId) {
    const cart = await promiseGetRecoil(atomCart)
    let foundIndex = cart.findIndex(x => x.menuId === menuId)
    await promiseSetRecoil(
      atomCart,
      cart.map((i, index) => {
        if (index === foundIndex) {
          return {
            ...i,
            note: noteText
          }
        }
        return i
      })
    )
    await this.saveLocalStorage()
  }
  static getTotalPrice(cart) {
    let findMax = (prev, current) => {
      return prev + current.price * current.unit
    }
    let total = (cart).reduce(findMax, 0)
    return total
  }
}
