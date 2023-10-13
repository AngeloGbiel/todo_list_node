import { ReactNode, createContext,} from "react";
import { ContextType } from "../Types/interface";
import Auth from '../Auth/Auth'

interface ContextProvider {
    children: ReactNode
}


const UserContext = createContext<ContextType>({} as ContextType)

const UserProvider = ({children}:ContextProvider) =>{
    const {registerUser,loginUser, authorization, userExist,token, userData} = Auth()
    return(
        <UserContext.Provider value={{
            registerUser,
            authorization,
            token,
            loginUser,
            userExist,
            userData
        }}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}