import { ReactNode, createContext } from "react";

interface ContextProvider {
    children: ReactNode
}

const UserContext = createContext({})

const UserProvider = ({children}:ContextProvider) =>{
    return(
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}