import React from 'react'
import styled from "styled-components";

const HeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #cfcfcf;
  align-items: center;
`;

const HeaderStyle = styled.h1`
  color: #cc8500;
  margin-right: 2rem;
`;

interface Props {
  children?: React.ReactNode;
}

const Header: React.FC<Props> = ({ children }) => {
  return (
    <HeaderBar>
      <HeaderStyle>
        🍕 murkina
      </HeaderStyle>
      {children}
    </HeaderBar>
  )
}

export default Header;