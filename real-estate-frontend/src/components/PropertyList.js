import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPropertiesAndReviews();
  }, []);

  const fetchPropertiesAndReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const propertyResponse = await fetch('http://localhost:5000/api/properties');
      if (!propertyResponse.ok) throw new Error(`Error fetching properties: ${propertyResponse.statusText}`);
      const propertyData = await propertyResponse.json();
      setProperties(propertyData);
      const reviewResponse = await fetch('http://localhost:5000/api/reviews');
      if (!reviewResponse.ok) throw new Error(`Error fetching reviews: ${reviewResponse.statusText}`);
      const reviewData = await reviewResponse.json();
      const reviewsByProperty = reviewData.reduce((acc, review) => {
        if (!acc[review.property_id]) {
          acc[review.property_id] = [];
        }
        acc[review.property_id].push(review);
        return acc;
      }, {});

      setReviews(reviewsByProperty);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 4, color: 'white' }}>
        Property Listings
      </Typography>
      <Grid container spacing={4}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.property_id}>
            <Card sx={{
              backgroundColor: '#1e1e1e',
              borderRadius: 2,
              boxShadow: 3,
              height: 'auto',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6,
              },
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'white', marginBottom: 1 }}>
                  {property.address}
                </Typography>
                <Typography sx={{ color: 'gray', marginBottom: 2 }}>
                  Price: ${property.price.toLocaleString()}
                </Typography>
                <Typography sx={{ color: 'lightgray', marginBottom: 3 }}>
                  Age: {property.age} years
                </Typography>

                {}
                <Typography variant="h6" sx={{ color: 'white', marginBottom: 2 }}>
                  Reviews:
                </Typography>
                {reviews[property.property_id] && reviews[property.property_id].length > 0 ? (
                  reviews[property.property_id].map((review) => (
                    <Card key={review.review_id} sx={{ backgroundColor: '#333', marginBottom: 2, padding: 2, borderRadius: 2 }}>
                      <Typography variant="body2" sx={{ color: 'lightgray' }}>
                        <strong>Rating:</strong> {review.rating} / 5
                      </Typography>
                      <Typography sx={{ color: 'white', marginTop: 1 }}>
                        {review.text_review}
                      </Typography>
                    </Card>
                  ))
                ) : (
                  <Typography sx={{ color: 'gray' }}>
                    No reviews available for this property.
                  </Typography>
                )}

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PropertyList;