import React, { useState } from 'react';
import './SignIn.css';
import simage from '../simage.jpg'; 

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle input change for username
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError('');
  };

  // Handle input change for password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && password) {
      // Submit username and password to server or perform validation
      console.log('Submitted username:', username);
      console.log('Submitted password:', password);
      // You can use API calls here to verify the username and password
    } else {
      setError('Both fields are required');
    }
  };

  return (
    <div className="signin-container">
      <div className="image-section container-fluid">
      </div>
      <div className="form-section">
        <h2>Login to Continue</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
