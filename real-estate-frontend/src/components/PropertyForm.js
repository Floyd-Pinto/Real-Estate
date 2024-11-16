import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PropertyForm = () => {
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [age, setAge] = useState('');
  const [furnishedStatus, setFurnishedStatus] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('Please login to add a property');
      return;
    }

    try {

      const propertyResponse = await axios.post('http://localhost:5000/api/add-property', 
        { 
          address, 
          price: parseInt(price),
          age: parseInt(age),
          furnished_status: furnishedStatus,
        },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      console.log('Property added response:', propertyResponse.data);

      if (propertyResponse.data && propertyResponse.data.propertyId) {
        const propertyId = propertyResponse.data.propertyId;

        navigate(`/property-review/${propertyId}`);
      } else {
        alert('Error: Property ID not received.');
      }

      setAddress('');
      setPrice('');
      setAge('');
      setFurnishedStatus('');
    } catch (err) {
      console.error('Failed to add property:', err);
      setError('Failed to add property: ' + err.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <div className="property-form">
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Age" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
        />
        <select value={furnishedStatus} onChange={(e) => setFurnishedStatus(e.target.value)}>
          <option value="">Select Furnished Status</option>
          <option value="furnished">Furnished</option>
          <option value="unfurnished">Unfurnished</option>
          <option value="partially_furnished">Partially Furnished</option>
        </select>

        {error && <p className="error">{error}</p>}
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default PropertyForm;