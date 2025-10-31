import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';

// Import shadcn components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export default function Login() {
const [formData, setFormData] = useState({
    email: '',
    password: '',
});

const [message, setMessage] = useState('');
const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate(); // Hook for redirection

const { login } = useContext(AuthContext);


const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(''); // Clear message on new input
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('Logging in...');

    try {
    // 1. Call the Login API endpoint
    const res = await axios.post('/api/auth/login', formData);

    // 2. On Success: Log the received data (token and user info)
    const { token, user } = res.data;

    // VITAL: Call the global login function to save the token and state
    login({ token, user });

    setMessage('Login successful! Redirecting to feed...');
    
    // setMessage('Login successful! Redirecting...');
    
    // Temporarily redirect to Home after a successful login (for now)
    // setTimeout(() => navigate('/'), 1500); 

    // Redirect immediately to the protected feed page
    navigate('/feed');

    } catch (err) {
    // 3. Handle errors
    const errMsg = err.response?.data?.msg || 'Login failed. Invalid credentials.';
    setMessage(errMsg);

    } finally {
    setIsLoading(false);
    }
};

return (
    <div className="flex items-center justify-center min-h-[80vh]">
    <Card className="w-[350px]">
        <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome Back to SafeSpace</CardTitle>
        <CardDescription>
            Enter your credentials to log in.
        </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
            
            {/* Email Field */}
            <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={handleChange}
            />
            </div>
            
            {/* Password Field */}
            <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
                id="password"
                name="password"
                type="password"
                required
                onChange={handleChange}
            />
            </div>
            
            {/* Message Display */}
            {message && (
                <p className={`text-sm text-center ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Log In'}
            </Button>
            
            <div className="mt-4 text-center text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="underline text-indigo-600 hover:text-indigo-800">
                    Sign up
                </Link>
            </div>
        </form>
        </CardContent>
    </Card>
    </div>
);
}