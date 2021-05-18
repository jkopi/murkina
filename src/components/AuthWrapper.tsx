import firebase from 'firebase';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Spinner from './Spinner'

interface Props {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<Props> = ({ children }) => {
  const [user, userLoading, userError] = useAuthState(firebase.auth());

  if (user) {
    return (
      <div>
        {children}
      </div>
    )
  }

  if (userLoading) {
    return <Spinner />
  }

  if (userError) {
    return (
      <p>Error!</p>
    )
  }
  return <></>;
}