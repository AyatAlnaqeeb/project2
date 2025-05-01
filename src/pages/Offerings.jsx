// routes/Offerings.jsx
import React from 'react';
import '../index.css';

const Offerings = () => {
  return (
    <div className="offerings-page container py-5">
      <div className="fade-in">
        <h1 className="display-4 fw-bold text-success mb-4">What We Offer</h1>
        <p className="lead">Give & Gather connects individuals who want to give, with causes and people who truly need it. Here's what you'll find on our platform:</p>

        <ul className="list-group list-group-flush mt-4">
          <li className="list-group-item bg-transparent fs-5">
            <strong>Donations:</strong> Share books, clothes, tech devices, and more — all directly with those who need them.
          </li>
          <li className="list-group-item bg-transparent fs-5">
            <strong>Community Projects:</strong> Join or start initiatives that bring positive change to neighborhoods, campuses, and beyond.
          </li>
          <li className="list-group-item bg-transparent fs-5">
            <strong>Volunteer Opportunities:</strong> Find ways to help others, from tutoring to food drives.
          </li>
          <li className="list-group-item bg-transparent fs-5">
            <strong>Safe Profiles:</strong> Every user is verified, so you can trust who you're interacting with.
          </li>
        </ul>

        <p className="mt-4 fs-5">Whether you're giving time, items, or ideas — there’s a place for you here.</p>
      </div>
    </div>
  );
};

export default Offerings;