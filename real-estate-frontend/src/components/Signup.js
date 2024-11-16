import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [contact_no, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !contact_no || !email || !password) {
      setError('All fields are required.');
      return;
    }

    axios
      .post('http://localhost:5000/api/signup', { username, contact_no, email, password })
      .then(() => {
        window.location.href = '/login'; 
      })
      .catch((err) => {

        console.error('Error during signup:', err.response);
        setError(err.response?.data?.error || 'Error during registration');
      });
  };

  return (
    <div className="auth">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact No."
          value={contact_no}
          onChange={(e) => setContactNo(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;