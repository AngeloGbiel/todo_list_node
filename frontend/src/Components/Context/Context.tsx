import { ReactNode, createContext } from "react";
import { FormLogin, FormRegister } from "../Types/Register";
import Auth from '../Auth/Auth'

interface ContextProvider {
    children: ReactNode
}
interface ContextType {
    registerUser: (user:FormRegister) => void,
    loginUser: (user: FormLogin) => void
}

const UserContext = createContext<ContextType>({} as ContextType)

const UserProvider = ({children}:ContextProvider) =>{
    const {registerUser,loginUser} = Auth()
    return(
        <UserContext.Provider value={{registerUser,loginUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}