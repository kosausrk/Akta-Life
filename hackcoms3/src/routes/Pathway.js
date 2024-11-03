import { useNavigate } from 'react-router-dom';
import Box from '../utils/box';

export default function Pathway({ courses }) {
    const navigate = useNavigate();

    return (
        <Box prop={
            <div>
                <h1 className="text-3xl font-bold mb-6">Pathway</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4">
                    {Object.entries(courses).map(([course, professor], index) => (
                        <button
                            key={index}
                            onClick={() => navigate(`/course/${course}`, { state: { courseDetails: { course, professor } } })}
                            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow-lg transition-transform transform hover:scale-105"
                        >
                            {course}
                        </button>
                    ))}
                </div>
            </div>
        } />
    );
};
