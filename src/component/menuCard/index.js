import React from 'react'
import { Box, Flex, Text, Image, Heading, Link } from '@chakra-ui/react'
export function MenuCard({ url, name, img, price }) {
  return (
    <Link href={url} style={{ textDecoration: 'none' }}>
      <Flex justify="center">
        <Box w="md" borderWidth="1px" rounded="lg" overflow="hidden" bg="white">
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
            <Text fontSize="md" fontFamily="prompt" marginLeft="auto" >
              {price + ' บาท'}
            </Text>
            {/* <Icon name="chevron-right" marginLeft="auto" /> */}
          </Flex>
        </Box>
      </Flex>
    </Link>
  )
}
