import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [activeSection, setActiveSection] = useState('primary'); // State to toggle sections
  const navigate = useNavigate();

  const handleSignInRedirect = () => navigate('/signin');

  const handleSubmit = () => {
    alert('Sign Up Complete!');
  };

  return (
    <section className="signup-container">
      <div className="left-side">
        <h2>Welcome to Our Tourism Platform!</h2>
        <p>Discover new places with personalized guidance by creating your account.</p>
      </div>
      <div className="right-side">
        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${activeSection === 'primary' ? 'active' : ''}`}
            onClick={() => setActiveSection('primary')}
          >
            Primary Details
          </button>
          <button
            className={`toggle-btn ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveSection('contact')}
          >
            Contact Details
          </button>
        </div>

        <div className="form-wrapper">
          {activeSection === 'primary' && (
            <div className="primary-details">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
              <input type="password" placeholder="Password" required />
              <input type="password" placeholder="Confirm Password" required />
            </div>
          )}

          {activeSection === 'contact' && (
            <div className="contact-section">
              <input type="text" placeholder="Country" required />
              <input type="text" placeholder="State" required />
              <input type="text" placeholder="Pincode" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
            </div>
          )}
        </div>

        <div className="button-group">
          <button className="submit-btn" onClick={handleSubmit}>Sign Up</button>
          <span className="signin-link" onClick={handleSignInRedirect}>
            Already have an account? <a href="/signin">Sign In</a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
