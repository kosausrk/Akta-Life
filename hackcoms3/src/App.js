import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import FormComponent from './routes/Form';
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
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="text-center">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-gray-800 border-gray-300 rounded-full mb-4"></div>
        <h2 className="text-2xl font-semibold text-gray-800">Loading... Please wait</h2>
      </div>
    </div>
  );
}



function FormComponent() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    school: '',
    grade: '',
    major: '',
    interests: '',
    courses: [],
  });
  const [courseInput, setCourseInput] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCourseAdd = () => {
    if (courseInput.trim() !== '') {
      setFormData((prevData) => ({
        ...prevData,
        courses: [...prevData.courses, courseInput],
      }));
      setCourseInput('');
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      setModalMessage('Please complete all required fields before proceeding.');
      setShowModal(true);
    }
  };

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return formData.school !== '';
      case 2:
        return formData.grade !== '' && formData.major !== '' && formData.interests.trim() !== '';
      case 3:
        return formData.courses.length > 0;
      default:
        return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setLoading(true); // Show loading screen
    setTimeout(() => {
      navigate('/dashboard'); // Navigate to the Dashboard after a delay
    }, 3000); // Simulate a 3-second delay for loading
  };

  if (loading) {
    return <LoadingScreen />; // Render the loading screen if loading state is true
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 p-6">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-lg">
        {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}

        {step === 1 && (
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Step 1: Find Your School</h2>
            <select
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="select select-bordered w-full mb-4 border-gray-300 shadow-sm"
              required
            >
              <option value="" disabled>Select your school</option>
              <option value="RIT">RIT</option>
            </select>
            <button onClick={nextStep} className="btn w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600 transition-all duration-300 rounded-lg">Next</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Step 2: Tell Us About Yourself</h2>
            <label className="block text-gray-700 font-medium mb-2">Grade in College</label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="select select-bordered w-full mb-4 border-gray-300 shadow-sm"
              required
            >
              <option value="" disabled>Select Grade</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>

            <label className="block text-gray-700 font-medium mb-2">Major</label>
            <select
              name="major"
              value={formData.major}
              onChange={handleChange}
              className="select select-bordered w-full mb-4 border-gray-300 shadow-sm"
              required
            >
              <option value="" disabled>Select Major</option>
              <option value="CS">CS</option>
            </select>

            <label className="block text-gray-700 font-medium mb-2">Areas of Interest</label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className="input input-bordered w-full mb-4 border-gray-300 shadow-sm"
              required
            />

            <button onClick={nextStep} className="btn w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600 transition-all duration-300 rounded-lg">Next</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Step 3: Add Your Courses</h2>
            <div className="mb-4">
              <ul className="list-disc list-inside bg-gray-50 p-4 rounded-lg mb-2">
                {formData.courses.map((course, index) => (
                  <li key={index} className="text-gray-700">{course}</li>
                ))}
              </ul>
              <div className="flex items-center">
                <input
                  type="text"
                  value={courseInput}
                  onChange={(e) => setCourseInput(e.target.value)}
                  className="input input-bordered flex-grow mr-2 border-gray-300 shadow-sm"
                  placeholder="Add a course"
                />
                <button onClick={handleCourseAdd} className="btn bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600 transition-all duration-300 rounded-lg">Add</button>
              </div>
            </div>

            <button onClick={handleSubmit} className="btn w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600 transition-all duration-300 rounded-lg">Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
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
        <Route path="/form" element={<FormComponent />} />
        <Route path="/complete"element={<Complete />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

