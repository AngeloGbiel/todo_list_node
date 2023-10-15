import { ReactNode, createContext, useState } from "react";
import { ContextType, Itodo } from "../Types/interface";
import Auth from "../Auth/Auth";
import Api from "../Api/Api";

interface ContextProvider {
  children: ReactNode;
}

const UserContext = createContext<ContextType>({} as ContextType);

const UserProvider = ({ children }: ContextProvider) => {
  const [tasks, setTasks] = useState<Itodo[]>([]);
  const {
    registerUser,
    loginUser,
    authorization,
    userExist,
    token,
    userData,
    logout,
    editUser,
  } = Auth();

  const AllTasks = () => {
    Api.get("/todo/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setTasks(response.data);
    });
  };

  return (
    <UserContext.Provider
      value={{
        registerUser,
        authorization,
        token,
        loginUser,
        userExist,
        userData,
        logout,
        editUser,
        AllTasks,
        tasks
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
