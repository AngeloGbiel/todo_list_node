import { ReactNode, createContext, useEffect, useState} from "react";
import { FormLogin, FormRegister } from "../Types/Register";
import Auth from '../Auth/Auth'
import Api from "../Api/Api";
// import Api from "../Api/Api";

interface ContextProvider {
    children: ReactNode
}
interface ContextType {
    registerUser: (user:FormRegister) => void,
    loginUser: (user: FormLogin) => void,
    token: string,
    authorization: boolean
}

const UserContext = createContext<ContextType>({} as ContextType)

const UserProvider = ({children}:ContextProvider) =>{
    const [authorization, setAuthorization] = useState<boolean>(false)
    const {registerUser,loginUser,token} = Auth()
    useEffect(()=>{
        if(token){
            Api.get('getuser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(()=>{
                setAuthorization(true)
            }).catch((err)=>{
                setAuthorization(false)
                return err
            })
        }
    },[token])
    return(
        <UserContext.Provider value={{
            registerUser,
            loginUser,
            token,
            authorization
        }}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}