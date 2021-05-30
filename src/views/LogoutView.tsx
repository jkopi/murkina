import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { auth } from '../config/firebase';

const LogoutView: React.FC = () => {
  const [error, setError] = useState<Error>();
  const history = useHistory();

  const signOut = () => {
    auth
      .signOut()
      .then((res) => {
        console.log(res);
          setTimeout(() => {
            history.push("/")
          }, 2000);
      })
      .catch((error: Error) => {
        console.error(error);
        setError(error);
      })
  }
  return (
    <>
      <button onClick={() => signOut()}>Sign me out!</button>
      {error && <p>{error}</p>}
    </>
  )
}

export default LogoutView
