import { useNavigate } from 'react-router-dom';


export default function Pathway({ totalcourses }) {
    const navigate = useNavigate();


    console.log('Total courses data:', totalcourses);


    if (!totalcourses || typeof totalcourses !== 'object' || Object.keys(totalcourses).length === 0) {
        console.error('Invalid course data:', totalcourses);
        return (
            <div>
                <h2>Error: No course data available</h2>
                <p>Please check back later or contact support if the issue persists.</p>
            </div>
        );
    }


    return (
        <div>
            <h1>Pathway</h1>
            {Object.entries(totalcourses).map(([categoryName, courseList], categoryIndex) => (
                <div key={categoryIndex}>
                    <h2>{categoryName}</h2>
                    {Object.entries(courseList).map(([courseKey, courseTitle], courseIndex) => {
                        // Split the key to extract course code, professor, and rating
                        const [course, professorWithPrefix, ratingWithPrefix] = courseKey.split(' - ');
                        const professor = professorWithPrefix.replace('Professor: ', '');
                        const rating = ratingWithPrefix.replace('Rating: ', '');


                        return (
                            <div key={`${categoryName}-${courseIndex}`}>
                                <h3>{courseTitle}</h3>
                                <button
                                    onClick={() => navigate(`/course/${course}`, { state: { courseDetails: { course, professor, rating, courseTitle } } })}
                                    aria-label={`Navigate to ${course} (${courseTitle}) taught by ${professor} with a rating of ${rating}`}
                                >
                                    {course}
                                </button>
                                <p>Professor: {professor}</p>
                                <p>Rating: {rating}</p>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}


