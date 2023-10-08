import getToken from "../helper/get-token.js";
import Todo from "../models/Todo.js"

export default class TodoController {
    static async addTodo(req,res){
        const task = req.body.task;
        const priority = false;
        const user = getToken(req.headers.authorization)

        if(!task){
            return res.status(401).json({
                message: "Adcione uma task"
            })
        }

        const todoTask = {
            task,
            priority,
            UserId: user.id
        }
        Todo.create(todoTask).then(()=>{
            res.status(200).json({
                message: "Tarefa Adcionada"
            })
        })
    }
}