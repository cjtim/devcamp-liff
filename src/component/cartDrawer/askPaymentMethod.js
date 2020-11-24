import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react'

export function AskPaymentMethod({ setIsOpen, checkout }) {
  const cancelRef = React.useRef()

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
        onOverlayClick={() => setIsOpen(false)}
        onEsc={() => setIsOpen(false)}
        isOpen={true}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Bypass Payment?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Do you want to skip payment system?</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                setIsOpen(false)
                checkout(true)
              }}
            >
              Bypass (Guest)
            </Button>
            <Button
              ref={cancelRef}
              onClick={() => {
                setIsOpen(false)
                checkout(false)
              }}
              ml={3}
            >
              Pay with SCB
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
