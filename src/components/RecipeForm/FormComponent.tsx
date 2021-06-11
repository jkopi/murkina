import { Form } from 'formik'
import React from 'react'

interface Props {
  children?: React.ReactNode;
}

export const FormComponent: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Form {...props}>
      {children}
    </Form>
  )
}