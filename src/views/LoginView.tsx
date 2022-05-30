import { Button, Container, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';
import { auth, googleProvider } from '../config/firebase';

const LoginView = () => {
  const [error, setError] = useState<Error>();
  const history = useHistory();

  const authWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res);
        toast.success(`Logged in as ${res.user?.displayName}`);
        history.push('/');
      })
      .catch((error: Error) => {
        console.error(error);
        setError(error);
      });
  };

  return (
    <Stack m="5">
      <Text fontWeight="bold" fontSize="2xl">Login with Google</Text>
      <Button colorScheme="facebook" onClick={authWithGoogle}>
        Login
      </Button>
      {error && <p>{error}</p>}
    </Stack>
  );
};

export default LoginView;
