import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../components/landing.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../images/pet_logo.png";
import banner from "../images/main-banner.jpg";
import Lottie from 'lottie-react';
import dog from '../animations/dog.json';
import cat from '../animations/cat.json';
import fish from '../animations/fish.json';

export const MyNavbar = ({ hideHome, hideLogin, hidepets, hideAdoptions, hideProfile, hidedonateform, hidedonations }) => {
  return(
    <>
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
              { !hideHome && (<Nav.Link as={Link} className='to-home' to="/home">HOME</Nav.Link>)}
              { !hideLogin && (<Nav.Link as={Link} className='to-login' to="/login-register">LOGIN</Nav.Link>)}
              { hidepets && (<Nav.Link as={Link} className='to-pet-list' to="/pet_list">PETS</Nav.Link>)}
              { hidedonateform && (<Nav.Link as={Link} className='to-pet-donate' to="/pet_form">DONATE</Nav.Link>)}
              { hidedonations && (<Nav.Link as={Link} className='to-donations' to="/login-register">MY&nbsp;DONATIONS</Nav.Link>)}
              { hideAdoptions && (<Nav.Link as={Link} className='to-login' to="/login-register">MY&nbsp;ADOPTIONS</Nav.Link>)}
              { hideProfile && (<Nav.Link as={Link} className='to-profile' to="/user_page">PROFILE</Nav.Link>)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <MyNavbar />
      <div className={`banner-div ${isScrolled ? 'scrolled' : ''}`}>
        <img className='banner' src={banner} alt='banner' />
      </div>
      <div className={`welcome-message ${isScrolled ? 'hidden' : ''}`}>
        <div className='cat-animation-div'>
          <Lottie id='cat' animationData={cat} />
        </div>
        <span className='head'>AdoptAPet</span><br />
        Adopt, Love, Save a Life
        <div className='fish-animation-div'>
          <Lottie id='fish' animationData={fish}/>
        </div>
        <div className='dog-animation-div'>
          <Lottie id='dog' animationData={dog}/>
        </div>
      </div>

      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
    </>
  );
};
