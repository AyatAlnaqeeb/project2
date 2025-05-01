import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

import herovideo from '../assets/herovideo.mp4'; // Update path as needed

const Footer = () => {
  return (
    <footer className="foot shadow-sm start-0 end-0 position-relative">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="position-absolute end-0 start-0 w-100 h-100"
        style={{ objectFit: 'cover', zIndex: -2 }}
      >
        <source src={herovideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for contrast */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: -1,
        }}
      ></div>

      {/* Main Footer Content */}
      <div className="container py-5 px-3 position-relative text-light">
        <div className="row row-cols-1 row-cols-md-3 text-center text-md-start gap-4 justify-content-between mb-4">

          {/* About */}
          <div>
            <h5 className="fw-bold text-white mb-3">About</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/offerings" className="text-decoration-none" style={{ color: '#f8f9fa' }}>
                  What We Offer
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-decoration-none" style={{ color: '#f8f9fa' }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-decoration-none" style={{ color: '#f8f9fa' }}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h5 className="fw-bold text-white mb-3">Community</h5>
            <ul className="list-unstyled">
              <li><Link to="/profile" className="text-decoration-none" style={{ color: '#f8f9fa' }}>Profile</Link></li>
              <li><Link to="/donations" className="text-decoration-none" style={{ color: '#f8f9fa' }}>Donations</Link></li>
              <li className="mt-2">
                <div className="d-flex justify-content-center justify-content-md-start gap-3">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                    <FaInstagram size={20} />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                    <FaFacebook size={20} />
                  </a>

                </div>
              </li>
            </ul>
          </div>

          {/* Spacer to leave room */}
          <div></div>

        </div>

        {/* Bottom Branding - Centered and Final */}
        <div className="d-flex flex-column align-items-center justify-content-center text-center">
          <div className="d-flex align-items-center gap-2 mb-1">
            <HeartHandshake className="text-primary" size={25} />
            <span className="text-dark fw-semibold">Together we give, together we grow</span>
            <span className="text-info">|</span>
            <span className="text-dark fw-semibold">Give & Gather © {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
