import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { signInWithPopup, provider, auth } from '../config/firebaseConfig';

const Login = () => {
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(
        login({
          userName: user.displayName,
          profilePic: user.photoURL,
          id: user.uid,
        })
      );
    } catch (err) {
      alert('Error signing in: ' + err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px' }}>
        <h1 className="card-title text-center mb-4">Todo List</h1>
        <button 
          onClick={signIn} 
          className="btn btn-primary btn-block">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
