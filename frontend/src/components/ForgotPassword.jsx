import React, { useState } from 'react';
import { forgotPassword } from '../authService';
import './ForgotPassword.css'
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            setMessage('Password reset email sent. Please check your inbox.');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error sending password reset email. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="forgot-password">
          <h1 className="forgot-password__title">Forgot Password</h1>
          <form className="forgot-password__form" onSubmit={handleSubmit}>
            <div className="forgot-password__field">
              <label className="forgot-password__label">Email:</label>
              <input
                className="forgot-password__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="forgot-password__button" type="submit">Send Password Reset Email</button>
          </form>
          {message && <p className="forgot-password__message">{message}</p>}
          {errorMessage && <p className="forgot-password__error">{errorMessage}</p>}
        </div>
      );
      
};

export default ForgotPassword;
