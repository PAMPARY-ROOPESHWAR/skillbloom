import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/authService';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (username.trim() === '' || password.trim() === '') {
      setError('All fields are required');
      return;
    }
    const response = await loginService(username, password);
    if (response.token) {
      login(response.token);
      navigate('/');
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Login Page</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
