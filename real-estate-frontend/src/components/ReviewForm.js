import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReviewForm = () => {
  const { propertyId } = useParams(); 
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    const reviewerId = localStorage.getItem('reviewer_id');

    if (!token || !reviewerId) {
      alert('Please login to submit a review');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/add-review',
        { 
          review_text: reviewText, 
          rating: rating, 
          reviewer_id: reviewerId, 
          property_id: propertyId 
        },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      console.log('Review added response:', response.data);
      navigate(`/property/${propertyId}`);
    } catch (err) {
      console.error('Failed to add review:', err);
      setError('Failed to add review: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="review-form">
      <h1>Add Review for Property {propertyId}</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          placeholder="Write your review here" 
          value={reviewText} 
          onChange={(e) => setReviewText(e.target.value)} 
        />
        <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>

        {error && <p className="error">{error}</p>}
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;