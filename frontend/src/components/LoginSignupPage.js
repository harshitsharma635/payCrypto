import React, { useState } from 'react';
import './LoginSignupPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const LoginSignupPage = ({ setIsLoggedIn, setSignupData, signupData }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const navigate = useNavigate();

  const handleSignupClick = async (e) => { // Use async for asynchronous Axios call
    e.preventDefault();
    try {
      // Make an Axios POST request to your signup endpoint
      const response = await axios.post('/api/signup', formData);
      if (response.status === 200) {
        setIsSignedUp(true);
        setIsLoginMode(true);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsLoginMode(true);
  };

  const handleLogin = async (e) => { // Use async for asynchronous Axios call
    e.preventDefault();
    try {
      // Make an Axios POST request to your login endpoint
      const response = await axios.post('/api/login', formData);
      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate('/home');
      } else {
        setIsLoginFailed(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoginFailed(true);
    }
  };

  return (
    <div className="login-signup-container">
      <h1>PAYCRYPTO: A Fintech Application for the Currency of the Future</h1>
      <form className="login-signup-form" onSubmit={handleLogin}>
        <input
          type="text"
          className="form-input"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        {!isLoginMode && (
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        )}
        <input
          type="password"
          className="form-input"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {isLoginMode ? (
          <div>
            <button type="submit" className="form-button">
              Login
            </button>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        ) : (
          <button type="submit" className="form-button" onClick={handleSignupClick}>
            Signup
          </button>
        )}
      </form>
      {isSignedUp ? (
        <p>
          Already have an account?{' '}
          <Link to="/login" onClick={handleLoginClick}>
            Login
          </Link>
        </p>
      ) : (
        <p>
          You can now{' '}
          <Link to="/login" onClick={handleLoginClick}>
            Login
          </Link>{' '}
          directly.
        </p>
      )}
      {isLoginFailed && (
        <p>
          Login failed.{' '}
          <Link
            to="/login"
            onClick={() => {
              setIsLoginMode(false);
              setIsLoginFailed(false);
            }}
          >
            Retry
          </Link>{' '}
          or{' '}
          <Link
            to="/signup"
            onClick={() => {
              setIsLoginMode(false);
              setIsLoginFailed(false);
            }}
          >
            Return to Signup
          </Link>
        </p>
      )}
    </div>
  );
};

export default LoginSignupPage;