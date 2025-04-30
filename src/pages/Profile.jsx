// File: src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Calendar,
  Pencil,
  MessageSquare,
  Camera,
  Sun,
  Moon,
  Activity,
  BookOpen,
  Bookmark,
  Info,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const QUOTES = [
  "Kindness is a language the deaf can hear and the blind can see.",
  "No one has ever become poor by giving.",
  "The smallest act of kindness is worth more than the grandest intention.",
  "Happiness doesn’t result from what we get, but from what we give."
];

const Profile= () => {
  const [isEditing, setIsEditing] = useState(false);
  const [theme, setTheme] = useState(() => {
    return (
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    );
  });
  const [activeTab, setActiveTab] = useState('about');
  const [mood, setMood] = useState('😊');
  const [quote, setQuote] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);

  const [profile, setProfile] = useState({
    name: 'Ayat',
    location: 'Amman, Jordan',
    email: 'ayat.@example.com',
    phone: '+962798275067',
    joinDate: 'March 2024',
    description: 'Helping others is my passion. I believe in building strong communities through small acts of kindness.',
    profileImage: 'https://photozil.com/wp-content/uploads/2024/03/%D8%B5%D9%88%D8%B1-%D8%B1%D9%85%D8%B2%D9%8A%D8%A9-%D8%A7%D8%B7%D9%81%D8%A7%D9%84-2024-3.jpg',
    linkedin: 'https://linkedin.com/in/ayat-profile',
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  const [savedItems, setSavedItems] = useState([
    { title: 'Warm Jackets', image: 'https://images-na.ssl-images-amazon.com/images/I/51BpJEZdz0L._SL500_._AC_SL500_.jpg', date: 'Saved 2 days ago' },
    { title: 'Books', image: 'https://www.4readlib.com/uploads/images/1624556497.png', date: 'Saved 5 days ago' },
  ]);

  const donations = [
    { title: 'Clothes', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi87Va-V0zb_l5PoV4qBt_9C5T7tEG4BHIpQ&s', status: 'Active', date: '3 days ago' },
    { title: 'Electronics', image: 'https://t4.ftcdn.net/jpg/03/64/41/07/240_F_364410756_Ev3WoDfNyxO9c9n4tYIsU5YBQWAP3UF8.jpg', status: 'Completed', date: '1 week ago' },
  ];

  const activityLog = [
    { icon: <Bookmark size={16} />, text: 'Saved Warm Jackets', date: '2 days ago' },
    { icon: <BookOpen size={16} />, text: 'Donated Electronics', date: '1 week ago' },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('profile');
    if (stored) {
      const parsed = JSON.parse(stored);
      setProfile(parsed);
      setEditedProfile(parsed);
    }
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedProfile({ ...editedProfile, profileImage: imageUrl });
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverPhoto(imageUrl);
    }
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleMessageClick = () => {
    navigate('/chat');
  };

  const handleRemoveSavedItem = (indexToRemove) => {
    setSavedItems(savedItems.filter((_, index) => index !== indexToRemove));
  };

  const completedFields = Object.values(profile).filter(Boolean).length;
  const profileCompletion = Math.min(100, Math.floor((completedFields / 7) * 100));

  return (
    <div className="container py-4 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-3 sticky-header ">
        <div className="d-flex align-items-center gap-3">
          <span className="fs-4">{mood}</span>
          <select value={mood} onChange={(e) => setMood(e.target.value)} className="form-select w-auto">
            <option value="😊">😊</option>
            <option value="😎">😎</option>
            <option value="😇">😇</option>
            <option value="💪">💪</option>
            <option value="🌟">🌟</option>
          </select>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? <Moon size={16} className="me-1" /> : <Sun size={16} className="me-1" />}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>

      <div className="text-center mb-4 ">
        <p className="fst-italic fs-3 fw-semibold text-primary text-center">“{quote}”</p>
      </div>


      <div className="card glass-card shadow-sm mb-4 vh-100">
      <div className="cover-photo-wrapper position-relative mb-5" style={{ margin: 0 }}>
  {/* Cover Photo */}
  <div
    className="cover-photo rounded"
    style={{
      height: '200px',
      backgroundImage: `url(${coverPhoto || 'https://via.placeholder.com/800x200'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      margin: 0,
      padding: 0,
      borderTopLeftRadius: '0px',
      borderTopRightRadius: '0px',
    }}
  ></div>

  {/* Change Cover Button */}
  {isEditing && (
    <label
      className="position-absolute start-0 top-0 end-0  btn btn-light btn-sm shadow"
      style={{ cursor: 'pointer' }}
    >
      Change Cover
      <input
        type="file"
        accept="image/*"
        onChange={handleCoverPhotoChange}
        style={{ display: 'none' }}
      />
    </label>
  )}

  {/* Profile Photo (overlapping the bottom of cover) */}
  <div
  className="position-absolute start-0 translate-middle-y"
  style={{
    left: '3rem', // optional spacing from the left edge
    bottom: '-50px',
    zIndex: 2,
  }}
>

    <img
      src={editedProfile.profileImage}
      alt="Profile"
      className="rounded-circle border border-3 border-white shadow"
      width={100}
      height={100}
      style={{ objectFit: 'cover' }}
    />
  </div>
</div>

{/* Card Body with top padding to make room for the overlapping profile image */}
        <div className="card-body">
        <div className="d-flex align-items-center mb-4">
  <div className="me-4" style={{ width: '100px', height: '100px' }}></div> {/* spacer */}

            <div className="flex-grow-1">
              <h2 className="fw-bold mb-0">{profile.name}</h2>
              <div className="d-flex gap-2 mt-2">
                <button className="btn btn-outline-primary" onClick={handleMessageClick}>
                  <MessageSquare size={16} className="me-1" /> Message
                </button>
                <button
                  className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                  <Pencil size={16} className="me-1" /> {isEditing ? 'Save' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="progress" style={{ height: '10px' }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: `${profileCompletion}%` }}
                aria-valuenow={profileCompletion}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <small className="text-muted">Profile Completion: {profileCompletion}%</small>
          </div>

          {/* Tabs and content sections */}
<ul className="nav nav-pills mb-3">
  <li className="nav-item">
    <button className={`nav-link ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}><Info size={16} className="me-1" /> About</button>
  </li>
  <li className="nav-item">
    <button className={`nav-link ${activeTab === 'donations' ? 'active' : ''}`} onClick={() => setActiveTab('donations')}><BookOpen size={16} className="me-1" /> Donations</button>
  </li>
  <li className="nav-item">
    <button className={`nav-link ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}><Bookmark size={16} className="me-1" /> Saved</button>
  </li>
  <li className="nav-item">
    <button className={`nav-link ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}><Activity size={16} className="me-1" /> Activity</button>
  </li>
</ul>

{activeTab === 'about' && (
  <div>
    <p className="animated-text">{profile.description}</p>
    <p><MapPin size={16} className="me-2 text-primary" />{profile.location}</p>
    <p><Mail size={16} className="me-2 text-primary" />{profile.email}</p>
    <p><Phone size={16} className="me-2 text-primary" />{profile.phone}</p>
    <p><Calendar size={16} className="me-2 text-primary" />Joined {profile.joinDate}</p>
    <p><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-decoration-none">LinkedIn</a></p>
  </div>
)}

{activeTab === 'donations' && (
  <div className="d-flex flex-column gap-3">
    {donations.map((donation, index) => (
      <div key={index} className={`d-flex align-items-center border rounded p-2 shadow-sm hover-zoom ${donation.status === 'Completed' ? 'donation-completed' : 'bg-white'}`}>
        <img src={donation.image} alt={donation.title} width={80} height={80} className="rounded me-3" style={{ objectFit: 'cover' }} />
        <div className="flex-grow-1">
          <h6 className="mb-1 fw-semibold">{donation.title}</h6>
          <small className="text-muted">{donation.date}</small>
        </div>
        <span className={`badge ${donation.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>{donation.status}</span>
      </div>
    ))}
  </div>
)}

{activeTab === 'saved' && (
  <div className="d-flex flex-column gap-3">
    {savedItems.map((item, index) => (
      <div key={index} className="d-flex align-items-center border rounded p-2 bg-white shadow-sm hover-zoom">
        <img src={item.image} alt={item.title} width={80} height={80} className="rounded me-3" style={{ objectFit: 'cover' }} />
        <div className="flex-grow-1">
          <h6 className="mb-1 fw-semibold">{item.title}</h6>
          <small className="text-muted">{item.date}</small>
        </div>
        <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveSavedItem(index)}>Remove</button>
      </div>
    ))}
  </div>
)}

{activeTab === 'activity' && (
  <ul className="list-group">
    {activityLog.map((activity, index) => (
      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          {activity.icon}
          {activity.text}
        </div>
        <small className="text-muted">{activity.date}</small>
      </li>
    ))}
  </ul>
)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
