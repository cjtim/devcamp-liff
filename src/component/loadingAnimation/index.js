import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
// import Lottie from 'react-lottie'
// import * as animationData from './lottie-animation.json'
// const option = {
//   loop: true,
//   autoplay: true,
//   animationData: animationData.default,
//   rendererSettings: {
//     preserveAspectRatio: 'xMidYMid slice'
//   }
// }
function LoadingAnimation() {
  // return (
  //   <Lottie
  //     options={option}
  //     height={400}
  //     width={400}
  //     isStopped={false}
  //     isPaused={false}
  //   />
  // )
  return (
    <Flex justify="center" alignItems="center" justifyContent="center" height={window.innerHeight}>
      <Spinner size="xl" thickness="4px" />
    </Flex>
  )
}
export default LoadingAnimation
