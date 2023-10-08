import { Router } from "express";
import TodoController from "../controllers/TodoController.js";
import authenticate from "../helper/authenticate.js";

const router = Router()

router.post('/add', authenticate, TodoController.addTask)
router.get('/all', authenticate,TodoController.allTask)
router.get('/get/:id', authenticate, TodoController.getTask)
router.patch('/edit/:id', authenticate, TodoController.editTask)
router.patch('/priority/:id', authenticate, TodoController.priorityTask)
router.delete('/delete/:id', authenticate, TodoController.deleteTask)

export default router;