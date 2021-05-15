import React from 'react'
import styled from 'styled-components'

interface StyleProps {
  default?: boolean;
  primary?: boolean;
}

const StyledButton = styled.button`
  border: 1px solid black;
  border-radius: 4px;
  background-color: ${(props: StyleProps) => (props.default ? '#fff' : 'white')};
  /* background-color: ${(props: StyleProps) => (props.primary ? '#89d4ff' : 'white')}; */
  min-height: 2rem;
  &:hover {
    background-color: #acacac;
    transition: 200ms linear;
  }
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <StyledButton primary {...props} type="button">
      {children}
    </StyledButton>
  )
}
