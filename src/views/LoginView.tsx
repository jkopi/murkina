import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useHistory } from 'react-router'
import { auth, googleProvider } from '../config/firebase'

const LoginView: React.FC = () => {
  const [error, setError] = useState<Error>();
  const history = useHistory();

  const gSign = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res);
        toast.success(`Logged in as ${res.user?.displayName}`)
        history.push("/");
      })
      .catch((error: Error) => {
        console.error(error);
        setError(error);
      })
  }

  return (
    <div>
      <button onClick={() => gSign()}>Sign me up!</button>
      {error && <p>{error}</p>}
    </div>
  )
}

export default LoginView;