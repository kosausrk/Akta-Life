import { useLocation, useParams } from "react-router-dom";
import Box from "../utils/box";
import Query from "../utils/ai";
import { useEffect, useState } from "react";


export default function Dashboard() {

    const { student } = useParams('');
    const [getValue, setValue] = useState('')

    const studentMsg = () => {
        return JSON.parse(atob(student))
    }


    useEffect(() => {
        Query({
        major: studentMsg().major,
        courses: studentMsg().courses,
        grade: studentMsg().year,
        interests: [studentMsg().bio]
        }).then((value) => setValue(value))}, [])


    const track = () => {
        return (
            <>
                {JSON.parse(getValue)}
            </>
        )
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

                <button className="btn btn-primary" onClick={
                    () => {
                        console.log(JSON.parse(getValue))
                    }
                }>AI</button>{}

                {track()}
            </div>
        } />
    </>
  }