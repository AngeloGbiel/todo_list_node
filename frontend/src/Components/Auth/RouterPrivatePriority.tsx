import { useContext } from "react"
import { UserContext } from "../Context/Context"
import NotAuth from "../Routes/NotAuth"
import Priority from "../Routes/Priority"

export default function RouterPrivatePriority(){
    const {authorization} = useContext(UserContext)
    return(
        <>
            {authorization ? (<Priority/>) : <NotAuth/>}
        </>
    )
}