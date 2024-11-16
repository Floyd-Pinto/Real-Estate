import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/user-login', { username, password })
      .then((res) => {
        console.log('Login response:', res.data); 

        const { reviewer_id, authToken, user } = res.data;

        if (reviewer_id && authToken) {

          localStorage.setItem('reviewer_id', reviewer_id);
          localStorage.setItem('authToken', authToken);  
          localStorage.setItem('user', JSON.stringify(user));

          login({ username }); 

          navigate('/dashboard');
        } else {
          console.error('Missing reviewer_id or authToken in the response');
          setError('Login failed. Please try again.');
        }
      })
      .catch((err) => {
        console.error('Login error:', err.response ? err.response.data : err.message);
        setError('Invalid credentials');
      });
  };

  return (
    <div className="auth">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;