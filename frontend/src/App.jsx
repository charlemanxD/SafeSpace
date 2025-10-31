import { AuthProvider } from './context/AuthContext';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Resources from './pages/Resources';
import Donate from './pages/Donate';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/donate" element={<Donate />} />

            {/* Protected Routes */}
            <Route path="/feed" element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            } />

            {/* Placeholder for Resources */}
            <Route path="/resources" element={
              <ProtectedRoute>
                <h2 className="text-2xl text-center pt-10">Resources Page (Protected)</h2>
              </ProtectedRoute>
            } />


            {/* Other routes will be added later */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;