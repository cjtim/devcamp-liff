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
  useDisclosure
} from '@chakra-ui/react'

export function AskPaymentMethod({ isOpen, setIsOpen, payWithSCB, bypassPayment }) {
  const { onClose } = useDisclosure()
  const cancelRef = React.useRef()

  function close() {
    onClose()
    setIsOpen(false)
  }

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={() => close()}
        onOverlayClick={() => close()}
        onEsc={() => close()}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Bypass Payment?</AlertDialogHeader>
          <AlertDialogCloseButton/>
          <AlertDialogBody>Do you want to skip payment system?</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                close()
                bypassPayment()
              }}
            >
              Bypass (Guest)
            </Button>
            <Button
              ref={cancelRef}
              onClick={() => {
                close()
                payWithSCB()
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
