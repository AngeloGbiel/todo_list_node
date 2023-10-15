import styled from "styled-components";
import Form from "../Todo/Form";
import Tasks from "../Todo/Tasks";
import { useContext, useEffect } from "react";
import { UserContext } from "../Context/Context";
import { Itodo } from "../Types/interface";

const TodoSyled = styled.div`
    width: calc(100% - 20rem);
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
    tasks: Itodo[]; // Substitua 'any' pelo tipo de dados esperado em tasks
};

export default function EditUserTodo(){
    const {AllTasks, tasks} = useContext(UserContext) as UserContextType;
    useEffect(()=>{
        AllTasks()
    },[])

    return(
        <TodoSyled>
            <h2>Todo List</h2>
            <Form/>
            {
                tasks.map((value,i)=>{
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