import React from 'react'
import { Box, Flex, Text, Image, Heading, Icon, Link, VStack } from '@chakra-ui/react'
export function RestaurantCard({ url, name, img, location }) {
  return (
    <Link href={url} style={{ textDecoration: 'none' }}>
      <Box>
        <Flex justify="center">
            <Box w="md" borderWidth="1px" rounded="lg" overflow="hidden" bg="white">
              <Flex alignContent="center" alignItems="center">
                <Box width="120px" height="100px">
                  <Image
                    src={img}
                    objectFit="cover"
                    w="100%"
                    height="100%"
                    alt={'รูปร้านอาหาร ' + name}
                    rounded="lg"
                  />
                </Box>
                <Box px={2}>
                  <Heading size="md" fontFamily="'Prompt'">
                    {name}
                  </Heading>
                  <Text fontSize="sm" color="#444545">
                    {location}
                  </Text>
                </Box>
                <Icon name="chevron-right" marginLeft="auto"/>
              </Flex>
            </Box>
        </Flex> 
      </Box>
    </Link>
  )
}
