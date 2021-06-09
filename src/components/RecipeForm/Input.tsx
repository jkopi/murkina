import { useField } from 'formik';
import React from 'react'
import styled from 'styled-components';

interface Props {
  name: string;
  type: string;
  textarea?: boolean;
  placeholder?: string;
}

const Container = styled.div`
  margin: 1rem;
`;

const StyledInput = styled.input`
  padding: .5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ErrorText = styled.p`
  font-size: 14px;
  line-height: 15px;
  margin: 5px 0 0;
  color: #ff0000;
`;

export const Input: React.FC<Props> = ({ name, type, textarea, placeholder, ...props }) => {
  const [ field, meta ] = useField({...props, type: type, name: name})

  return (
    <Container>
      <StyledInput {...field} placeholder={placeholder}/>
      {meta.error && meta.touched ? (
        <ErrorText>{meta.error}</ErrorText>
      ) : null}
    </Container>
  )
}