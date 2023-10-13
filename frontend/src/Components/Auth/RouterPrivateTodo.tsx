import { useContext } from "react"
import { UserContext } from "../Context/Context"
import Todo from "../Routes/Todo"
import NotAuth from "../Routes/NotAuth"

export default function RouterPrivateTodo(){
    const {authorization} = useContext(UserContext)
    return(
        <>
            {authorization ? (<Todo/>) : <NotAuth/>}
        </>
    )
}