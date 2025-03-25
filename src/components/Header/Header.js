import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import logoImage from "../../Assets/logo.png";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <Navbar expand="lg" bg="white" className={`shadow-sm sticky-top ${styles.header}`}>
      <Container style={{ maxWidth: "1300px" }}>
        <Navbar.Brand as={Link} to="/" className={styles.navbarBrand}>
          <img src={logoImage} alt="Logo" className={styles.logoImage} />
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          <Navbar.Toggle aria-controls="navbar-nav" />
          <div className="ms-3 d-lg-none">
            <Link to="/signin">
              <Button className={styles.buttonPrimary}>SIGN IN</Button>
            </Link>
          </div>
        </div>
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="fw-bold bg-white p-2">
            <Nav.Link as={Link} to="/" className="text-dark fw-medium">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/AboutUs" className="text-dark fw-medium">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/ContactUs" className="text-dark fw-medium">
              Contact Us
            </Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/services">
                Services
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/team">
                Our Team
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/blog">
                Blog
              </NavDropdown.Item>
            </NavDropdown>
            <div className="ms-3 d-none d-lg-block">
              <Link to="/signin">
                <Button className={styles.buttonPrimary}>SIGN IN</Button>
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
