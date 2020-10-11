import React from 'react'
import Lottie from 'react-lottie'
import * as animationData from './lottie-animation.json'
function LoadingAnimation() {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }}
      height={600}
      width={600}
      isStopped={false}
      isPaused={false}
    />
  )
}
export default LoadingAnimation
