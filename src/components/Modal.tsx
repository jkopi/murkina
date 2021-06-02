import React from 'react'
import ReactModal from 'react-modal'
import { Recipe } from '../interfaces/Recipe'

interface Props {
  isOpen: boolean;
  children?: React.ReactNode;
  recipe?: Recipe;
}

export const Modal: React.FC<Props> = ({ isOpen, children, recipe, ...props }) => {
  return (
    <ReactModal 
      isOpen={isOpen}
      ariaHideApp={false} 
      {...props}>
      <p>Hello ReactModal!</p>

      <pre>{JSON.stringify(recipe)}</pre>
      {children}
    </ReactModal>
  )
}