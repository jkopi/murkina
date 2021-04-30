import React from 'react'
import styled from 'styled-components'
import Header from './Header';

const LayoutStyle = styled.div``;

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
