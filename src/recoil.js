import { atom } from 'recoil'

export const lineState = atom({
  key: 'lineState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})
