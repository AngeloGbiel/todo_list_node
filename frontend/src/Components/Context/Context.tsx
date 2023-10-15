import { ReactNode, createContext, useState } from "react";
import { ContextType, Itodo } from "../Types/interface";
import Auth from "../Auth/Auth";
import Api from "../Api/Api";

interface ContextProvider {
  children: ReactNode;
}

const UserContext = createContext<ContextType>({} as ContextType);

const UserProvider = ({ children }: ContextProvider) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [id,setId] = useState<number>()
  const [TaskEdit,setTaskEdit] = useState<string>('')
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

  const DeleteTask = async (id: number) => {
    Api.delete(`/todo/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(()=>{
        AllTasks()
    });
  };

  const GetTaskForEdit = async(id:number) =>{
    await Api.get(`/todo/get/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response)=>{
      setTaskEdit(response.data.task)
      setId(response.data.id)
      setEdit(true)
    })
  }

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
        tasks,
        DeleteTask,
        edit,
        TaskEdit,
        GetTaskForEdit,
        id,
        setEdit
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
