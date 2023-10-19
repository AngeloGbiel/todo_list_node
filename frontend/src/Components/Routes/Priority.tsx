import styled from "styled-components";
import Tasks from "../Todo/Tasks";
import { useContext, useEffect } from "react";
import { UserContext } from "../Context/Context";
import { Itodo } from "../Types/interface";
import SearchPriority from "../Todo/SearchPriority";

const TodoSyled = styled.div`
    width: calc(100% - 20rem);
    position: absolute;
    right: 0;
    h2{
        text-align: center;
        font-family: 'Mr Dafoe', cursive;
        font-size: 3.5rem;
        font-weight: 100;
        margin: 10px 0 10px 0;
    }
`

type UserContextType = {
    AllTasks: () => void;
    tasks: Itodo[]; // Substitua 'any' pelo tipo de dados esperado em tasks,
    search: string
    setSearch: (search:string) => void
};

export default function EditUserTodo(){
    const {AllTasks, tasks, search,setSearch} = useContext(UserContext) as UserContextType;
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(()=>{
        AllTasks()
        setSearch('')
    },[])
    /* eslint-disable react-hooks/exhaustive-deps */

    return(
        <TodoSyled>
            <h2>Priority</h2>
            <SearchPriority/>
            {
                tasks.filter((value)=>{
                    return value.priority == true
                }).filter((value)=>{
                    const taskNormalized = value.task.toLowerCase()
                    return taskNormalized.includes(search)
                }).map((value,i)=>{
                   return(
                    <div key={i}>
                        <Tasks itemList = {value}/>
                    </div>
                   )
                })
            }
        </TodoSyled>
    )
}