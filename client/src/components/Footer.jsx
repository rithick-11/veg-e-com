import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Container } from "./UI";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-4 mt-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Excel Store</h3>
            <p className="text-gray-400">
              Bringing you the freshest vegetables and fruits right to your
              doorstep. Quality and customer satisfaction are our top
              priorities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-green-400 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-green-400 transition-colors">Products</Link></li>
              <li><Link to="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-bold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/returns-policy" className="hover:text-green-400 transition-colors">Returns Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-green-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-4">
              123 Veggie Lane, Farmville, FS 54321
              <br />
              Email: support@excelstore.com
              <br />
              Phone: (123) 456-7890
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors"><FaFacebook size={24} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors"><FaTwitter size={24} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors"><FaInstagram size={24} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center text-gray-500">
          <p>&copy; 2024 Veg E-Commerce. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;