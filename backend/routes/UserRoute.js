import { Router } from "express";
import UserController from '../controllers/UserController.js'
import ImageUpload from "../helper/image-upload.js";

const router = Router()

router.post('/register', ImageUpload.single('image'), UserController.register)
router.post('/login', UserController.login)


export default router;