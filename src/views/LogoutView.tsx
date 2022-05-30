import { Stack, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';
import { auth } from '../config/firebase';

const LogoutView = () => {
  const [error, setError] = useState<Error>();
  const history = useHistory();

  const signOut = () => {
    auth
      .signOut()
      .then((_) => {
        toast.success(`Logout success`);
        history.push('/');
      })
      .catch((error: Error) => {
        toast.success('Something went wrong');
        console.error(error);
        setError(error);
      });
  };
  return (
    <Stack m="5">
      <Text fontWeight="bold" fontSize="2xl">
        Sign out
      </Text>
      <Button colorScheme="facebook" onClick={signOut}>
        Log out
      </Button>
      {error && <p>{error}</p>}
    </Stack>
  );
};

export default LogoutView;
