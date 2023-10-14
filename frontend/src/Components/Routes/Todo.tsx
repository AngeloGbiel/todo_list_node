import styled from "styled-components";
import Form from "../Todo/Form";

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
export default function EditUserTodo(){
    return(
        <TodoSyled>
            <h2>Todo List</h2>
            <Form/>
        </TodoSyled>
    )
}