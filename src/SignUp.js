import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nationality, setNationality] = useState('');
  const [signInOption, setSignInOption] = useState('phone');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Simulated logged-in state for demo purposes
  const isLoggedIn = false; // Replace with actual logged-in check
  if (isLoggedIn) {
    navigate('/signin');
  }

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear error before validation

    // Basic validation
    if (!name || !password || !confirmPassword || !nationality || (signInOption === 'phone' && !phone) || (signInOption === 'email' && !email)) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Submit data (add your API call here)
    console.log('Form submitted:', {
      name,
      phone,
      email,
      password,
      nationality,
      signInOption,
    });

    // Optionally reset form fields
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setNationality('');
    setSignInOption('phone');
  };

  return (
    <div className="signup-container">
      <div className="background-section">
        <h1>There’s a smarter way to explore tourism</h1>
        <p>Sign up with your details and get exclusive access to personalized travel guidance, local insights, and special deals.</p>
      </div>
      
      <div className="form-section">
        <div className="signup-box">
          <h2>Login / Signup</h2>
          <p>Please enter your details to continue</p>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={handleInputChange(setName)}
              placeholder="Full Name"
              required
            />

            <input
              type="text"
              value={nationality}
              onChange={handleInputChange(setNationality)}
              placeholder="Nationality / Country"
              required
            />

            <div className="option">
              <label>
                <input
                  type="radio"
                  value="phone"
                  checked={signInOption === 'phone'}
                  onChange={() => setSignInOption('phone')}
                />Phone Number
              </label>
              <label>
                <input
                  type="radio"
                  value="email"
                  checked={signInOption === 'email'}
                  onChange={() => setSignInOption('email')}
                />with Email
              </label>
            </div>

            {signInOption === 'phone' ? (
              <div className="phone-input">
                <span>+91</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={handleInputChange(setPhone)}
                  placeholder="Phone Number"
                  required
                />
              </div>
            ) : (
              <input
                type="email"
                value={email}
                onChange={handleInputChange(setEmail)}
                placeholder="Email Address"
                required
              />
            )}

            <input
              type="password"
              value={password}
              onChange={handleInputChange(setPassword)}
              placeholder="Password"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={handleInputChange(setConfirmPassword)}
              placeholder="Confirm Password"
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" className="verify-button">Sign Up</button>
          </form>

          <p className="alternative-option">
            Already have an account? <span className="link" onClick={() => navigate('/signin')}>Sign in here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
