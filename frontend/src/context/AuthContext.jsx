import React, { createContext, useReducer, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// --- INITIAL STATE ---
const initialState = {
    isAuthenticated: false,
    user: null, // Stores user data (username, email, pseudonymID)
    token: null,
    loading: true, // prevent rendering protected routes before checking token
};

// --- REDUCER FUNCTION ---
const authReducer = (state, action) => {
switch (action.type) {
    case 'LOGIN':
    case 'REGISTER_SUCCESS':
    // Store token in localStorage and update state
    localStorage.setItem('token', action.payload.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
    return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
    };
    case 'LOGOUT':
    // Remove token from localStorage and update state
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
    };
    case 'SET_LOADING':
    return {
        ...state,
        loading: action.payload,
    };
    default:
    return state;
}
};

// --- CONTEXT CREATION ---
export const AuthContext = createContext({
state: initialState,
dispatch: () => null,
login: () => {},
logout: () => {},
registerSuccess: () => {},
});

// --- CONTEXT PROVIDER COMPONENT ---
export const AuthProvider = ({ children }) => {
const [state, dispatch] = useReducer(authReducer, initialState);

// Helper functions to dispatch actions
const login = (data) => dispatch({ type: 'LOGIN', payload: data });
const logout = () => dispatch({ type: 'LOGOUT' });
const registerSuccess = (data) => dispatch({ type: 'REGISTER_SUCCESS', payload: data });

// VITAL: Check for token on application load
useEffect(() => {
    const checkToken = () => {
    const token = localStorage.getItem('token');

    if (token) {
        try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
            // Token is valid: Re-authenticate the user

            // Re-attach token to axios on app load
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            login({ token, user: decoded.user }); 
        } else {
            // Token expired: Force logout
            logout();
        }
        } catch (error) {
        // Token is malformed/invalid
        logout();
        }
    }
    
    // VITAL: Stop loading regardless of token status
    dispatch({ type: 'SET_LOADING', payload: false });
    };

    checkToken();
}, []); // Run only once on mount

return (
    <AuthContext.Provider value={{ state, dispatch, login, logout, registerSuccess }}>
    {children}
    </AuthContext.Provider>
);
};