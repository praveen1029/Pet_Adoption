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
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

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
              { hidedonations && (<Nav.Link as={Link} className='to-donations' to="/my_donations">MY&nbsp;DONATIONS</Nav.Link>)}
              { hideAdoptions && (<Nav.Link as={Link} className='to-adoptions' to="/my_adoptions">MY&nbsp;ADOPTIONS</Nav.Link>)}
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
      <div className='container-fluid'>
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
        <div className='description'>
          <div className='row'>
            <div className='col-md-5'>
              <div className='d-flex align-items-center justify-content-center image-div mt-5 p-3'>
                <div className='profile-container-back-dog'>
                  <div class="profile-container-dog"></div>
                </div>
              </div>
            </div>
            <div className='col-md-7'>
              <div className='d-flex-column align-items-center justify-content-center mt-5 p-5' >
                <div>
                  <h1 style={{color:'#075f53'}} >About Our Pet Adoption Program</h1> <br /> <br />
                </div>
                <div className='paragraph'>
                  <h5>
                    Welcome to ADOPTAPET, where our mission is to create a loving community of pet adopters and give every pet a chance to find their forever home. 
                    We understand that the bond between a pet and its owner is a special one, filled with love, joy, and companionship. Our comprehensive pet adoption 
                    program is designed to make finding your perfect furry friend a seamless and fulfilling experience.
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-7'>
              <div className='d-flex-column align-items-center justify-content-center mt-5 p-5 ' >
                <div>
                  <h1 style={{color:'#075f53'}} >Our Mission</h1> <br /> <br />
                </div>
                <div className='paragraph'>
                  <h5>
                  At ADOPTAPET, our mission is to rescue, rehabilitate, and rehome pets in need. We work tirelessly to ensure that every pet we rescue gets a second 
                  chance at a happy life. We believe that every animal deserves a loving home, and we are committed to making that a reality through our adoption 
                  services.
                  </h5>
                </div>
              </div>
            </div>
            <div className='col-md-5'>
              <div className='d-flex align-items-center justify-content-center image-div mt-5 p-3'>
                <div className='profile-container-back-cat'>
                  <div class="profile-container-cat"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-5'>
        <footer className="footer">
      <div className="container-fluid">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            We are committed to providing the best services for our customers.
            Our mission is to deliver quality and excellence in all that we do.
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p>Email: info@adoptapet.com</p>
            <p>Phone: +91 456-789-0988</p>
            <p>Address: 123 Your Street, Your City, Your State</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Adoptapet. All Rights Reserved.
      </div>
    </footer>
        </div>
      </div>
    </>
  );
};
