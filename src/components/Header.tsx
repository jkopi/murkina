import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { HiChevronDown, HiPencil } from 'react-icons/hi';

const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const goTo = (path: string) => {
    return navigate(path);
  };

  const signOut = () => {
    auth
      .signOut()
      .then((_) => {
        navigate('/');
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };

  return (
    <Flex my="8" flexDir="row" alignItems="center" justifyContent="space-between">
      <Heading fontWeight="fontWeights.normal">
        <Link as={RouterLink} to="/">
          🍕 murkina
        </Link>
      </Heading>
      {user && <Text>Hello, {user?.displayName}</Text>}
      <Box>
        {!user ? (
          <Link as={RouterLink} to="/sign-in">
            <Text fontWeight="bold" fontSize="lg">
              Sign-in
            </Text>
          </Link>
        ) : (
          <Stack direction="row" spacing="2">
            <IconButton
              aria-label="create-recipe-button"
              icon={<HiPencil />}
              onClick={() => goTo('/recipe/create')}
              colorScheme="orange"
              rounded="md"
            />
            <Menu>
              <MenuButton as={Button} colorScheme="orange" rightIcon={<HiChevronDown />}>
                {!user ? 'Login' : 'Profile'}
              </MenuButton>
              <MenuList>
                {!user && (
                  <MenuGroup title="User">
                    <MenuItem>Login</MenuItem>
                  </MenuGroup>
                )}
                {user && (
                  <>
                    <MenuGroup title="Recipes">
                      <MenuItem>My Recipes</MenuItem>
                      <MenuItem onClick={() => goTo('/recipe/create')}>Create new</MenuItem>
                    </MenuGroup>
                    <MenuGroup title="User">
                      <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                    </MenuGroup>
                  </>
                )}
              </MenuList>
            </Menu>
          </Stack>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
