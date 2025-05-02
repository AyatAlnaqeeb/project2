import React, { useState, useEffect, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddDonation = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      // Clean up object URLs on component unmount or when images change
      images.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [images]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !description || !location || images.length === 0) return;

    const newDonation = {
      id: Date.now(),
      title,
      category,
      description,
      location,
      image: images[0].preview, // Use first image
      timeAgo: 'Just now',
    };

    // Save donation to localStorage
    const existing = JSON.parse(localStorage.getItem('donations')) || [];
    localStorage.setItem('donations', JSON.stringify([newDonation, ...existing]));

    // Navigate to donations page
    navigate('/donations');

    // Reset form
    setTitle('');
    setCategory('');
    setDescription('');
    setLocation('');
    setImages([]);
    document.getElementById('fileInput').value = null;
  };

  const handleFileChange = useCallback((e) => {
    const filesWithPreview = Array.from(e.target.files).map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...filesWithPreview]);
  }, []);

  const handleDeleteImage = useCallback((index) => {
    const imageToDelete = images[index];
    URL.revokeObjectURL(imageToDelete.preview); // Clean up URL
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }, [images]);

  const categoryOptions = ["clothes", "electronics", "furniture", "food", "other"];
  const locationOptions = ["amman", "irbid", "zarqa", "aqaba", "ajloun", "jerash", "mafraq", "balqa", "karak", "tafilah", "ma'an", "madaba"];

  return (
    <>
      <div className="d-flex justify-content-center align-items-center py-5" style={{ background: '#6DE1D2' }}>
        <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="card-body">
            <h2 className="card-title mb-4 text-center">Add New Donation</h2>
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                  placeholder="What are you donating?"
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  rows={3}
                  placeholder="Describe your donation..."
                  required
                />
              </div>

              {/* Location */}
              <div className="mb-3">
                <label className="form-label">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select a location</option>
                  {locationOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                  ))}
                </select>
              </div>

              {/* Images */}
              <div className="mb-4">
                <label className="form-label">Images</label>
                <div
                  className="border border-2 rounded p-4 text-center bg-light position-relative cursor-pointer"
                  style={{ borderStyle: 'dashed' }}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <Upload className="text-secondary mb-2" />
                  <p className="text-muted mb-1">Click or drag files to upload</p>
                  <small className="text-muted">Accepted: JPG, PNG</small>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="d-none"
                    required
                  />
                </div>
                {images.length > 0 && (
                  <ul className="mt-2 list-group">
                    {images.map((file, idx) => (
                      <li
                        key={idx}
                        className="list-group-item d-flex justify-content-between align-items-center py-1 px-2"
                      >
                        {file.name}
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(idx);
                          }}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Post Donation
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDonation;
