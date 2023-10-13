import { useContext } from "react"
import { UserContext } from "../Context/Context"
import NotAuth from "../Routes/NotAuth"
import EditUser from "../Routes/EditUser"

export default function RouterPrivateEditUser(){
    const {authorization} = useContext(UserContext)
    return(
        <>
            {authorization ? (<EditUser/>) : <NotAuth/>}
        </>
    )
}