import React from 'react'
import ReactModal from 'react-modal'

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ isOpen, children, ...props }) => {
  return (
    <ReactModal 
      isOpen={isOpen}
      ariaHideApp={false} 
      {...props}>
      <p>Hello ReactModal!</p>
      {children}
    </ReactModal>
  )
}