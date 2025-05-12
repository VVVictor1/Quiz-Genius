import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const data = await loginUser({ email, password });
      console.log('Login successful:', data);
      login(data.token);
      navigate('/getting-started');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.log(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <LoginContainer>
      <div className="text-center mb-4">
        <i className="fas fa-shield-alt fa-3x text-primary"></i>
        <h2 className="mt-3">Welcome Back</h2>
        <p>Sign in to your account</p>
      </div>
      <button className="btn btn-outline-danger w-100 mb-2">
        <i className="fab fa-google me-2"></i> Continue with Google
      </button>
     
      <hr />
      <p className="text-center">Or</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between mb-3">
          <div>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe" className="ms-2">Remember me</label>
          </div>
          <a href="#" className="text-decoration-none">Forgot password?</a>
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <p className="text-center mt-3">
        Don't have an account? <Link to="/register" className="text-decoration-none">Sign up</Link>
      </p>
    </LoginContainer>
  );
};

export default Login;