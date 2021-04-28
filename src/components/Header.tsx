import React from 'react'
import styled from "styled-components";

const HeaderStyle = styled.h1`
  color: orange;
`;

const Header: React.FC = () => {
  return (
    <HeaderStyle>
      Food is Good
    </HeaderStyle>
  )
}

export default Header;