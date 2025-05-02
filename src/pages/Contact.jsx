import React, { useState } from 'react';
import '../index.css';
import emailjs from "@emailjs/browser"; // Ensure the package is installed

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      'your_service_id',  // Replace with your actual Service ID
      'your_template_id', // Replace with your actual Template ID
      formData,           // The form data to be sent
      'your_user_id'      // Replace with your actual User ID
    ).then((response) => {
      console.log('Message Sent Successfully:', response); // Log success response
      setSent(true);
      setFormData({ name: '', email: '', message: '' }); // Reset form after success
    }).catch((err) => {
      console.error('Failed to send message:', err); // Log any error that occurs
    });
  };

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
        {sent && <div className="alert alert-success">Your message has been sent!</div>}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Your name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-control"
              rows="4"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
