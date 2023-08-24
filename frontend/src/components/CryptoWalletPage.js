// CryptoWalletPage.js

import React, { useState } from 'react';
import './CryptoWalletPage.css'; // Import the stylesheet

const CryptoWalletPage = () => {
  const [cryptoBalance, setCryptoBalance] = useState(0);

  const handleDeposit = amount => {
    setCryptoBalance(prevBalance => prevBalance + parseFloat(amount));
  };

  const handleWithdraw = amount => {
    setCryptoBalance(prevBalance => prevBalance - parseFloat(amount));
  };

  return (
    <div className="crypto-wallet-container">
      <div className="balance-display">Balance: {cryptoBalance.toFixed(2)} BTC</div>
      <form className="deposit-withdraw-form">
        <input
          type="number"
          className="form-input"
          placeholder="Deposit Amount (BTC)"
          onChange={e => handleDeposit(e.target.value)}
        />
        <input
          type="number"
          className="form-input"
          placeholder="Withdraw Amount (BTC)"
          onChange={e => handleWithdraw(e.target.value)}
        />
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CryptoWalletPage;