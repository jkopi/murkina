import { Flex, Heading } from '@chakra-ui/react';
import React from 'react'

interface Props {
  children?: React.ReactNode;
}

const Header: React.FC<Props> = ({ children }) => {
  return (
    <Flex>
      <Heading fontWeight="fontWeights.normal">
        🍕 murkina
      </Heading>
      {children}
    </Flex>
  )
}

export default Header;