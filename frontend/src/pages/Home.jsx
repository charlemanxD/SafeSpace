import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Welcome to SafeSpace 🤫
    </h1>
    <p className="text-xl text-gray-600 mb-8">
        Your anonymous platform for sharing and support.
    </p>
    <Link to="/register">
        <button className="px-6 py-3 bg-indigo-600 text-white text-lg rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
        Start by Registering
        </button>
    </Link>
    </div>
);
}