import styled from "styled-components"
// import * as Gr from 'react-icons/gr'
import * as Md from 'react-icons/md'
import { Itodo } from "../Types/interface"
import { useContext } from "react"
import { UserContext } from "../Context/Context"

const TasksStyled = styled.div`
    display: flex;
    justify-content: center;
    height: 3rem;

    .container{
        background-color: white;
        color: black;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        width: 55%;
        border-radius: 10px;
        background: #FFF;
        padding: 15px;
        p{
            font-size: 1.2rem;
            max-width: 85%; 

        }
        .buttons{
            display: flex;
            gap: 5px;
            font-size: 1.1rem;
            cursor: pointer;
        }
    }
`

interface IItemProps {
    itemList: Itodo
}


export default function Tasks({itemList}:IItemProps){
    const {DeleteTask} = useContext(UserContext)

    return(
        <TasksStyled>
            <div className="container">
                <p>{itemList.task}</p>
                <div className='buttons'>
                    <Md.MdPriorityHigh/>
                    <Md.MdModeEditOutline/>
                    <div onClick={() =>DeleteTask(itemList.id)}>
                        <Md.MdDelete/>
                    </div>
                </div>
            </div>
        </TasksStyled>
    )
}