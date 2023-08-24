import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email data to your backend forget password endpoint
      const response = await axios.post('/api/forgetpassword', formData);

      if (response.status === 200) {
        setIsEmailSent(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>PAYCRYPTO: A Fintech Application for the Currency of the Future</h1>
      <h2>Forgot Password</h2>
      <form className="forgot-password-form" onSubmit={handleEmailSubmit}>
        <input
          type="email"
          className="form-input"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        {isEmailSent && (
          <div>
            <input
              type="password"
              className="form-input"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              required
            />
            <input
              type="password"
              className="form-input"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>
        )}
        <button type="submit" className="form-button">
          {isEmailSent ? 'Reset Password' : 'Send Reset Link'}
        </button>
      </form>
      {isEmailSent && <p>Email sent successfully.</p>}
      {isError && <p>Something went wrong. Please try again.</p>}
    </div>
  );
};

export default ForgotPasswordPage;