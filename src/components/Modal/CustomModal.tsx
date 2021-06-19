import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const CustomModal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Editing</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}