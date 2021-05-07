import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  border: 1px solid black;
  background-color: "#fff";
`;

interface Props {
  onClickEvent: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({ onClickEvent, children }) => {
  return (
    <StyledButton onClick={onClickEvent}>
      {children}
    </StyledButton>
  )
}
