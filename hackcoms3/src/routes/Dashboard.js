import { useParams } from "react-router-dom";
import Box from "../utils/box";

export default function Dashboard() {

    let { student } = useParams();
  
    return <>
        <Box prop={
            <div>
                {JSON.stringify(student)}
            </div>
        } />
    </>
  }