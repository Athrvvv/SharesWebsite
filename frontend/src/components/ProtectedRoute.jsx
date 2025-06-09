// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');

  const isValidToken = () => {
    try {
      if (!token) return false;
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      return decoded.exp > now;
    } catch (err) {
      return false;
    }
  };

  return isValidToken() ? <Outlet /> : <Navigate to="/login" />;
}