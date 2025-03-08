import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid2, TextField, Typography, Box } from '@mui/material';
const SearchApi = ({ getAllNotionsDB }) => {
  const [keyword, setSearchKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [info, setInfo] = useState([]);  // State to store info for the post request
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleSearch = async () => {
    if (!keyword) return; // Don't make request if there's no search query

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/notions/search', {
        params: {
          query: keyword,
        },
      });

      setResults(response.data.Data);  // Store the search results
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleAttributes = async (title, image, color, brand, upc) => {
    // Add the selected item to the selectedItems state
    const selectedItem = { title, image, color, brand, upc };

    setSelectedItems((prevItems) => [...prevItems, selectedItem]);  // Update selected items state

    try {
      console.log('Sending POST request with selected item:', selectedItem); // Log the item you're sending
      const response = await axios.post('/api/notions/', {
        item: selectedItem,
      });

      // Log the response data after the POST request
      console.log('Response from POST request:', response.data);

      // Wait until the POST request is completed, then update the info state
      setInfo(response.data)



      // Once info is updated, navigate to the form page and pass the updated info
      navigate('/notion-form', {
        state: {
          title,
          image,
          color,
          brand,
          upc,
          info: response.data,
        },
      });

    } catch (error) {
      console.error('Error adding Notion:', error);
      alert('Failed to add Notion!');
    }
  };




  return (
    <Container maxWidth="md">
      {/* Centered Search Box */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <TextField
          label="Enter search term"
          variant="outlined"
          value={keyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          sx={{ width: '100%', maxWidth: 400, mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </Box>

      {/* Display Error */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Search Results */}
      <Box mt={4}>
        {results.length > 0 ? (
          <ul style={{ textAlign: 'center' }}>
            {results.map((notion) => (
              <li key={notion.item_attributes.upc} style={{ marginBottom: '20px' }}>
                <Typography variant="h6">{notion.item_attributes.title}</Typography>
                <Typography>Brand: {notion.item_attributes.brand}</Typography>
                <Typography>Color: {notion.item_attributes.color}</Typography>
                <img
                  src={notion.item_attributes.image}
                  alt={notion.item_attributes.title}
                  style={{ width: '100px', height: 'auto', marginTop: '10px' }}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 1 }}
                  onClick={() =>
                    handleAttributes(
                      notion.item_attributes.title,
                      notion.item_attributes.image,
                      notion.item_attributes.color,
                      notion.item_attributes.brand,
                      notion.item_attributes.upc
                    )
                  }
                >
                  Edit Information
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <Typography align="center">No results found.</Typography>
        )}
      </Box>
    </Container>)
};
export default SearchApi;
