import React from 'react'
import Lottie from 'react-lottie'
import * as animationData from './lottie-animation.json'
const option = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
function LoadingAnimation() {
  return (
    <Lottie
      options={option}
      height={400}
      width={400}
      isStopped={false}
      isPaused={false}
    />
  )
}
export default LoadingAnimation
