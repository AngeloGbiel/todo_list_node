import { Router } from "express";
import TodoController from "../controllers/TodoController.js";
import authenticate from "../helper/authenticate.js";

const router = Router()

router.post('/add', authenticate, TodoController.addTodo)
router.get('/all', authenticate,TodoController.allTask)
router.get('/get/:id', authenticate, TodoController.getTask)

export default router;