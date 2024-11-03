import { useState } from "react";
import Majors from "../utils/majors";



export default function UserProfile({setYear, setMajor, setInterests}) {

    return (
    <>
        <div className="border-2 border-slate-500 w-full rounded-md p-4">
            <div className="label">
                <div className="label-text text-xl text-black">
                    Tell us about yourself
                </div>
            </div>
            <div>
                <select 
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => {
                        setYear(e.target.value)
                    }}
                >
                    <option disabled selected>Select Year</option>
                    <option>Freshman</option>
                    <option>Sophmore</option>
                    <option>Junior</option>
                    <option>Senior</option>
                </select>
            </div>
            <div className="p-4"></div>
            <div>
                <select 
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => {
                        setMajor(e.target.value)
                    }}
                >
                <option disabled selected>Current Major</option>
                {Majors().map((major) => <option>{major}</option>)}
                </select>
            </div>
            <div className="p-4"></div>
            <div>
                <textarea 
                className="textarea textarea-primary w-full max-w-xs" 
                placeholder="Bio"
                onChange={(e) => setInterests(e.target.value)}
                >
                </textarea>
            </div>
        </div>

    </>
    );
}