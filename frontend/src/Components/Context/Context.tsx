import { ReactNode, createContext,} from "react";
import { FormLogin, FormRegister } from "../Types/Register";
import Auth from '../Auth/Auth'

interface ContextProvider {
    children: ReactNode
}
interface ContextType {
    registerUser: (user:FormRegister) => void,
    authorization: boolean,
    token: string,
    loginUser: (user: FormLogin) => void,
    userExist: boolean
}

const UserContext = createContext<ContextType>({} as ContextType)

const UserProvider = ({children}:ContextProvider) =>{
    const {registerUser,loginUser, authorization, userExist,token} = Auth()
   
    

    return(
        <UserContext.Provider value={{
            registerUser,
            authorization,
            token,
            loginUser,
            userExist
        }}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}