import React from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Welcome to Gamyam
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Your comprehensive product management solution
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h1" sx={{ mb: 2 }}>📦</Typography>
              <Typography variant="h5" gutterBottom>
                Product Management
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Manage your entire product catalog with advanced filtering, search, and categorization.
              </Typography>
              <Button 
                component={Link} 
                to="/products" 
                variant="contained" 
                size="large"
              >
                View Products
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h1" sx={{ mb: 2 }}>📊</Typography>
              <Typography variant="h5" gutterBottom>
                Analytics & Insights
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Get detailed insights about your product performance and inventory status.
              </Typography>
              <Button 
                variant="outlined" 
                size="large"
                disabled
              >
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h1" sx={{ mb: 2 }}>⚙️</Typography>
              <Typography variant="h5" gutterBottom>
                Settings & Config
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Customize your experience and configure system preferences.
              </Typography>
              <Button 
                variant="outlined" 
                size="large"
                disabled
              >
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', p: 4, backgroundColor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Ready to get started?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Explore our comprehensive product management features and take control of your inventory.
        </Typography>
        <Button 
          component={Link} 
          to="/products" 
          variant="contained" 
          size="large"
          sx={{ mr: 2 }}
        >
          Browse Products
        </Button>
        <Button 
          component={Link} 
          to="/about" 
          variant="outlined" 
          size="large"
        >
          Learn More
        </Button>
      </Box>
    </Container>
  );
};
