import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// // Import shadcn components
import { Button } from './ui/button'; 

export default function Navbar() {
const { state, logout } = useContext(AuthContext);
const navigate = useNavigate();

const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after successful logout
};

// Conditional links based on authentication status
const authLinks = state.isAuthenticated ? (
    // Links for Logged-In Users
    <div className="flex items-center space-x-2">
        <Button variant="ghost" onClick={() => navigate('/feed')}>
            Feed
        </Button>
        <Button variant="ghost" onClick={() => navigate('/resources')}>
            Resources
        </Button>
        <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm transition-colors" onClick={() => navigate('/donate')}>
            Donate ❤️
        </Button>
        <Button onClick={handleLogout} variant="destructive">
            Logout
        </Button>
         {/* Display the user's pseudonym */}
        <span className="text-sm text-gray-600 hidden sm:block">
            {state.user?.pseudonymID || 'User'}
        </span>
    </div>
) : (
    // Links for Guests
    <div className="flex items-center space-x-2">
    <Button variant="ghost" onClick={() => navigate('/login')}>
        Login
    </Button>
    <Button onClick={() => navigate('/register')}>
        Register
    </Button>
    </div>
);

return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
    <div className="container flex items-center justify-between h-16">
        
        {/* Logo/Home Link */}
        <Link to={state.isAuthenticated ? "/feed" : "/"} 
            className="text-2xl font-bold text-indigo-700 hover:text-indigo-900 transition-colors">
        SafeSpace
        </Link>
        
        {/* Navigation Links */}
        {authLinks}
    </div>
    </nav>

    // <nav className="h-16 bg-red-400 flex items-center justify-center">
    //     {/*  RENDER A SIMPLE TEST */}
    //     <h1>NAVBAR TEST: {state.isAuthenticated ? 'Authenticated' : 'Guest'}</h1>
    // </nav>
);
}