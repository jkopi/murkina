import { useField } from 'formik';
import React from 'react'
import styled from 'styled-components';
import { Box, Input as FormInput } from '@chakra-ui/react';

interface Props {
  id: string;
  name: string;
  type: string;
  textarea?: boolean;
  placeholder?: string;
}

const ErrorText = styled.p`
  font-size: 14px;
  line-height: 15px;
  margin: 5px 0 0;
  color: #ff0000;
`;

export const Input = ({ id, name, type, textarea, placeholder, ...props }: Props) => {
  const [ field, meta ] = useField({...props, type: type, name: name, id: id})

  return (
    <Box mt="5" mb="5">
      {textarea ? <>asd</> : <FormInput {...field} placeholder={placeholder} colorScheme="orange" variant="outline" />}
      {meta.error && meta.touched ? (
        <ErrorText>{meta.error}</ErrorText>
      ) : null}
    </Box>
  )
}