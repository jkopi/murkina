import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react'
import React, { useRef } from 'react'

interface Props {
  headerText: string;
  bodyText: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Alert: React.FC<Props> = ({ headerText, bodyText, isOpen, onClose }) => {
  // TODO: fix type
  const ref = useRef<any>(null);
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={ref}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{headerText}</AlertDialogHeader>
        <AlertDialogBody>{bodyText}</AlertDialogBody>
        <AlertDialogFooter>
          <Button>No</Button>
          <Button>Yes</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}