import React from 'react'
import { createPortal } from 'react-dom';
import styled from 'styled-components'
import { Button } from '../Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0, .7);
  z-index: 1000;
`;

const Modal = styled.div`
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 50px;
  z-index: 1000;
`;

export const CustomModal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <>
      <Overlay />
      <Modal>
        {children}
        <Button onClick={onClose}>Close</Button>
      </Modal>
    </>, document.getElementById("portal")!
  )
}