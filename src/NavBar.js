import React from 'react';
import './NavBar.css';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function NavigationBar() {

  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle sign-in navigation
  const handleSignInClick = () => {
    navigate('/signin'); // Redirect to the sign-in page
  };
  const handleSignUpClick = () => {
    navigate('/signup'); // Redirect to the sign-up page
  };


  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Navbar.Brand as={Link} to="/">Tourism Guidance</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/features">Features</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/signin">
            <FontAwesomeIcon icon={faSignInAlt} /> Sign In
          </Nav.Link>
          <Nav.Link as={Link} to="/signup">
            <FontAwesomeIcon icon={faUserPlus} /> Sign Up
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
