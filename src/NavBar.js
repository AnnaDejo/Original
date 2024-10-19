import React from 'react';
import './NavBar.css';
import { Navbar, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Navbar.Brand href="#home">Tourism Guidance</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#sign-in">
            <FontAwesomeIcon icon={faSignInAlt} /> Sign In
          </Nav.Link>
          <Nav.Link href="#sign-up">
            <FontAwesomeIcon icon={faUserPlus} /> Sign Up
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
