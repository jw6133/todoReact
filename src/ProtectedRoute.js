// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
