import { useParams, useLocation } from 'react-router-dom';
import data from '../professors_data.json';

export default function Course() {
    const { courseName } = useParams(); // Get the course name from the URL
    const location = useLocation(); // Get the state passed from the Pathway component
    const courseDetails = location.state?.courseDetails; // Get the course details from the state
    const professorRating = courseDetails && data[courseDetails.professor];
   
    const getRatingsByName = (name) => {
        const foundItem = data.find(item => item.Name === name);
        if (foundItem) {
            return (
                <div>
                    <p>Total Ratings: {foundItem["Total Ratings"]}</p>
                    <p>Quality: {foundItem.Quality}</p>
                    <p>Would Take Again: {foundItem["Would Take Again"]}</p>
                    <p>Difficulty: {foundItem.Difficulty}</p>
                </div>
            );
        }
    }
    
    
    return (
        <div>
            <h1>Course Details</h1>
            <p>Course Name: {courseName}</p>
            {courseDetails && (
                <p>Professor: {courseDetails.professor}</p>
                
            )}

            <p>Professor Rating: {getRatingsByName(courseDetails.professor)}</p>
    


        </div>

    );
};
