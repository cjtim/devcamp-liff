import React, { useState } from 'react'
import { useAPI } from '../../function/api'
import { LoadingAnimation } from '../loadingAnimation';
import { AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Text
} from '@chakra-ui/react'
import { MenuCard } from '../menuCard';
import { useHistory, useParams } from 'react-router-dom';
import { CartController } from '../../function/cart.controller';

export function RandomMenu() {
    const { data: randomMenu, isLoading: isShuffling } = useAPI('/menu/random');
    const [unit, setUnit] = useState(1)
    const [note, setNote] = useState('')
    const [isOpen, setIsOpen] = React.useState(true)
    const history = useHistory()

    async function addToBasket(menu, unit, note) {
        try {
          await CartController.addMenu(menu, unit, note, menu.restaurantId)
        } catch (e) {
          CartController.clear()
        }
      }

    if(isShuffling) return <LoadingAnimation />
    return (
        <>
        <AlertDialog isOpen={isOpen}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        เมนูอาหารจาก {randomMenu['Restaurant']['name']}
                    </AlertDialogHeader>

            <AlertDialogBody>
              <MenuCard menu={randomMenu} />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => window.location.reload()}>
                สุ่มใหม่
              </Button>
              <Button colorScheme="green" ml={3} onClick={() => {
                addToBasket(randomMenu, unit, note, randomMenu.restaurantId)
                setUnit(1)
                setNote('')
                history.push(`/restaurant/${randomMenu.restaurantId}`)}}>
                เลือกเมนูนี้
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </>
    )
}
