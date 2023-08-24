import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginSignupPage from './components/LoginSignupPage';
import CryptoPricePage from './components/CryptoPricePage';
import CryptoWalletPage from './components/CryptoWalletPage';
import TransactionsPage from './components/TransactionsPage';
import ForgotPasswordPage from './components/ForgotPasswordPage'; 
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signupData, setSignupData] = useState({}); 

  return (
    <Router>
      <div>
        <Routes>
          {/* Set the default route to LoginSignupPage */}
          <Route path="/" element={<LoginSignupPage setIsLoggedIn={setIsLoggedIn} setSignupData={setSignupData} signupData={signupData} />} />
          <Route path="/home" element={<HomePage />} /> {/* Change to /home or the desired home route */}
          <Route path="/login" element={<LoginSignupPage setIsLoggedIn={setIsLoggedIn} setSignupData={setSignupData} signupData={signupData} />} />
          <Route path="/crypto-prices" element={isLoggedIn ? <CryptoPricePage /> : <Navigate to="/login" />} />
          <Route path="/crypto-wallet" element={isLoggedIn ? <CryptoWalletPage /> : <Navigate to="/login" />} />
          <Route path="/transactions" element={isLoggedIn ? <TransactionsPage /> : <Navigate to="/login" />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage signupData={signupData} setSignupData={setSignupData} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;