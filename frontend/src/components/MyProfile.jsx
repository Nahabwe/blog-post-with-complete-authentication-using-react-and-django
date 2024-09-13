import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyProfile.css';

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/user/profile/', {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
            .then(response => {
                setUser(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError('Error fetching user data');
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="myprofile__container">
            <h1 className="myprofile__heading">My Profile</h1>
            {user && (
                <div className="myprofile__details">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>First Name:</strong> {user.first_name}</p>
                    <p><strong>Last Name:</strong> {user.last_name}</p>
                    <p><strong>Blog Posts Created:</strong> {user.blog_post_count}</p>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
