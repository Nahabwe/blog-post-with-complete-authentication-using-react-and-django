import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPasswordConfirm.css';

const ResetPasswordConfirm = () => {
    const { uid, token } = useParams(); 
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/user/reset-password/', {
                uid,
                token,
                new_password1: newPassword,
                new_password2: confirmPassword
            });
    
            if (response.status === 200) {
                navigate('/login');
            } else {
                setError("An error occurred while resetting your password. Please try again.");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error || 'An error occurred while resetting your password.');
            } else {
                setError('An error occurred while resetting your password. Please try again.');
            }
        }
    };

    return (
        <div className="reset-password-confirm">
            <h2 className="reset-password-confirm__title">Reset Your Password</h2>
            <form className="reset-password-confirm__form" onSubmit={handleSubmit}>
                <div className="reset-password-confirm__field">
                    <label className="reset-password-confirm__label" htmlFor="new-password">New Password:</label>
                    <input
                        className="reset-password-confirm__input"
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="reset-password-confirm__field">
                    <label className="reset-password-confirm__label" htmlFor="confirm-password">Confirm New Password:</label>
                    <input
                        className="reset-password-confirm__input"
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="reset-password-confirm__error">{error}</p>}
                <button className="reset-password-confirm__button" type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPasswordConfirm;
