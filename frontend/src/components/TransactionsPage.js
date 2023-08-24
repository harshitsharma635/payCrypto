// TransactionsPage.js

import React, { useState } from 'react';
import './TransactionsPage.css'; // Import the stylesheet

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = (type, amount) => {
    const newTransaction = {
      type,
      amount,
      timestamp: new Date().toLocaleString(),
    };
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
  };

  return (
    <div className="transactions-container">
      <h4 className="transactions-heading">Transactions</h4>
      <button
        className="add-transaction-button"
        onClick={() => handleAddTransaction('Deposit', 10)}
      >
        Add Deposit
      </button>
      <button
        className="add-transaction-button"
        onClick={() => handleAddTransaction('Withdrawal', -5)}
      >
        Add Withdrawal
      </button>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.type}: {transaction.amount}, {transaction.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsPage;