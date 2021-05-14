import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  border: 1px solid black;
  border-radius: 4px;
  background-color: "#fff";
  min-height: 2rem;
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <StyledButton {...props} type="button">
      {children}
    </StyledButton>
  )
}
