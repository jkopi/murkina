import React from 'react'
import styled from "styled-components";

const HeaderStyle = styled.h1`
  color: orange;
`;

const Header: React.FC = () => {
  return (
    <HeaderStyle>
      🍕 Ruoga
    </HeaderStyle>
  )
}

export default Header;