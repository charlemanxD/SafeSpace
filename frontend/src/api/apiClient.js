import axios from 'axios';

// Create an instance for standardized API calls
const apiClient = axios.create({
baseURL: '/api', // This uses the proxy defined in package.json
headers: {
    'Content-Type': 'application/json',
},
});

// Request Interceptor: Attach JWT to every outgoing request
apiClient.interceptors.request.use((config) => {
const token = localStorage.getItem('jwtToken');
if (token) {
    config.headers.Authorization = `Bearer ${token}`;
}
return config;
}, (error) => {
return Promise.reject(error);
});

// Response Interceptor: Handle errors, logging out the user if 401/403
apiClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Example: If the server returns a 403 (Forbidden/Banned) or 401
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // This is a common practice to enforce server-side logout
        console.error("Authentication or Authorization failure. Logging out...");
        // Force log out (you'll need to dispatch this from a surrounding component in a real app)
        // For now, we'll just remove the token and let the next render handle it.
        localStorage.removeItem('jwtToken'); 
        // window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
});

export default apiClient;