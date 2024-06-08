import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="footer-links mb-4">
          <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms-of-service" className="footer-link">Terms of Service</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
          <Link to="/about" className="footer-link">About</Link>
        </div>
        <p>&copy; 2024 Courverse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
