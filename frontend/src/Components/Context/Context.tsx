import { ReactNode, createContext } from "react";
import { FormRegister } from "../Types/Register";
import Auth from '../Auth/Auth'

interface ContextProvider {
    children: ReactNode
}
interface ContextType {
    registerUser: (user:FormRegister) => void
}

const UserContext = createContext<ContextType>({} as ContextType)

const UserProvider = ({children}:ContextProvider) =>{
    const {registerUser} = Auth()
    return(
        <UserContext.Provider value={{registerUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}