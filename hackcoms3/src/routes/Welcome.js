import { useState } from "react";
import Box from "../utils/box";


export default function Welcome() {

    const [getProgress, setProgress] = useState(1)
    const [getInstitution, setInstitution] = useState('')
    const [universityList, setUniversityList] = useState([])
    const [getStudentInstitution, setStudentInstitution] = useState('')


    const studentInstitutionInformation = () => {
        
    }


    const universitySearch = (u) => {

        setInstitution(u)

        if (u.length > 2) {
            fetch("http://universities.hipolabs.com/search?name=" + u)
            .then((res) => res.json())
            .then((r) => {
                setUniversityList(r.map((school) => school.name))
            })
        }
    }
    
    const handleCarouselClick = (e) => {
        if (getProgress === 4) {
            alert('Progress Complete')
        }
        setProgress(getProgress + 1)
    }
    return <>
        <Box prop={
            <div>
                <div className="flex place-content-center">
                    <div className="carousel">
                        <div id='1' className="carousel-item w-full"> 
                            <div className="border-2 border-slate-500 w-full rounded-md p-4">
                                <div className="label">
                                    <span className="label-text text-xl text-black">Find your Institution</span>
                                </div>
                                <div className="text-xl text-slate-500">{getStudentInstitution}</div>
                                <input
                                    type="text"
                                    placeholder="Search University"
                                    className="input input-bordered  w-full max-w-x"
                                    id="institution-field"
                                    value={getInstitution}
                                    onChange={(e) => {
                                        universitySearch(e.target.value)
                                    }}
                                />
                                <div>
                                    {universityList.map((u) => {
                                        return (
                                            <div className="pt-2">
                                                <button 
                                                key={Math.random()}
                                                className="btn btn-neutral btn-sm p-1"
                                                value={u}
                                                onClick={(e) => {setStudentInstitution(e.target.value)}}
                                                >
                                                {u}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>                     
                        </div>
                        <div id='2' className="carousel-item w-full">
                            <div className="flex place-content center">
                                <div className="flex text-xl text-slate-500">{getStudentInstitution}</div>
                            
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex place-content-center pt-4">
                        <a href={"#" + getProgress} onClick={handleCarouselClick}>
                            <button className="btn btn-primary">
                                Continue
                            </button>
                        </a>
                </div>
            </div>
        } 
        />
    </>
}