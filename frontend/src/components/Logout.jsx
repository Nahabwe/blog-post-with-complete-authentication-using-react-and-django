import React, { useState } from 'react';
import { clearTokens } from '../tokenService';
import { logout } from '../authService';
import './Logout.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false); 
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');

        if (confirmLogout) {
            setIsLoggingOut(true); 
            logout()
                .then(() => {
                    clearTokens();
                    console.log('Logged out successfully');
                    toast.success('Logged out successfully');
                    navigate('/login');
                })
                .catch(error => {
                    setIsLoggingOut(false); 
                    console.error('Error logging out:', error);
                    toast.error('Failed to log out');
                });
        }
    };

    return (
        <div className="logout__container">
            <h1 className="logout__heading">Logout</h1>
            <button
                onClick={handleLogout}
                className={`logout__button ${isLoggingOut ? 'logout__button--disabled' : ''}`} 
                disabled={isLoggingOut}
            >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    );
};

export default Logout;
