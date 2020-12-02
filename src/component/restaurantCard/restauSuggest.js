import React from 'react'
import { Box, Center, Container, Divider, Flex, HStack, Image, Text, Link } from '@chakra-ui/react'

export default function RestaurantSuggest({ url, name, img, location }) {
    return (
        <Link href={url} style={{ textDecoration: 'none' }}>
            <Box bg="white" rounded="lg" boxShadow="md">
                <Box w="150px" h="100px" color="white">
                <Image
                    src={img}
                    objectFit="cover"
                    w="100%"
                    height="100%"
                    alt={'รูปร้านอาหาร ' + name}
                    rounded="lg"
                    />
                </Box>

                <Box w="150px" h="100px">
                    <Center>
                        <Text fontWeight="semibold">{name}</Text>
                    </Center>
                </Box>
            </Box>
        </Link>
    )
}
