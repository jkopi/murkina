import { Button, Container, Divider, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import LoginForm from '../components/LoginForm';
import { auth, googleProvider } from '../config/firebase';

const LoginView = () => {
  const [error, setError] = useState<Error>();
  const navigate = useNavigate();

  const authWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((error: Error) => {
        console.error(error);
        setError(error);
      });
  };

  return (
    <Stack m="5">
      <LoginForm />
      <Divider />
      <Text fontWeight="bold" fontSize="2xl">Login with Google</Text>
      <Button colorScheme="facebook" onClick={authWithGoogle}>
        Login
      </Button>
      {error && <p>{error}</p>}
    </Stack>
  );
};

export default LoginView;
