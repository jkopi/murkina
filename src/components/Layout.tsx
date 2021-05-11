import React from 'react'
import styled from 'styled-components'
import Header from './Header';

const Container = styled.div`
  margin: auto;
  max-width: 1070px;
`;

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
