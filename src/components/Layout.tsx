import React from 'react'
import styled from 'styled-components'
import Header from './Header';

const Container = styled.div``;

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        {children}
      </Container>
    </>
  )
}

export default Layout
