import { Button } from '@chakra-ui/react'
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { LoadingAnimation } from '../../component/loadingAnimation'
import { useAPI } from '../../function/api'
import { EditProfile } from './edit'

export function ProfileRoute() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={match.path} component={() => <ProfileHome />} />
      <Route path={match.path + '/edit'} component={() => <EditProfile />} />
    </Switch>
  )
}

function ProfileHome() {
  const { data, isLoading } = useAPI('/user/get')
  if (isLoading) return <LoadingAnimation />
  return (
    <>
      <li>{data.name}</li>
      <li>{data.tel}</li>
      <Button as="a" href="/profile/edit" colorScheme="blue" color="white">
        Edit Profile
      </Button>
    </>
  )
}
