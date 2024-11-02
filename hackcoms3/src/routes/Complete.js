import { useLocation } from "react-router-dom"

export default function Complete({formData}) {


    const location = useLocation();

    const log = (state) => {
        console.log(state)
    }

    return <>
        { log(location.state.student) }
        {JSON.stringify(location.state.student)}
    </>
}