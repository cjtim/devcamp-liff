import { Flex, Box, Center, Divider, Stat, StatLabel, StatNumber, Select } from '@chakra-ui/react'
import React from 'react'

export function DashBoardOrderCard({
  index,
  id,
  status,
  selectedMenu,
  lineuid,
  totalPrice,
  updateFunc
}) {
  return (
    <>
      <Flex justify="center" py={1}>
        <Box w="5xl" borderWidth="1px" rounded="lg" overflow="hidden" bg="white">
          <Flex alignContent="center" alignItems="center">
            <Center minW="2rem">
              {index}
            </Center>
            <CustomDivider />
            <Center minW="20rem">
              <Flex flexDir="column">
                {selectedMenu.map(i => {
                  return <div>{"- " + i.name + ": " + i.note + ", จำนวน: "+ i.unit}</div>
                })}
              </Flex>
            </Center>
            <CustomDivider />
            <Center minW="5rem">
              <Select defaultValue={status} onChange={e => updateFunc(id, e.target.value)}>
                <option value="COOKING" bg="tomato" color="white">
                  กำลังทำ
                </option>
                <option value="WAIT_FOR_PICKUP">รอลูกค้ามารับ</option>
                <option value="COMPLETE">เสร็จ</option>
              </Select>
            </Center>
            <CustomDivider />
            <Stat marginLeft="auto">
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
