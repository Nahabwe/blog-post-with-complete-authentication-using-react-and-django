import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../tokenService'; // Adjust path based on your project structure

const PrivateRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = !!getAccessToken(); // Check if the access token exists

    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
