import { ReactNode, createContext, useState } from "react";
import { ContextType, Itodo } from "../Types/interface";
import Auth from "../Auth/Auth";
import Api from "../Api/Api";
import { useNavigate } from "react-router-dom";

interface ContextProvider {
  children: ReactNode;
}

const UserContext = createContext<ContextType>({} as ContextType);

const UserProvider = ({ children }: ContextProvider) => {
  const navigate = useNavigate()
  const [search,setSearch] = useState<string>('')
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
        setEdit(false)
    });
  };

  const GetTaskForEdit = async(id:number) =>{
    await Api.get(`/todo/get/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response)=>{
      setTaskEdit(response.data.task)
      navigate('/todo')
      setId(response.data.id)
      setEdit(true)
    })
  }

  const SetPriority = async(id:number)=>{
    console.log(token,'\n', id)
    Api.patch(`/todo/priority/${id}`,id,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(()=>{
      setEdit(false)
      AllTasks()
    }).catch((err)=>{
      console.log(err)
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
        setEdit,
        SetPriority,
        setSearch,
        search
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
