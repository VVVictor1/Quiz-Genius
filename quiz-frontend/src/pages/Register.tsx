import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../services/authService';

const RegisterContainer = styled.div`
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

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!firstName || !lastName || !email || !password){
      setError('Please enter all fields');
      return;
    }
    try {
      const data = await signupUser({ firstName, lastName, email, password });
      console.log('Registration successful:', data);
      navigate('/login');
     
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <RegisterContainer>
      <div className="text-center mb-4">
        <i className="fas fa-user-plus fa-3x mb-3"></i>
        <h2>Create an Account</h2>
        <p>Join us and start your learning journey</p>
      </div>
      <button className="btn btn-outline-danger w-100 mb-3">
        <i className="fab fa-google me-2"></i> Sign Up with Google
      </button>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <p className="text-center mt-3">
        Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
      </p>
    </RegisterContainer>
  );
};

export default Register;