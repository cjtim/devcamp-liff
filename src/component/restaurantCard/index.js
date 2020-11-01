import React from 'react'
import { Box, Flex, Text, Image, Heading, Icon, Link } from '@chakra-ui/core'
export function RestaurantCard({ url, name, img, location }) {
  return (
    <Link href={url} style={{textDecoration: 'none'}}>
      <Flex justify="center">
        <Box w="md" borderWidth="1px" rounded="lg" overflow="hidden" bg="white">
          <Flex alignContent="center" alignItems="center">
            <Box width="150px" height="100px">
              <Image
                src={img}
                objectFit="cover"
                w="100%"
                height="100%"
                alt={'รูปร้านอาหาร ' + name}
                rounded="lg"
              />
            </Box>
            <Box pl={4}>
              <Heading size="md" fontFamily="'Prompt'">
                {name}
              </Heading>
              <Text fontSize="sm" color="#444545">{location}</Text>
            </Box>
            <Icon name="chevron-right" />
          </Flex>
        </Box>
      </Flex>
    </Link>
  )
}
