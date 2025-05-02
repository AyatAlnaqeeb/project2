import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Auth = lazy(() => import('./Auth'));
const Donations = lazy(() => import('./Donations'));
const AddDonation = lazy(() => import('./AddDonations'));
const Chat = lazy(() => import('./Chat'));
const Home = lazy(() => import('./Home'));
const SettingsPage = lazy(() => import('./SettingsPage'));
const Profile = lazy(() => import('./Profile'));
const About = lazy(() => import('./About'));
const Offerings = lazy(() => import('./Offerings'));
const Contact = lazy(() => import('./Contact'));

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
        <Navbar language={language} setLanguage={setLanguage} />

        <main className="flex-grow container mx-auto px-4 py-8">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/add-donation" element={<AddDonation />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/settings" element={<SettingsPage setTheme={setTheme} setLanguage={setLanguage} />} />
              <Route path="/about" element={<About />} />
              <Route path="/offerings" element={<Offerings />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
