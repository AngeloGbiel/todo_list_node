import getToken from "../helper/get-token.js";
import Todo from "../models/Todo.js"
import User from "../models/User.js";

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
        await Todo.create(todoTask).then(()=>{
            res.status(200).json({
                message: "Tarefa Adcionada"
            })
        })
    }
    static async getTask(req,res){
        const id = req.params.id
        const user = getToken(req.headers.authorization)
        console.log(user)
        await Todo.findOne({
            where:{id},
            raw: true
        }).then((response)=>{
            if(response.UserId != user.id){
                return res.status(422).json({
                    message: "Task Não encontrado"
                })
            }
            res.status(200).send(response)
        })
    }
}