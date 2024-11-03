import { useEffect, useState } from "react";
import Box from "../utils/box";
import InstitutionForm from "./InstitutionForm";
import UserProfile from "./UserProfileForm";
import { redirect, useNavigate } from "react-router-dom";

export default function Welcome() {

    const [getProgress, setProgress] = useState(1)
    const [getStudentInstitution, setStudentInstitution] = useState('')
    const [getYear, setYear] = useState('')
    const [getMajor, setMajor] = useState('')
    const [getCourses, setCourses] = useState([])
    const [getInterests, setInterests] = useState('')
    const navigate = useNavigate()
    
    const handleCarouselClick = (e) => {
        if (getProgress === 3) {
            // navigate to the dashboard here with the user data
            const res = {
                year: getYear,
                major: getMajor,
                courses: getCourses,
                bio: getInterests
            }
            navigate(`/dashboard/${btoa(JSON.stringify(res))}`)
        }
        setProgress(getProgress + 1)
    }

    const InstitutionDataForm = () => {
        if (getProgress === 2) {
            setTimeout(() => {}, 1000)
            return <></>
        }
        return <InstitutionForm 
        getStudentInstitution={getStudentInstitution}
        setStudentInstitution={setStudentInstitution}
        /> 
    }

    const UserProfileData = () => {
        if (getProgress === 3) {
            setTimeout(() => {}, 1000)
            return <></>
        }
        if (getProgress === 2) {
            return <UserProfile 
                setYear={setYear}
                setMajor={setMajor}
                setCourses={setCourses}
                getCourses={getCourses}
                setInterests={setInterests}
            />
        }
    }

    const ProfileConfirm = () => {
        if (getProgress === 3) {
            return (
                <div className="text-stone-800">
                    <h1 className="text-xl text-black"><u>Confirmation</u></h1>
                    <div><p className="text-bold text-lg"><b>Major: </b>{getMajor}</p></div>
                    <div><p className="text-bold text-lg"><b>Year: </b>{getYear}</p></div>
                    <div><p className="text-bold text-lg"><b>Current Coursework: </b></p>{getCourses.map((course) => <li>{course}</li>)}</div>
                    <div><p className="text-bold text-lg"><b>Bio: </b>{getInterests}</p></div>
                </div>
            )
        }
    }

    return <>
        <Box prop={
            <div>
                <div className="flex place-content-center w-full">
                    <div className="carousel">
                        <div id='1' className="carousel-item w-full"> 
                            {InstitutionDataForm()}
                        </div>
                        <div id='2' className="carousel-item w-full">
                            <div className="flex-auto place-content center">
                                {UserProfileData()}
                            </div>
                        </div>
                        <div id='3' className="carousel-item w-full">
                            {ProfileConfirm()}
                        </div>
                    </div>
                </div>
                <div className="flex place-content-center pt-4">
                        <a href={"#" + getProgress} onClick={handleCarouselClick}>
                            <button className="btn btn-accent text-white">
                                Continue
                            </button>
                        </a>
                </div>
            </div>
        }
        />
    </>
}