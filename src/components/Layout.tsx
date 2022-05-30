import { Container, Flex, Link, List, ListItem } from '@chakra-ui/react';
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Container maxW="container.xl">
        {children}
      </Container>
    </>
  )
}

export default Layout
