import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './HomePage.css'; // Import the stylesheet

const HomePage = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">PAYCRYPTO: A Fintech Application for the Currency of the Future</h1>
      <p className="home-description">Choose an option:</p>
      <div className="home-options">
        <Link to="/crypto-prices">
          <button className="home-button">View Crypto Prices</button>
        </Link>
        <Link to="/crypto-wallet">
          <button className="home-button">Crypto Wallet</button>
        </Link>
        <Link to="/transactions">
          <button className="home-button">View Transactions</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;