import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import logoImage from "../../Assets/logo.png";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <Navbar expand="lg" bg="white" className={`shadow-sm sticky-top  ${styles.header}`}>
    <Container>
      <Navbar.Brand as={Link} to="/" className={styles.navbarBrand}>
        <img src={logoImage} alt="Logo" className={styles.logoImage} />
      </Navbar.Brand>
  
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" className="text-dark fw-medium">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/AboutUs" className="text-dark fw-medium">
            About Us
          </Nav.Link>
          <Nav.Link as={Link} to="/ContactUs" className="text-dark fw-medium">
            Contact Us
          </Nav.Link>
        </Nav>
        <div className="ms-3">
          <Link to="/signin">
            <Button className={styles.buttonPrimary}>SIGN IN</Button>
          </Link>
          <Link to="/signup" className="ms-2">
            <Button className={styles.buttonPrimary}>Sign Up</Button>
          </Link>
        </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
  );
};

export default Header;
