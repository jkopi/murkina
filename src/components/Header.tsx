import React from 'react'
import styled from "styled-components";

const HeaderStyle = styled.h1`
  color: #cc8500;
`;

const Header: React.FC = () => {
  return (
    <HeaderStyle>
      🍕 murkina
    </HeaderStyle>
  )
}

export default Header;