import React from 'react'
import { CartDrawer } from '../../component/cartDrawer';
import { LoadingAnimation } from '../../component/loadingAnimation';
import { useAPI } from '../../function/api'
import { RandomMenu } from '../../component/shufflecard'

export function ShuffleMenu() {
    const {data: shuffleMenuPayload, isLoading: isShuffling} = useAPI('/menu/random');
    if(!shuffleMenuPayload) return <LoadingAnimation />
    // if()
    return (
        <>
        <RandomMenu />
        </>
    )
}
