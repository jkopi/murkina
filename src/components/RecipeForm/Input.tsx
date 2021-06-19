import { useField } from 'formik';
import React from 'react'
import styled from 'styled-components';
import { Box, Input as FormInput } from '@chakra-ui/react';

interface Props {
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

export const Input: React.FC<Props> = ({ name, type, textarea, placeholder, ...props }) => {
  const [ field, meta ] = useField({...props, type: type, name: name})

  return (
    <Box mt="5" mb="5">
      {textarea ? <>asd</> : <FormInput {...field} placeholder={placeholder} colorScheme="orange" variant="outline" />}
      {meta.error && meta.touched ? (
        <ErrorText>{meta.error}</ErrorText>
      ) : null}
    </Box>
  )
}