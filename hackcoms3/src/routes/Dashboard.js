import { useParams } from "react-router-dom";
import Box from "../utils/box";

export default function Dashboard() {
    /*
    :student {
        year: str
        major: str
        courses: [str]
        bio: str
    }
    */

    let { student } = useParams();

    const studentUser = () => {
        return JSON.parse(student)
    }
  
    return <>
        <Box prop={
            <div>
                {JSON.stringify(studentUser())}
            </div>
        } />
    </>
  }