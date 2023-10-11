import { ReactNode, createContext, useState } from "react";
import { FormLogin, FormRegister } from "../Types/Register";
import Auth from '../Auth/Auth'

interface ContextProvider {
    children: ReactNode
}
interface ContextType {
    registerUser: (user:FormRegister) => void,
    loginUser: (user: FormLogin) => void,
    setToken: (token: string) => void,
    token: string
}

const UserContext = createContext<ContextType>({} as ContextType)

const UserProvider = ({children}:ContextProvider) =>{
    const [token,setToken] = useState<string>('')

    const {registerUser,loginUser} = Auth()
    return(
        <UserContext.Provider value={{registerUser,loginUser, setToken,token}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}