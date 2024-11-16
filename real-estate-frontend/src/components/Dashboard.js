import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Stack } from '@mui/material';

const Dashboard = ({ logout }) => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Welcome to your Dashboard
      </Typography>
      <Typography variant="body1" paragraph>
        Here you can manage your properties.
      </Typography>
      <Stack spacing={2}>
        <Button
          variant="outlined"
          sx={{ borderColor: 'yellow', color: 'yellow' }} 
          component={Link}
          to="/property-form"
        >
          Add Property
        </Button>
        <Button
          variant="outlined"
          sx={{ borderColor: 'aqua', color: 'aqua ' }} 
          component={Link}
          to="/property-list"
        >
          View Properties
        </Button>
      </Stack>
      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={logout}
        sx={{ marginTop: 2 }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
