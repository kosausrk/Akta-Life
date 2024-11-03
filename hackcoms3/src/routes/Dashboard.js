import { useLocation, useParams } from "react-router-dom";
import Box from "../utils/box";


export default function Dashboard() {

    const { student } = useParams();

    const studentMsg = () => {
        return JSON.parse(atob(student))
    }

    return <>
        <Box prop={
            <div>
                <h1 className="text-lg text-stone-800"><b>Completed Coursework</b></h1>
                <div className="flex justify-center">
                    <div>
                    {studentMsg().courses.map((course) => {
                        return (
                            <div className="my-4">
                                <button className="btn btn-wide btn-lg rounded btn-accent">
                                    {course}
                                </button>
                            </div>
                        )
                    })}
                    </div>
                </div>

                <hr></hr>

                <div>
                    <h1 className="text-lg text-stone-800"><b>Your Reccomended Courses</b></h1>
                </div>



            </div>
        } />
    </>
  }