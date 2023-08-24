// CryptoPricePage.js

import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, Container } from '@mui/material';
import axios from 'axios';
import './CryptoPricePage.css'; // Import the stylesheet

const CryptoPricePage = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    // Fetch crypto data from an API
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: 'bitcoin,ethereum,ripple',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      })
      .then((response) => {
        setCryptoData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching crypto data:', error);
      });
  }, []);

  return (
    <div className="crypto-price-container">
      <Typography variant="h4" align="center" gutterBottom>
        Crypto Prices
      </Typography>
      <List className="crypto-price-list">
        {cryptoData.map((crypto, index) => (
          <ListItem key={index} className="crypto-price-item">
            <Typography variant="body1">
              {crypto.name}: ${crypto.current_price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CryptoPricePage;