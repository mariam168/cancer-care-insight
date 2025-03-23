import React from "react";
import logo from "../Assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <div className="container d-flex justify-content-between align-items-center">
        <img src={logo} alt="logo" className="footer-logo" />
        <p className="mb-0">© 2024 Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
