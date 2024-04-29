'use client'
import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, CardMedia, Select, MenuItem } from '@mui/material';
import { CartContext } from '../../context/CartContext';
import jwt from 'jsonwebtoken'


const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        setMenuItems(data);
        setFilteredMenuItems(data); // Initially, set filteredMenuItems to all menu items
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();

    // Check user role
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.decode(token);
      setIsAdmin(decodedToken.role === 'admin');
    }
  }, []);

  useEffect(() => {
    // Filter menu items based on selected category
    if (selectedCategory) {
      const filteredItems = menuItems.filter(item => item.category === selectedCategory);
      setFilteredMenuItems(filteredItems);
    } else {
      // If no category is selected, show all menu items
      setFilteredMenuItems(menuItems);
    }
  }, [selectedCategory, menuItems]);

  const handleAddToCart = (item) => {
    const check = cartItems.find((items) => items.name === item.name);
    if (!check) {
      addToCart({ ...item, quantity: 1 });
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        displayEmpty
        fullWidth
        sx={{ marginBottom: '1rem' }}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="Arabic">Arabic</MenuItem>
        <MenuItem value="Desi">Desi</MenuItem>
        {/* Add more categories as needed */}
      </Select>
      <Grid container spacing={2}>
        {filteredMenuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              {item.image && (
                <CardMedia
                  component="img"
                  image={item.image}
                  sx={{ height: 200, width: '100%', objectFit: 'cover' }}
                  alt={item.name}
                />
              )}
              <CardContent sx={{ flexGrow: 1, padding: '1rem' }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {item.description}
                </Typography>
                <Grid container spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Category: {item.category}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>
                      Price: <b>{item.price} Rs</b>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Available: {item.available ? 'Yes' : 'No'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>
                      Cooking Time: {item.cookingTime} minutes
                    </Typography>
                  </Grid>
                </Grid>
                
                {isAdmin && 
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ borderRadius: '5px' }}
                    onClick={() => handleAddToCart(item)}
                    >
                    Add to Cart
                  </Button>
                </Box>
                }
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Menu;
