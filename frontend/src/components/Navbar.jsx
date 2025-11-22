import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// // Import shadcn components
import { Button } from './ui/button'; 

export default function Navbar() {
const { state, logout } = useContext(AuthContext);
const navigate = useNavigate();

//  Controls the visibility of the mobile navigation menu
const [isMenuOpen, setIsMenuOpen] = useState(false);

// Toggle function
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
    <nav className="p-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
            {/* Logo/Home Link */}
            <Link to={state.isAuthenticated ? "/feed" : "/"} 
                className="flex items-center space-x-3">
                <img 
                    src="/safespace-logo.png" 
                    alt="SafeSpace Logo" 
                    className="h-8 w-auto pl-12" // Adjust height/width as needed
                />
                <span className="text-xl font-bold text-indigo-700">SafeSpace</span>

                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 ml-25 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    {/* Hamburger Button */}
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        // Hamburger icon when menu is closed
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    )}
                </button>
            </Link>

            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
                {authLinks}
            </div>
            
        </div>
                {/* 1. MOBILE MENU DRAWER */}
        {isMenuOpen && (
            <div className="md:hidden w-full border-t border-gray-200 py-3 px-2 bg-white shadow-lg">
                <div className="flex flex-col space-y-3">
                
                {/* NAVLINKS: */}
                <NavLink 
                    to="/feed" 
                    onClick={() => setIsMenuOpen(false)} // Close menu on click
                    className="text-gray-600 hover:text-indigo-600 px-3 py-1 rounded"
                >
                    Feed
                </NavLink>

                <NavLink 
                    to="/resources" 
                    onClick={() => setIsMenuOpen(false)} // Close menu on click
                    className="text-gray-600 hover:text-indigo-600 px-3 py-1 rounded"
                >
                    Resources
                </NavLink>

                <NavLink 
                    to="/donate" 
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm transition-colors text-center"
                >
                    Donate ❤️
                </NavLink>
                
                {/* 2. LOGOUT BUTTON (If authenticated) */}
                {state.isAuthenticated && (
                    <button 
                        onClick={() => {
                            logout(); 
                            setIsMenuOpen(false);
                        }}
                        className="w-full text-left text-red-500 hover:text-red-700 px-3 py-1 rounded"
                    >
                        Logout
                    </button>
                )}
                {/* ------------------------------------------- */}

                    </div>
            </div>
        )}
    </nav>
    

    // <nav className="h-16 bg-red-400 flex items-center justify-center">
    //     {/*  RENDER A SIMPLE TEST */}
    //     <h1>NAVBAR TEST: {state.isAuthenticated ? 'Authenticated' : 'Guest'}</h1>
    // </nav>
);
}