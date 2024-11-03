import { useState } from "react"

export default function InstitutionForm({getStudentInstitution, setStudentInstitution, getProgress, IncrementProgress}) {
    const [getInstitution, setInstitution] = useState('')
    const [universityList, setUniversityList] = useState([])

    const universitySearch = (u) => {

        const MIN_CHAR = 4

        setInstitution(u)

        if (u.length > MIN_CHAR) {
            fetch("http://universities.hipolabs.com/search?name=" + u)
            .then((res) => res.json())
            .then((r) => {
                setUniversityList(r.map((school) => school.name))
            })
        }
    }
    
    return (
        <>
            <div className="border-2 border-slate-500 w-full rounded-md p-4">
                <div className="label">
                    <span className="label-text text-xl text-black">Find your Institution</span>
                </div>
                <div className="text-xl pb-2 text-black"><b>{getStudentInstitution}</b></div>
                <input
                    type="text"
                    placeholder="Search University"
                    className="input input-bordered text-white w-full max-w-x"
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
                                className="btn btn-neutral text-white btn-sm p-1"
                                value={u}
                                onClick={(e) => {
                                    setStudentInstitution(e.target.value)
                                }}
                                >
                                {u}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
    
}