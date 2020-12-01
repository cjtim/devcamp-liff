import { Button, Input } from '@chakra-ui/react'
import React from 'react'
import bent from 'bent'
import { useHistory } from 'react-router-dom'

const toJSON = bent('json', process.env.REACT_APP_BACKEND_URL, 'POST')

export function EditProfile() {
  const history = useHistory()
  const [payload, setpayload] = React.useState({
    name: '',
    tel: ''
  })
  function updateData(payload) {
    toJSON('/user/update', payload, {
      authorization: `Bearer ${localStorage.getItem('lineToken')}`
    }).then(data => {
      console.log(data)
      history.push('/profile')
    })
  }
  function handleChange(key, e) {
    setpayload({
      ...payload,
      [key]: e.target.value
    })
  }

  return (
    <>
      <Input placeholder="name" onChange={e => handleChange('name', e)} />
      <Input placeholder="phone number" onChange={e => handleChange('tel', e)} />
      <Button onClick={() => updateData(payload)}>Save</Button>
    </>
  )
}
