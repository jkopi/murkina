import { Spinner } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom';
import { auth } from '../config/firebase';

interface Props {
  children?: React.ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
  const [user, userLoading, userError] = useAuthState(auth);
  const navigate = useHistory();

  if (user) {
    return <>{children}</>;
  }

  if (userLoading) {
    return <Spinner />;
  }

  if (userError) {
    return <p>Error!</p>;
  }

  navigate.push("/");

  return null;
};
