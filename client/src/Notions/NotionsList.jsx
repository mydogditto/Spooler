import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notion from './Notion';

const NotionList = () => {
  const [notions, setNotions] = useState([]);

  // Function to fetch all notions from the backend
  const getAllNotionsDB = () => {
    axios.get('/api/notions')
      .then((response) => {
        setNotions(response.data); // Update the state with the fetched notions
      })
      .catch((err) => {
        console.error('Error fetching notions:', err);
      });
  };

  useEffect(() => {
    // Fetch all notions when the component mounts
    getAllNotionsDB();
  }, []);

  return (
    <div>
      <h2>Notion List</h2>
      {notions.length > 0 ? (
        <ul>
          {notions.map((notion) => (
            <li key={notion._id}>
              <Notion
                title={notion.title}
                brand={notion.brand}
                color={notion.color}
                image={notion.image}
                id={notion._id}
                getAllNotionsDB={getAllNotionsDB} // Pass down the getAllNotionsDB function
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No notions found.</p>
      )}
    </div>
  );
};

export default NotionList;