import React, { useEffect, useState } from 'react';
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
  // ... your 10 hardcoded donations
  {
    id: 1,
    title: "Maternity Clothes Bundle",
    category: "nursing",
    description: "Complete maternity wardrobe, sizes S-M. Includes dresses, pants, and tops suitable for all trimesters",
    location: "Amman",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80",
    timeAgo: "1 day ago"
  },
  {
    id: 2,
    title: "Baby Strollers",
    category: "nursing",
    description: "good strollers",
    location: "Zarqa",
    image: "https://images.unsplash.com/photo-1584285418616-f37ae2fb3bdb?auto=format&fit=crop&q=80",
    timeAgo: "3 days ago"
  },
  {
    id: 3,
    title: "Nursing Pillows Set",
    category: "nursing",
    description: "Two gently used nursing pillows with extra covers, perfect for comfortable feeding",
    location: "Ajloun",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80",
    timeAgo: "5 days ago"
  },
  {
    id: 4,
    title: "Children's Winter Collection",
    category: "clothes",
    description: "Warm winter clothes including jackets, sweaters, and boots for children aged 3-6 years",
    location: "Madaba",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80",
    timeAgo: "2 days ago"
  },
  {
    id: 5,
    title: "Gaming Console",
    category: "electronics",
    description: "Slightly used PlayStation 4 with two controllers and 5 games included",
    location: "Balqa",
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80",
    timeAgo: "1 day ago"
  },
  {
    id: 6,
    title: "Dining Room Set",
    category: "furniture",
    description: "Solid wood dining table with 6 chairs, excellent condition",
    location: "Irbid",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80",
    timeAgo: "3 days ago"
  },
  {
    id: 7,
    title: "Pregnancy Support Kit",
    category: "nursing",
    description: "Pregnancy pillow, belly support band, and pregnancy books in excellent condition",
    location: "Amman",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80",
    timeAgo: "6 days ago"
  },
  {
    id: 8,
    title: "Baby Essentials Bundle",
    category: "nursing",
    description: "Newborn essentials including bottles, sterilizer, and nursing covers - all gently used",
    location: "Jerash",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80",
    timeAgo: "1 week ago"
  },
  {
    id: 9,
    title: "Non-Perishable Food Items",
    category: "food",
    description: "Canned goods, pasta, and other non-perishable items for families in need",
    location: "Ma'an",
    image: "https://images.unsplash.com/photo-1488027178343-481677c929c3?auto=format&fit=crop&q=80",
    timeAgo: "12 hours ago"
  },
  {
    id: 10,
    title: "Professional Suits",
    category: "clothes",
    description: "Three gently used business suits, perfect for job interviews. Sizes 40R-42R",
    location: "Karak",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80",
    timeAgo: "4 days ago"
  }
];




const Donations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedId, setSelectedId] = useState(null);
  const [donations, setDonations] = useState([]);
  useEffect(() => {
    const localDonations = JSON.parse(localStorage.getItem('donations')) || [];
    // Combine static donations with saved ones (optional)
    const combined = [...localDonations, ...STATIC_DONATIONS]; // or just localDonations
    setDonations(combined);
  }, []);

  const filteredDonations = donations.filter(donation => {
    const matchesCategory = selectedCategory === 'all' || donation.category === selectedCategory;
    const matchesSearch = donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !location || donation.location.toLowerCase().includes(location.toLowerCase());
    return matchesCategory && matchesSearch && matchesLocation;
  });

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
                className={` btn btn-sm ${selectedCategory === category.id ? 'btn-primary text-white' : 'btn-outline-secondary'}${'bf'}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Donations Grid */}


      <div className="row g-4">
        {filteredDonations.slice(0, visibleCount).map((donations) => (
          <div key={donations.id} className="col-md-6 col-lg-4">
            <DonationCard
              donation={donations}
              onSelect={setSelectedId}
              isSelected={donations.id === selectedId}

            />

          </div>
        ))}
      </div>



      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={handleLoadMore}
            className="btn btn-primary"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Donations;
