import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import FormComponent from './routes/Form';
import Complete from './routes/Complete';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full py-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="text-2xl font-semibold text-gray-800">MyBrand</div>
          <div>
            <Link to="/" className="text-gray-600 hover:text-gray-900 px-4">Home</Link>
            <Link to="/form" className="text-gray-600 hover:text-gray-900 px-4">Form</Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center">
        <Link
          to="/form"
          className="px-8 py-4 text-4xl font-bold bg-blue-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
        >
          BEGIN
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormComponent />} />
        <Route path="/complete"element={<Complete />} />
      </Routes>
    </Router>
  );
}

export default App;
