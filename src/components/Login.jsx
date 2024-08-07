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
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', borderRadius: '15px', overflow: 'hidden' }}>
        <div className="text-center mb-4">
          <img
            src="../../public/todo.jpg" // Placeholder image
            alt="Todo List"
            className="img-fluid rounded-circle mb-3"
            style={{ width: '100px', height: '100px', border: '5px solid #007bff' }}
          />
          <h1 className="card-title" style={{ fontSize: '2rem', color: '#343a40' }}>Todo List App</h1>
          <p className="card-text" style={{ color: '#6c757d' }}>Sign in to manage your tasks and stay organized.</p>
        </div>
        <button 
          onClick={signIn} 
          className="btn btn-primary btn-lg btn-block"
          style={{ fontSize: '1.25rem', padding: '12px 20px' }}>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
