import getToken from "../helper/get-token.js";
import Todo from "../models/Todo.js"
import User from "../models/User.js";

export default class TodoController {
    static async addTask(req,res){
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
    static async allTask(req,res){
        const user = getToken(req.headers.authorization);
        await Todo.findAll({
            where:{UserId: user.id}
        }).then((response)=>{
            res.status(200).send(response)
        }).catch((err)=>{
            response.status(422).send(err)
        })
    }
    static async getTask(req,res){
        const id = req.params.id
        const user = getToken(req.headers.authorization)
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
        }).catch(()=>{
            return res.status(422).json({
                message: "Task Não encontrado"
            })
        })
    }
    static async editTask(req,res){
        const id = req.params.id;
        const user = getToken(req.headers.authorization);
        const newTask = req.body.task
        if(!newTask){
            return res.status(401).json({
                message: "Adcione uma task"
            })
        }
        await Todo.findOne({
            where:{id},
            raw: true
        }).then((response)=>{
            if(response.UserId != user.id){
                return res.status(422).json({
                    message: "Task Não encontrado"
                })
            }
            response.task = newTask
            Todo.update(response, {
                where:{id}
            }).then((response)=>{
                res.status(200).json({
                    message: "Atualizado com sucesso"
                })
            })
        })
    }
    static async priorityTask(req,res){
        const id = req.params.id;
        const user = getToken(req.headers.authorization);
        await Todo.findOne({
            where:{id},
            raw: true
        }).then((response)=>{
            if(response.UserId != user.id){
                return res.status(422).json({
                    message: "Task Não encontrado"
                })
            }
            const CurrentPriority = response.priority
            const newPriority = CurrentPriority == 0 ? 1 : 0 //muda a prioridade
            response.priority = newPriority
            Todo.update(response,{
                where:{id:id}
            }).then(()=>{
                res.status(200).json({
                    message: 'Atualizado com sucesso!'
                })
            })
        })
    }
    static async deleteTask(req,res){
        const id = req.params.id;
        const user = getToken(req.headers.authorization);
        await Todo.findOne({
            where:{id},
            raw: true
        }).then((response)=>{
            if(response.UserId != user.id){
                return res.status(422).json({
                    message: "Task Não encontrado"
                })
            }
            Todo.destroy({
                where:{id:id}
            }).then(()=>{
                res.status(200).json({
                    message: "Task removida com sucesso!"
                })
            })
        }).catch(()=>{
            return res.status(422).json({
                message: "Task Não encontrado"
            })
        })
    }
}