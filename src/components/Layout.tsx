import React from 'react'
import styled from 'styled-components'
import Header from './Header';

const LayoutStyle = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: linear-gradient(to bottom, #e7ffb3, #707070); */
`;

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <LayoutStyle>
        {children}
      </LayoutStyle>
    </>
  )
}

export default Layout
