import { Flex, Box, Center, Divider, Stat, StatLabel, StatNumber, Select, VStack, Text, Button, ButtonGroup, Spacer, Link } from '@chakra-ui/react'
import React, { useState } from 'react'

export function DashBoardOrderCard({
  index,
  id,
  status,
  selectedMenu,
  lineuid,
  totalPrice,
  updateFunc
}) {
  const [newStatus, setNewStatus] = useState(status)

  return (
    <>
      <Flex mt={4} borderWidth="4px" alignItems="center" marginBottom="30px">
        <Flex alignItems="center">
          <Box ml={5} mr={5}>
            {index}
          </Box>
          <Spacer />
          <Box>
            <CustomDivider />
          </Box>
        </Flex>

        <Flex alignItems="center">
          <Box m={3} w="sm">
            {selectedMenu.map((i, index) => {
              return <Text fontWeight="bold" key={index}>{"- " + i.name + ": " + i.note + ", จำนวน: " + i.unit}</Text>
            })}
            <Divider mt={3} mb={3} />
            <Text>ลูกค้า: ไอหมูพีพี</Text>
            <Text>เบอร์โทร: 0901234567</Text>
          </Box>
          <Spacer />
          <Box>
            <CustomDivider />
          </Box>
        </Flex>

        <Flex alignItems="center">
          <ButtonGroup>
            <VStack m={3}>
              <Button onClick={e => {
                setNewStatus("COOKING")
                updateFunc(id, e.target.value)
              }} value="COOKING" colorScheme="blue" isDisabled={newStatus === "COOKING" || newStatus === "WAIT_FOR_PICKUP" || newStatus ==="COMPLETE" ? true : false}>กำลังทำ</Button>
              <Button onClick={e => {
                setNewStatus("WAIT_FOR_PICKUP")
                updateFunc(id, e.target.value)
              }} value="WAIT_FOR_PICKUP" colorScheme="purple" isDisabled={newStatus === "WAIT_FOR_PICKUP" || newStatus ==="COMPLETE" ? true : false}>รอลูกค้ามารับ</Button>
              <Button onClick={e => {
                setNewStatus("COMPLETE")
                updateFunc(id, e.target.value)
              }} value="COMPLETE" colorScheme="green" isDisabled={newStatus === "COMPLETE" ? true : false}>เสร็จสิ้น</Button>
              <Button onClick={e => {
                setNewStatus("FAILED")
                updateFunc(id, e.target.value)
              }} value="FAILED" colorScheme="red" isDisabled={newStatus === "FAILED" ? true : false}>ยกเลิก</Button>
            </VStack>
          </ButtonGroup>
          <CustomDivider />
        </Flex>

        <Flex alignItems="center">
          <Stat ml={4}>
            <StatLabel>ราคารวม</StatLabel>
            <StatNumber>฿{totalPrice}</StatNumber>
          </Stat>
        </Flex>

      </Flex>
    </>
  )

}

function CustomDivider() {
  return (
    <Center h="150px">
      <Divider orientation="vertical" color="#E2E8F0" />
    </Center>
  )
}

{/* <Select defaultValue={status} onChange={e => updateFunc(id, e.target.value)}>
<option value="COOKING" bg="tomato" color="white">
กำลังทำ
</option>
<option value="WAIT_FOR_PICKUP">รอลูกค้ามารับ</option>
<option value="COMPLETE">เสร็จ</option>
</Select> */}
