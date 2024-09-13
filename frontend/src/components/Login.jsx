import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../authService';
import { setTokens } from '../tokenService';
import { toast } from 'react-toastify';
import './Login.css'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsAuthenticating(true);

        login({ username, password })
            .then(response => {
                setTokens(response.data);
                toast.success('Login successful!');
                navigate('/');
            })
            .catch(error => {
                setIsAuthenticating(false);
                if (error.response && error.response.data) {
                    setErrorMessage('Login failed: ' + error.response.data.detail);
                    toast.error('Login failed!');
                } else {
                    setErrorMessage('An unexpected error occurred.');
                }
            });
    };

    return (
        <div className="login__container">
            <h1 className="login__heading">Login</h1>
            {errorMessage && <p className="login__error">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="login__form">
                <label className="login__label">
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className={`login__input ${isAuthenticating ? 'login__disabled-input' : ''}`}
                        disabled={isAuthenticating}
                    />
                </label>
                <br />
                <label className="login__label">
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`login__input ${isAuthenticating ? 'login__disabled-input' : ''}`}
                        disabled={isAuthenticating}
                    />
                </label>
                <br />
                <button
                    type="submit"
                    className={`login__button ${isAuthenticating ? 'login__disabled-button' : ''}`}
                    disabled={isAuthenticating}
                >
                    {isAuthenticating ? 'Authenticating...' : 'Login'}
                </button>

                <Link
                    to='/register'
                    className={`login__link ${isAuthenticating ? 'login__disabled-link' : ''}`}
                    style={{ pointerEvents: isAuthenticating ? 'none' : 'auto' }}
                >
                    Register
                </Link>
                <Link
                    to='/forgot-password'
                    className={`login__link ${isAuthenticating ? 'login__disabled-link' : ''}`}
                >
                    Forgot password
                </Link>
            </form>
        </div>
    );
};

export default Login;
