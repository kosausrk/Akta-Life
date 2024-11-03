import { useParams } from "react-router-dom";
import Box from "../utils/box";
import Query from "../utils/ai";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const { student } = useParams();
    const [courseData, setCourseData] = useState(null);
    const studentMsg = () => {
        return JSON.parse(atob(student));
    };

    useEffect(() => {
        Query({
            major: studentMsg().major,
            courses: studentMsg().courses,
            grade: studentMsg().year,
            interests: [studentMsg().bio]
        }).then((value) => {
            try {
                setCourseData(JSON.parse(value)); // Ensure the response is parsed as an object
            } catch (error) {
                console.error('Error parsing the response:', error);
            }
        });
    }, []);

    return (
        <Box prop={
            <div>
                <h1 className="text-lg text-stone-800"><b>Completed Coursework</b></h1>
                <div className="flex justify-center">
                    <div>
                        {studentMsg().courses.map((course, index) => (
                            <div key={index} className="my-4">
                                <button className="btn btn-wide btn-lg rounded btn-accent">
                                    {course}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <hr />

                <div>
                    <h1 className="text-lg text-stone-800"><b>Required Courses</b></h1>
                    {courseData && courseData["Required Courses"] ? (
                        <div className="my-4">
                            {courseData["Required Courses"].map((course, index) => (
                                <div key={index} className="my-2">
                                    <div className="p-4 border rounded shadow-sm bg-white">
                                        <p><b>Course:</b> {course.course_code}</p>
                                        <p><b>Professor:</b> {course.professor}</p>
                                        <p><b>Rating:</b> {course.rating !== null ? course.rating : 'N/A'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading required courses...</p>
                    )}
                </div>

                <hr />

                <div>
                    <h1 className="text-lg text-stone-800"><b>Recommended Courses</b></h1>
                    {courseData && courseData["Recommended Courses"] ? (
                        <div className="my-4">
                            {courseData["Recommended Courses"].map((course, index) => (
                                <div key={index} className="my-2">
                                    <div className="p-4 border rounded shadow-sm bg-white">
                                        <p><b>Course:</b> {course.course_code}</p>
                                        <p><b>Professor:</b> {course.professor}</p>
                                        <p><b>Rating:</b> {course.rating !== null ? course.rating : 'N/A'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading recommended courses...</p>
                    )}
                </div>
            </div>
        } />
    );
}
