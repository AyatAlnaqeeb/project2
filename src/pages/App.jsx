import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './Auth';
import Donations from './Donations';
import AddDonation from './AddDonations';
import Chat from './Chat';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from './Home';
import SettingsPage from './SettingsPage';
import Profile from './Profile';
import About from './About';
import Offerings from './Offerings';
import Contact from './Contact';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Pass theme and language to Navbar if needed */}
        <Navbar language={language} setLanguage={setLanguage} />

        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/add-donation" element={<AddDonation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<SettingsPage setTheme={setTheme} setLanguage={setLanguage} />} />
            <Route path="/about" element={<About/>} />
            <Route path="/offerings" element={<Offerings/>} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App; 
