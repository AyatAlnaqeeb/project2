// routes/About.jsx
import React from 'react';
import '../index.css';

const About = () => {
  return (
    <div className="about-page container py-5">
      <div className="fade-in">
        <h1 className="display-4 fw-bold text-primary mb-4">About Give & Gather</h1>
        <p className="lead">Give & Gather was created by a group of university students who shared a simple belief: <strong>small actions can create big change</strong>. We noticed how much talent, generosity, and need exists within our community — and decided to build a space that brings it all together.</p>

        <h2 className="mt-5 text-secondary">Why We Built This</h2>
        <p className="fs-5">As students, we saw the disconnect between people who wanted to help and those who needed it. “Give & Gather” is our solution — a digital platform that connects givers and gatherers in meaningful, trustworthy ways.</p>

        <h2 className="mt-5 text-secondary">Our Vision</h2>
        <p className="fs-5">To build a platform where generosity, community spirit, and meaningful connections thrive — starting from our university and growing outward into the world.</p>

        <h2 className="mt-5 text-secondary">Our Impact</h2>
        <p className="fs-5">We’re more than just a website. With every donation, every volunteer, every shared story — we're proving that young people can build tools that make a real difference.</p>

        <blockquote className="blockquote mt-4 text-info">
          “Give not because you have to — but because someone is waiting to gather hope from you.”
        </blockquote>
      </div>
    </div>
  );
};

export default About;
