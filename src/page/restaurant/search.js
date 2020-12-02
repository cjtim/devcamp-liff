import React, { useState } from 'react'
import {
  Switch,
  InputGroup,
  InputRightElement,
  Button,
  Input
} from '@chakra-ui/react'

import { useParams } from 'react-router-dom'
import { SearchIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { MenuCard } from '../../component/menuCard'
import { CartDrawer } from '../../component/cartDrawer'


export function SearchMenuPage() {
  let { restaurantId } = useParams()
  const [name, setName] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [filteredNameData, setfilterNameData] = React.useState('')

  const handleChange = event => setName(event.target.value)

  async function getSearch(name) {
    setIsLoading(true)
    const api = await axios.post(process.env.REACT_APP_BACKEND_URL + '/menu/search', {
      name: name,
      restaurantId: restaurantId
    })
    setfilterNameData(api.data)
    setIsLoading(false)
  }
  if (isLoading) return <LoadingAnimation/>

  return (
    <>
      <br></br>

      <InputGroup size="md">
        <Input pr="4.5rem" placeholder="Enter food name" value={name} onChange={handleChange} />
        <InputRightElement width="4.5rem">
          <Button
            mr="50%"
            h="1.75rem"
            size="l"
            icon=""
            leftIcon={<SearchIcon />}
            onClick={() => getSearch(name)}
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>

      <br></br>
      <br></br>

        {filteredNameData &&
            filteredNameData.map((menu, index) => {
                return <MenuCard key={index} menu={menu} />
            })}
            <CartDrawer/>
    </>
  )
}
