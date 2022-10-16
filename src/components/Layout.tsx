import { Container } from '@chakra-ui/react';
import React from 'react';
import { Footer } from './Footer';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Container maxW="container.xl">
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  );
};

export default Layout;
