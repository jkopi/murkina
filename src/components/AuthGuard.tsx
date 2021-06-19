import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Props {
  children?: React.ReactNode;
}

export const AuthGuard: React.FC<Props> = ({ children }) => {
 // const [user, userLoading, userError] = useAuthState(auth);

 // if (user) {
 //   return (
 //     <> 
 //       {children}
 //     </>
 //   )
 // }

 // if (userLoading) {
 //   return <Spinner />
 // }

 // if (userError) {
 //   return (
 //     <p>Error!</p>
 //   )
 // }

  return null;
}