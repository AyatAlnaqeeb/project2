import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import DonationCard from '../components/DonationCard';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'nursing', label: 'Nursing & Pregnancy' },
  { id: 'clothes', label: 'Clothes' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'furniture', label: 'Furniture' },
  { id: 'food', label: 'Food' },
  { id: 'other', label: 'Other' }
];

const STATIC_DONATIONS = [
  // ... (unchanged hardcoded donations)
  {
    id: 1,
    title: "Maternity Clothes Bundle",
    category: "nursing",
    description: "Complete maternity wardrobe, sizes S-M. Includes dresses, pants, and tops suitable for all trimesters",
    location: "Amman",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80",
    timeAgo: "1 day ago"
  },
  // ... (remaining static donations)
];

const Donations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const selectedId = useRef(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const localDonations = JSON.parse(localStorage.getItem('donations')) || [];
    setDonations([...localDonations, ...STATIC_DONATIONS]);
  }, []);

  const filteredDonations = useMemo(() => {
    return donations.filter(donation => {
      const matchesCategory = selectedCategory === 'all' || donation.category === selectedCategory;
      const matchesSearch = donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = !location || donation.location.toLowerCase().includes(location.toLowerCase());
      return matchesCategory && matchesSearch && matchesLocation;
    });
  }, [donations, selectedCategory, searchQuery, location]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const hasMore = visibleCount < filteredDonations.length;

  return (
    <div className="container-fluid py-4">
      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded shadow-sm mb-5">
        <div className="row g-3">
          <div className="col-md-6 position-relative p-2">
            <Search className="position-absolute top-50 translate-middle-y ms-2 text-muted" size={16} />
            <input
              type="text"
              placeholder="Search donations..."
              className="form-control ps-5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-6 position-relative p-2">
            <MapPin className="position-absolute top-50 translate-middle-y ms-2 text-muted" size={16} />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-select ps-5"
            >
              <option value="">Select a location</option>
              <option value="amman">Amman</option>
              <option value="irbid">Irbid</option>
              <option value="zarqa">Zarqa</option>
              <option value="aqaba">Aqaba</option>
              <option value="ajloun">Ajloun</option>
              <option value="jerash">Jerash</option>
              <option value="mafraq">Mafraq</option>
              <option value="balqa">Balqa</option>
              <option value="karak">Karak</option>
              <option value="tafilah">Tafilah</option>
              <option value="ma'an">Ma'an</option>
              <option value="madaba">Madaba</option>
            </select>
          </div>
          <div className="col-12 d-flex align-items-center flex-wrap gap-2 mt-2">
            <Filter className="text-muted" size={20} />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setVisibleCount(6);
                }}
                className={`btn btn-sm ${selectedCategory === category.id ? 'btn-primary text-white' : 'btn-outline-secondary'}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Donations Grid */}
      <div className="row g-4">
        {filteredDonations.slice(0, visibleCount).map((donation) => (
          <div key={donation.id} className="col-md-6 col-lg-4">
            <DonationCard
              donation={donation}
              onSelect={(id) => { selectedId.current = id; }}
              isSelected={donation.id === selectedId.current}
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-4">
          <button onClick={handleLoadMore} className="btn btn-primary">Load More</button>
        </div>
      )}
    </div>
  );
};

export default Donations;
