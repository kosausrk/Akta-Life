import { useNavigate } from 'react-router-dom';

export default function Pathway({ courses }) {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Pathway</h1>
            {Object.entries(courses).map(([course, professor], index) => (
                <button
                    key={index}
                    onClick={() => navigate(`/course/${course}`, { state: { courseDetails: { course, professor } } })}
                >
                    {course}
                </button>
            ))}
        </div>
    );
};
