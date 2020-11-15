import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { cart as atomCart } from '../../recoil'
import CartDrawer from '../cartDrawer'
function PageLayout({ children }) {
  const [cart, setCart] = useRecoilState(atomCart)
  React.useState(() => {
    const localCart = localStorage.getItem('cart')
    if (localCart) setCart(JSON.parse(localCart))
  }, [])
  return (
    <Flex minH="100vh" flexDirection="column">
      <main style={{ flex: 1 }}>{children}</main>
      <footer>
        {cart.selectedMenu && <CartDrawer />}
      </footer>
    </Flex>
  )
}

export { PageLayout }
