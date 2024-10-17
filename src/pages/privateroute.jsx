// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './config/firebase-config'; // Import your Firebase auth

const PrivateRoute = ({ element }) => {
    const user = auth.currentUser; // Get the current user

    return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
