import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function FormComponent() {
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
      navigate('/dashboard', {state: {id: formData.school, studentData: formData}}); // Navigate to the Dashboard after a delay
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