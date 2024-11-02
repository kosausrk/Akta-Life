import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full py-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="text-2xl font-semibold text-gray-800">MyBrand</div>
          <div>
            <Link to="/" className="text-gray-600 hover:text-gray-900 px-4">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 px-4">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 px-4">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center">
        <Link
          to="/begin"
          className="px-8 py-4 text-4xl font-bold bg-blue-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
        >
          BEGIN
        </Link>
      </div>
    </div>
  );
}

function Begin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <h1 className="text-5xl font-bold text-gray-800">Welcome to the Next Page!</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/begin" element={<Begin />} />
      </Routes>
    </Router>
  );
}

export default App;
