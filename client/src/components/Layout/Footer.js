import React from 'react';
import './Footer.css'; // Ensure this file contains the updated CSS
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='footer bg-dark text-light p-6'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          
          {/* Contact Information */}
          <div className='contact-info space-y-4'>
            <h4 className='text-lg font-semibold'>Contact Us</h4>
            <p><FaMapMarkerAlt className='inline-block mr-2' /> 123 Main Street, Anytown, USA</p>
            <p><FaPhone className='inline-block mr-2' /> Phone: (123) 456-7890</p>
            <p><FaEnvelope className='inline-block mr-2' /> Email: contact@yourcompany.com</p>
          </div>
          
          {/* Navigation Links */}
          <div className='navigation space-y-4'>
            <h4 className='text-lg font-semibold'>Navigation</h4>
            <ul className='space-y-2'>
              <li><a href='/about' className='hover:underline'>About Us</a></li>
              <li><a href='/services' className='hover:underline'>Services</a></li>
              <li><a href='/blog' className='hover:underline'>Blog</a></li>
              <li><a href='/faq' className='hover:underline'>FAQs</a></li>
              <li><a href='/careers' className='hover:underline'>Careers</a></li>
            </ul>
          </div>
          
          {/* Social Media Links */}
          <div className='social-media space-y-4'>
            <h4 className='text-lg font-semibold'>Follow Us</h4>
            <div className='flex space-x-4'>
              <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='social-icon'><FaFacebookF /></a>
              <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='social-icon'><FaTwitter /></a>
              <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='social-icon'><FaInstagram /></a>
              <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className='social-icon'><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className='map-section mt-6'>
          <h4 className='text-lg font-semibold mb-4'>Find Us On The Map</h4>
          <div className='map-container'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12689.391748836286!2d-122.0822037!3d37.4198586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5e7ebeb9e4b%3A0x12f1620046478e2!2sGoogleplex!5e0!3m2!1sen!2sus!4v1624369289681!5m2!1sen!2sus'
              width='100%'
              height='200'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              title='Google Map'
            ></iframe>
          </div>
        </div>
        
        <div className='footer-bottom text-center mt-6'>
          <p className='text-sm'>© 2024 YourCompany. All rights reserved.</p>
          <a href='/privacy-policy' className='text-sm hover:underline'>Privacy Policy</a> | 
          <a href='/terms-of-service' className='text-sm hover:underline'> Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
