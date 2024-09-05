import React from 'react';
import './Footer.css'; // Link your CSS file here
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Footer Top */}
      <div className="footer-top">
        <p>
          Welcome to SmartFix - Your one-stop solution for phone repairs, sales of smartphones, tablets, computers, and accessories. 
          Our mission is to provide quality products and services that ensure your devices are always up and running.
        </p>
      </div>

      {/* Footer Links */}
      <div className="footer-links">
        {/* About Column */}
        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li><a href="#">Who We Are</a></li>
            <li><a href="#">Sell Your Device</a></li>
            <li><a href="#">SmartFix for Businesses</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-column">
          <h4>Customer Support</h4>
          <ul>
            <li><a href="#">Become a Vendor</a></li>
            <li><a href="#">Order Status</a></li>
            <li><a href="#">Payment Options</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">Help & FAQ</a></li>
          </ul>
        </div>

        {/* Legal Info */}
        <div className="footer-column">
          <h4>Legal Information</h4>
          <ul>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookies Policy</a></li>
            <li><a href="#">Warranty Terms</a></li>
            <li><a href="#">Legal Notices</a></li>
          </ul>
        </div>

        {/* Follow Us & Certifications */}
        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="footer-social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>

          <div className="footer-certifications">
            <img src="certification.png" alt="Certified Business" />
            <img src="award.png" alt="Award Winning" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-contact-info">
          <p>
            <FaMapMarkerAlt /> 123 SmartFix Street, New York, NY 10001
          </p>
          <p>
            <FaPhone /> +1 234 567 890
          </p>
          <p>
            <FaEnvelope /> support@smartfix.com
          </p>
        </div>

        <p>© 2024 SmartFix</p>

        {/* Mobile Apps */}
        <div className="footer-app-links">
          <img src="google-play.png" alt="Google Play" />
          <img src="app-store.png" alt="App Store" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
