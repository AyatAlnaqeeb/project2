import React from 'react'; 
import { Heart } from 'lucide-react';
import herovideo from '../assets/herovideo.mp4'

const Footer = () => {
  return (
    <footer className="foot shadow-sm  start-0 end-0">
      <video
            autoPlay
            loop
            muted
            playsInline
            className="position-absolute end-0 top-0 start-0 w-100 h-100"
            style={{ objectFit: 'cover', zIndex: -1 }}
          >
            <source src={herovideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
      <div className="container-fluid py-4 px-3 position-relative">
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Heart className="text-primary" size={20} />
          <span className="text-secondary">Give & Gather © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
