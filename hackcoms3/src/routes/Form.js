import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function FormComponent() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      school: '',
      grade: '',
      major: '',
      interests: '',
      courses: [],
    });
    const [courseInput, setCourseInput] = useState('');
  
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
        alert('Please complete all required fields before proceeding.');
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
        navigate('/complete', {state: {id: formData.school, student: formData}})
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Step 1: Find Your School</h2>
              <select
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="select select-bordered w-full mb-4"
                required
              >
                <option value="" disabled>Select your school</option>
                <option value="RIT">RIT</option>
              </select>
              <button onClick={nextStep} className="btn btn-primary w-full">Next</button>
            </div>
          )}
  
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Step 2: Tell Us About Yourself</h2>
              <label className="block text-gray-700 font-medium mb-2">Grade in College</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="select select-bordered w-full mb-4"
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
                className="select select-bordered w-full mb-4"
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
                className="input input-bordered w-full mb-4"
                required
              />
  
              <button onClick={nextStep} className="btn btn-primary w-full">Next</button>
            </div>
          )}
  
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Step 3: Add Your Courses</h2>
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
                    className="input input-bordered flex-grow mr-2"
                    placeholder="Add a course"
                  />
                  <button onClick={handleCourseAdd} className="btn btn-secondary">Add</button>
                </div>
              </div>
  
              <button onClick={handleSubmit} className="btn btn-primary w-full">Submit</button>
            </div>
          )}
        </div>
      </div>
    );
  }