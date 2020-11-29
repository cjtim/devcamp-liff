import { atom } from 'recoil'

export const lineAcctoken = atom({
  key: 'lineacctoken', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

export const cart = atom({
  key: 'cart',
  default: []
})

export const currentRestaurant = atom({
  key: 'currentRestaurant',
  default: ""
})
