import React from 'react'
import { useRecoilValue } from 'recoil'
import {cart as atomCart} from '../../recoil'
import CartDrawer from '../cartDrawer'
function PageLayout({ children }) {
    const cart = useRecoilValue(atomCart)
    React.useState(() => {
        
    }, [])
    return (
        <main>
            {children}
            {cart.selectedMenu && <CartDrawer/>}
        </main>
    )
}
export { PageLayout }
