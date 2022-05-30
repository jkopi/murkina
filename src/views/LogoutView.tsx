import React, { useState } from 'react'
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
        history.push("/");
      })
      .catch((error: Error) => {
        toast.success("Something went wrong");
        console.error(error);
        setError(error);
      })
  }
  return (
    <>
      <button onClick={signOut}>Sign me out!</button>
      {error && <p>{error}</p>}
    </>
  )
}

export default LogoutView
