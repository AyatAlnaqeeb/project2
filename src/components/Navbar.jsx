import React, { useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Gift, UserCircle, MessageCircle, Bell, LogIn, HeartHandshake } from 'lucide-react';
import { Dropdown } from 'react-bootstrap';
import { Settings } from 'lucide-react';
import translations from '../translations';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const lang = localStorage.getItem('language') || 'en';
  const t = translations[lang];
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 0) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  return (
    <nav className="nav navbar navbar-expand-lg navbar-light bg-light shadow-sm ">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center px-3">
          <Heart className="me-2 text-primary" />
          <span className="fw-bold">Give & Gather</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`position-relative w-50 collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navl navbar-nav justify-content-end flex-grow-1 pe-3 ms-auto d-flex align-items-center gap-3">
            <li className="nav-item pe-3 py-3">
              <Link to="/donations" className="d-flex align-items-center text-decoration-none text-black-50">
                <Gift className="me-1" size={18} />
                <span>{t.donations}</span>
              </Link>
            </li>
            <li className="nav-item pe-3 py-3">
              <Link to="/add-donation" className="d-flex align-items-center text-decoration-none text-black-50">
                <HeartHandshake className="me-1" size={20} />
                <span>{t.donateNow || "Donate Now"}</span>
              </Link>
            </li>

            <li className="nav-item pe-3 py-3">
              <Link to="/chat" className="d-flex align-items-center text-decoration-none text-black-50">
                <MessageCircle className="me-1" size={18} />
                <span>{t.messages}</span>
              </Link>
            </li>

            <li className="nav-item pe-3 py-3">
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="a"
                  className="nav-link dropdown-toggle d-flex align-items-center text-black-50"
                  id="dropdownProfile"
                  role="button"
                  aria-expanded="false"
                >
                  <UserCircle className="me-1" size={18} />
                  <span>{t.profile}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-end shadow-sm border-0" aria-labelledby="dropdownProfile">
                  <Dropdown.Item as={Link} to="/profile" className="d-flex align-items-center text-primary">
                    <UserCircle className="me-2" size={16} />
                    {t.profile}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/chat" className="d-flex align-items-center text-primary">
                    <MessageCircle className="me-2" size={16} />
                    {t.messages}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings" className="d-flex align-items-center text-primary">
                    <Settings className="me-2" size={16} />
                    {t.settings}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    as="button"
                    onClick={() => {
                      localStorage.removeItem('token');
                      navigate('/auth');
                    }}
                    className="d-flex align-items-center text-danger"
                  >
                    <LogIn className="me-2" size={16} />
                    {t.signOut}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li className="pe-3 py-2">
              <Link to="/auth" className="btn btn-primary d-flex align-items-center">
                <LogIn className="me-1" size={18} />
                <span>Sign In</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
