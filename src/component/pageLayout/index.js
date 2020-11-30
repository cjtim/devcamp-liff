import { Flex } from '@chakra-ui/react'
import React from 'react'
import { CartDrawer } from '../cartDrawer'
function PageLayout({ children }) {
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
