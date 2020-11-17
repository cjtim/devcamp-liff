import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { cart as atomCart, currentRestaurant as atomCurrentRestaurant  } from '../../recoil'
import CartDrawer from '../cartDrawer'
function PageLayout({ children }) {
  const setCart = useSetRecoilState(atomCart)
  const setCurrentRestaurant = useSetRecoilState(atomCurrentRestaurant)
  React.useEffect(() => {
    const localCart = localStorage.getItem('cart')
    if (localCart) {
      setCart(JSON.parse(localCart))
    }
    const localCurrentRestaurant = localStorage.getItem('currentRestaurant')
    if (localCurrentRestaurant)
      setCurrentRestaurant(JSON.parse(localCurrentRestaurant))
  }, [])
  return (
    <Flex minH="100vh" flexDirection="column">
      <main style={{ flex: 1 }}>{children}</main>
      <footer>
        <CartDrawer />
      </footer>
    </Flex>
  )
}

export { PageLayout }
