import { useParams } from "react-router-dom";
import Box from "../utils/box";

export default function Dashboard() {

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