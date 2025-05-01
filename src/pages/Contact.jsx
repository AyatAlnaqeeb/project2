
// routes/Contact.jsx
import React from 'react';
import '../index.css';

const Contact = () => {
  return (
    <div className="contact-page container py-5">
      <div className="fade-in">
        <h1 className="display-4 fw-bold text-danger mb-4">Contact Us</h1>
        <p className="lead">We’re here to listen, collaborate, and grow together. Have a question, idea, or need help? Let’s connect!</p>

        <h2 className="mt-5 text-secondary">Ways to Reach Us</h2>
        <ul className="fs-5">
          <li>Email: <a href="mailto:support@giveandgather.org">support@giveandgather.org</a></li>
          <li>Instagram: <a href="https://instagram.com/giveandgather" target="_blank" rel="noopener noreferrer">@giveandgather</a></li>
          <li>Facebook: <a href="https://facebook.com/giveandgather" target="_blank" rel="noopener noreferrer">Give & Gather on Facebook</a></li>
        </ul>

        <h2 className="mt-4 text-secondary">Or Send Us a Message</h2>
        <p className="fs-5">[Include a contact form component here]</p>
      </div>
    </div>
  );
};

export default Contact;

