import React from 'react'
import { Flex, Text, Box, Image, Heading, Link, Input } from '@chakra-ui/react'

export function OrderCard({ id, name, note, price, img, unit, restaurantId, url, setNote }) {
  return (
    <Link href={url} style={{ textDecoration: 'none' }}>
      <Flex justify="center">
        <Box w="md" borderWidth="1px" rounded="lg" py={2} overflow="hidden" bg="white">
          <Flex alignContent="center" alignItems="center">
            <Box width="120px" height="100px">
              <Image
                src={img}
                objectFit="cover"
                w="100%"
                height="100%"
                alt={'รูปร้านเมนู ' + name}
                rounded="lg"
              />
            </Box>
            <Box px={2}>
              <Heading size="md" fontFamily="'Prompt'">
                {name}
              </Heading>
            </Box>
            <Flex justify="center" flexDir="column" marginLeft="auto">
              <Text fontSize="md" fontFamily="prompt" marginLeft="auto">
                {`${unit} หน่วย`}
              </Text>
              <Text fontSize="md" fontFamily="prompt" marginLeft="auto">
                {price * unit + ' บาท'}
              </Text>
            </Flex>
          </Flex>
          <Input
            placeholder="Note เช่น ไม่เผ็ด"
            size="md"
            value={note}
            onChange={e => setNote(e.target.value, id)}
          />
        </Box>
      </Flex>
    </Link>
  )
}
