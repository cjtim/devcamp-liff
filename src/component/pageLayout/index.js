import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { cart as atomCart } from '../../recoil'
import CartDrawer from '../cartDrawer'
function PageLayout({ children }) {
  const cart = useRecoilValue(atomCart)
  React.useState(() => {}, [])
  return (
    <Flex minH="100vh" flexDirection="column">
      <main style={{flex: 1}}>
        {children}
      </main>
      <footer>
        <Box>{cart.selectedMenu && <CartDrawer />}</Box>
      </footer>
    </Flex>
  )
}

export { PageLayout }
