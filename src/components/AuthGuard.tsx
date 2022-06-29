import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

interface Props {
  children: JSX.Element;
}

export const AuthGuard = ({ children }: Props) => {
  const [user, userLoading, userError] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace/>;
  }

  return children;
};
