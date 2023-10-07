import { Router } from "express";
import UserController from '../controllers/UserController.js'
import ImageUpload from "../helper/image-upload.js";
import authenticate from "../helper/authenticate.js";

const router = Router()

router.post('/register', ImageUpload.single('image'), UserController.register)
router.post('/login', UserController.login)
router.get('/getuser', UserController.getUser)
router.patch('/edit', authenticate, ImageUpload.single('image'), UserController.editUser)


export default router;