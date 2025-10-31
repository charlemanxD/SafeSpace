import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

// Import shadcn components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export default function Register() {
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Use null for message on success, text for error/loading
    const [message, setMessage] = useState(null); 
    const [isLoading, setIsLoading] = useState(false); 

    const navigate = useNavigate();
    const { registerSuccess } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setMessage(null); // Clear message on new input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading
        setMessage('Processing registration...');

        try {
            const res = await axios.post('/api/auth/register', formData);

            const { token, user } = res.data;

            // 1. Call the global registerSuccess function
            registerSuccess({ 
                token: token, 
                user: jwtDecode(res.data.token).user }); 
            
            // 2. Redirect immediately (no need for a success message display)
            navigate('/feed');

        } catch (err) {
            // 3. Handle and display errors only
            const errMsg = err.response?.data?.msg || 'Registration failed. Server error.';
            setMessage(errMsg);
            // We set isLoading back to false in the 'finally' block

        } finally {
            setIsLoading(false); // Stop loading regardless of success/fail
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <Card className="w-[350px]">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Create SafeSpace Account</CardTitle>
                    <CardDescription>
                        Join to share anonymously and find support.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" type="text" placeholder="Choose a username" required onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required onChange={handleChange} />
                        </div>

                        {/* Message Display: Show error (red) or processing status (default text) */}
                        {message && (
                            <p className={`text-sm text-center ${message.includes('failed') || message.includes('error') ? 'text-red-600' : 'text-gray-600'}`}>
                                {message}
                            </p>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Registering...' : 'Register'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}