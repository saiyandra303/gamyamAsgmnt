import React from 'react';
import { Container, Typography, Box, Card, CardContent, Chip, Grid } from '@mui/material';

export const AboutPage: React.FC = () => {
  const features = [
    'Product Management',
    'Advanced Search',
    'Category Filtering',
    'Status Tracking',
    'Tag System',
    'Responsive Design',
    'Real-time Updates',
    'Form Validation'
  ];

  const technologies = [
    'React 19',
    'TypeScript',
    'Material-UI',
    'Vite',
    'React Router',
    'Emotion'
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          About Gamyam
        </Typography>
        <Typography variant="h5" color="text.secondary">
          A modern product management solution built with React
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                🚀 Features
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Gamyam provides a comprehensive set of features for managing your product catalog efficiently.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {features.map((feature) => (
                  <Chip 
                    key={feature} 
                    label={feature} 
                    color="primary" 
                    variant="outlined" 
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                ⚡ Technology Stack
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Built with modern web technologies for optimal performance and developer experience.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {technologies.map((tech) => (
                  <Chip 
                    key={tech} 
                    label={tech} 
                    color="secondary" 
                    variant="outlined" 
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                📋 Product Categories
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Manage products across multiple categories with dedicated filtering and organization.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4} md={2}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="h4">📱</Typography>
                    <Typography variant="body2">Electronics</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="h4">🪑</Typography>
                    <Typography variant="body2">Furniture</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="h4">⚽</Typography>
                    <Typography variant="body2">Sports</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="h4">🍳</Typography>
                    <Typography variant="body2">Kitchen</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="h4">👕</Typography>
                    <Typography variant="body2">Fashion</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="h4">🏠</Typography>
                    <Typography variant="body2">Home</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
