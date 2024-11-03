import { useLocation } from "react-router-dom";
import Box from "../utils/box";

/*
    school: '',
    grade: '',
    major: '',
    interests: '',
    courses: [],
*/

export default function Dashboard() {

    const location = useLocation();
  
    return <>
        <Box prop={
            <div>
                {location.state.studentData.school}
                {location.state.studentData.courses}
            </div>
        } />
    </>
  }