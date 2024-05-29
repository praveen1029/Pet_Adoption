import '../components/navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../images/pet_logo.png";

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function MyNavbar(){
  return (
    <Navbar className='nav' expand="sm">
      <Container fluid>
        <div className='d-flex justify-content-between align-items-end'>
          <div>
            <Navbar.Brand href="#home">
                <img className='logo' src={logo} alt='logo' />
                <span className='name'>AdoptAPet</span>
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-navbar-toggle" />
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;