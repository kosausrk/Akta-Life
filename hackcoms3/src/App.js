import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Complete from './routes/Complete';

function Modal({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Notice</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-600 transition-all duration-300"
        >
          OK
        </button>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col">
      {/* Navbar */}
      <nav className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-600 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="text-3xl font-semibold text-white tracking-wider">AKTA</div>
          <div>
            <Link to="/" className="text-white hover:text-gray-300 px-4 transition-colors duration-300">Home</Link>
            <Link to="/AIPage" className="text-white hover:text-gray-300 px-4 transition-colors duration-300">AI Test</Link>
            <Link to="/form" className="text-white hover:text-gray-300 px-4 transition-colors duration-300">Form</Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl mb-8 max-w-2xl text-center">
          <h2 className="text-4xl font-semibold mb-4 text-gray-800">Welcome to AKTA</h2>
          <p className="text-gray-600">
            This tool will guide you through a series of steps to gather essential information about your academic background.
            Fill in the details and proceed to get tailored insights and support.
          </p>
        </div>
        <Link
          to="/form"
          className="px-10 py-4 text-3xl font-semibold bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          BEGIN
        </Link>
      </div>
    </div>
  );
}

function Dashboard() {

  const location = useLocation();


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
      {console.log(location.studentData)}
      <div className="container mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl max-w-4xl">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">Dashboard</h2>
        
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Required Courses</h3>
          <select className="select select-bordered w-full border-gray-300 shadow-sm">
            <option value="" disabled>Select a required course</option>
            {/* Placeholder options */}
            <option value="Course 1">Course 1</option>
            <option value="Course 2">Course 2</option>
          </select>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Recommended Courses</h3>
          <select className="select select-bordered w-full border-gray-300 shadow-sm">
            <option value="" disabled>Select a recommended course</option>
            {/* Placeholder options */}
            <option value="Course A">Course A</option>
            <option value="Course B">Course B</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AIPage" element={<AIComponent />} />
        <Route path="/form" element={<FormComponent />} />
        <Route path="/complete"element={<Complete />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

