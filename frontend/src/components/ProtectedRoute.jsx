import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { state } = useContext(AuthContext);

    // 1. Show a loading state while the token check runs
    if (state.loading) {
        
        return (
        <div className="flex justify-center items-center min-h-screen text-lg text-gray-500">
            Loading User Session...
        </div>
        ); 
    }

    // 2. If not authenticated, redirect to the login page
    if (!state.isAuthenticated) {
        // The 'replace' prop ensures the user can't hit the back button to get back here
        return <Navigate to="/login" replace />;
    }

    // 3. If authenticated, render the child components (the protected page)
    return children;
}