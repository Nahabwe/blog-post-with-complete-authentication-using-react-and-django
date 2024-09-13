import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);  // New state to track submission status
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);  // Disable button when form is submitted

        try {
            const response = await axios.post('http://127.0.0.1:8000/user/register/', {
                username,
                email,
                password,
                password2,
                first_name: firstName,
                last_name: lastName,
            });
            console.log('User registered:', response.data);
            toast.success('User registered successfully');
            navigate('/login'); 
        } catch (error) {
            setIsSubmitting(false);  

            if (error.response?.data) {
                setErrors(error.response.data);
                Object.keys(error.response.data).forEach((key) => {
                    error.response.data[key].forEach((message) => {
                        toast.error(`${key}: ${message}`);
                    });
                });
            } else {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="register__container">
            <h1 className="heading">Register</h1>
            <form onSubmit={handleSubmit} className="register__form">
                <label className="register__label">
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        className="register__input"
                    />
                    {errors.username && <div className="error">{errors.username[0]}</div>}
                </label>
                <br />
                <label className="register__label">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="input"
                    />
                    {errors.email && <div className="error">{errors.email[0]}</div>}
                </label>
                <br />
                <label className="register__label">
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                    {errors.password && <div className="error">{errors.password[0]}</div>}
                </label>
                <br />
                <label className="register__label">
                    Confirm Password:
                    <input
                        type="password"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        required
                        className="register__input"
                    />
                    {errors.password2 && <div className="error">{errors.password2[0]}</div>}
                </label>
                <br />
                <label className="register__label">
                    First Name:
                    <input
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                        className="input"
                    />
                    {errors.first_name && <div className="error">{errors.first_name[0]}</div>}
                </label>
                <br />
                <label className="register__label">
                    Last Name:
                    <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                        className="register__input"
                    />
                    {errors.last_name && <div className="error">{errors.last_name[0]}</div>}
                </label>
                <br />
                <button
                    type="submit"
                    className="register__button"
                    disabled={isSubmitting}  
                >
                    {isSubmitting ? 'Registering...' : 'Register'}  
                </button>
            </form>
        </div>
    );
};

export default Register;
