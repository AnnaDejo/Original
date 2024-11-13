import React, { useState } from 'react';
import '../App.css';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';  // for redirection

const SignUpPage = () => {
  const [contactMethod, setContactMethod] = useState('email');
  const [step, setStep] = useState(1);  // to track the current step (1 = first, 2 = second)
  const [userData, setUserData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    country: '',
    state: '',
    pincode: '',
    contactInfo: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleNext = () => {
    if (step === 1) {
      // Validate password confirmation before proceeding to step 2
      if (userData.password !== userData.confirmPassword) {
        alert('Passwords do not match!');
      } else {
        setStep(2);
      }
    } else {
      // At this point, the form is complete, handle the final submission
      alert('Sign Up Complete!');
    }
  };

  const handleSignInRedirect = () => {
    navigate('/signin');  // Redirect to Sign In page
  };

  return (
    <section className="signup-container">
      <div className="header">
        <button className="signin-link" onClick={handleSignInRedirect}>Sign In</button>
      </div>
      <div className="left-side">
        <h2>Welcome to Our Tourism Platform!</h2>
        <p>Discover exciting tourism experiences and create an account to get started.</p>
      </div>
      <div className="right-side">
        <div className="form-wrapper">
          <div className="form-card">
            <h2 className="text-center mb-4">
              {step === 1 ? 'Create Your Account' : 'Enter Contact Details'}
            </h2>
            <p className="text-center mb-5">
              {step === 1 ? 'Join us and explore the best tourism experiences!' : 'Please provide your contact details.'}
            </p>
            <form>
              {step === 1 ? (
                <>
                  {/* First Name, Middle Name, Last Name */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      placeholder="Enter your first name"
                      value={userData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="middleName">Middle Name (Optional)</label>
                    <input
                      type="text"
                      id="middleName"
                      name="middleName"
                      className="form-control"
                      placeholder="Enter your middle name"
                      value={userData.middleName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter your last name"
                      value={userData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Password and Confirm Password */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Create a password"
                      value={userData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm your password"
                      value={userData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Contact Details */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      className="form-control"
                      placeholder="Enter your country"
                      value={userData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className="form-control"
                      placeholder="Enter your state"
                      value={userData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="pincode">Pincode</label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      className="form-control"
                      placeholder="Enter your pincode"
                      value={userData.pincode}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Choose Contact Method */}
                  <div className="form-group contact-method-container">
                    <div className="contact-method-toggle">
                      <div
                        className={`contact-method ${contactMethod === 'email' ? 'active' : ''}`}
                        onClick={() => setContactMethod('email')}
                      >
                        <i className="fas fa-envelope"></i> Email
                      </div>
                      <div
                        className={`contact-method ${contactMethod === 'phone' ? 'active' : ''}`}
                        onClick={() => setContactMethod('phone')}
                      >
                        <i className="fas fa-phone-alt"></i> Phone
                      </div>
                    </div>

                    {/* Conditional Input for Email or Phone */}
                    {contactMethod === 'email' ? (
                      <div className="form-group">
                        <input
                          type="email"
                          id="contactInfo"
                          name="contactInfo"
                          className="form-control"
                          placeholder="Enter your email"
                          value={userData.contactInfo}
                          onChange={handleInputChange}
                        />
                      </div>
                    ) : (
                      <div className="form-group">
                        <input
                          type="tel"
                          id="contactInfo"
                          name="contactInfo"
                          className="form-control"
                          placeholder="Enter your phone number"
                          value={userData.contactInfo}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Next Button */}
              <div className="text-center mt-4">
                <button type="button" className="btn btn-primary btn-block" onClick={handleNext}>
                  {step === 1 ? 'Next' : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
