import {
  Flex,
  Box,
  Center,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import React from 'react'

export function DashBoardOrderCard({ index, id, status, selectedMenu, lineuid, totalPrice }) {
  return (
    <>
      <Flex justify="center" py={1}>
        <Box w="5xl" borderWidth="1px" rounded="lg" overflow="hidden" bg="white">
          <Flex alignContent="center" alignItems="center">
            <Center minW="2rem">
              {/* {id} */}
              {index}
            </Center>
            <CustomDivider />
            <Center minW="20rem">
              <Flex flexDir="row">
                {selectedMenu.map(i => {
                  return i.name
                })}
              </Flex>
            </Center>
            <CustomDivider />
            <Center minW="5rem">{status}</Center>
            <CustomDivider />
            <Stat>
              <StatLabel>ราคา</StatLabel>
              <StatNumber>฿{totalPrice}</StatNumber>
            </Stat>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

function CustomDivider() {
  return (
    <Center height="50px">
      <Divider orientation="vertical" />
    </Center>
  )
}
