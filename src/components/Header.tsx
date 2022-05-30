import React from 'react';
import { Flex, Heading, HStack, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

interface Props {
  children?: React.ReactNode;
}

const Header = ({ children }: Props) => {
  const [user] = useAuthState(auth);

  return (
    <Flex my="8" mx="5" flexDir="column">
      <Heading fontWeight="fontWeights.normal">
        <Link as={RouterLink} to="/">
          🍕 murkina
        </Link>
      </Heading>
      {user && <Text>Hello, {user?.displayName}</Text>}
      <HStack spacing="24px">
        {!user ? (
          <Link as={RouterLink} to="/sign-in">
            <Text fontWeight="bold" fontSize="lg">
              Sign-in
            </Text>
          </Link>
        ) : (
          <>
            <Link as={RouterLink} to="/sign-out">
              <Text fontWeight="bold" fontSize="lg">
                Logout
              </Text>
            </Link>
            <Link as={RouterLink} to="/recipe/create">
              <Text fontSize="lg" fontWeight="bold">
                Create new
              </Text>
            </Link>
          </>
        )}
      </HStack>
      {children}
    </Flex>
  );
};

export default Header;
