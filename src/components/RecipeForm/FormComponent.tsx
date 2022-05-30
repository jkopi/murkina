import { Form } from 'formik'
import React from 'react'

interface Props {
  children?: React.ReactNode;
}

export const FormComponent = ({ children, ...props }: Props) => {
  return (
    <Form {...props}>
      {children}
    </Form>
  )
}