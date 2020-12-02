import { Box, Container, Text, Flex, Center, HStack, VStack, StackDivider } from '@chakra-ui/react'
import React from 'react'
import { RestaurantCard } from '../../component/restaurantCard'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { useAPI } from '../../function/api'
import RestaurantSuggest from '../../component/restaurantCard/restauSuggest'

export function RestaurantHome() {
  const { data: restaurantPayload, isLoading } = useAPI('/restaurant/list')

  if (isLoading) return <LoadingAnimation />
  return (
    <Container h={window.innerHeight}>
      <Center paddingTop="20px" paddingBottom="20px">
        <Text fontWeight="bold" fontSize="xl">ร้านอาหารแนะนำ</Text>
      </Center>
      <Flex display="Flex" overflowX="auto" paddingBottom="10px">
        <HStack spacing="10px">

      {restaurantPayload &&
          restaurantPayload.map((restraunt, index) => {
            return (
              <RestaurantSuggest
              key={index}
              name={restraunt.name}
              img={restraunt.imgUrl[0]}
              location={restraunt.address}
              url={'/restaurant/' + restraunt.id}
              />
              )
            })}
            </HStack>
      </Flex>

      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={8}
        py={4}
        align="stretch"
      >
        <Box>
          {restaurantPayload &&
            restaurantPayload.map((restraunt, index) => {
              return (
                <RestaurantCard
                key={index}
                name={restraunt.name}
                img={restraunt.imgUrl[0]}
                location={restraunt.address}
                url={'/restaurant/' + restraunt.id}
                />
                )
              })}
        </Box>
      </VStack>
    </Container>
  )
}
