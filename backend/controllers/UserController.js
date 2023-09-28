import createToken from "../helper/create-token.js";
import User from "../models/User.js";
import { hash, genSalt, compare } from "bcrypt";

export default class UserController{
    static async register(req,res){
        const {name,email,password} = req.body;
        let image = ''
        if(!name){
            return res.status(422).json({
                message: 'Name is mandatory!!'
            })
        }
        if(!email){
            return res.status(422).json({
                message: 'email is mandatory!!'
            })
        }
        if(!password){
            return res.status(422).json({
                message: 'Password is mandatory!!'
            })
        }
        req.file && (image = req.file.filename);
        //cheacar se o usuário ja existe através do email
        const checkUserExist = await User.findOne({
            where: {email:email}
        })
        if(checkUserExist){
            return res.status(422).json({
                message: 'Use another email, please!'
            })
        }

        //create a password security
        const salt = await genSalt(12)
        const passwordHash = await hash(password, salt)

        const user = {
            name,
            email,
            password: passwordHash,
            image: image ? image : null
        }
        await User.create(user).then((response)=>{
            createToken(response,res)
        })
    }
    static async login(req,res){
        const {email, password} = req.body
        
        //valida se o usuário preencheu os campos
        if(!email){
            return res.status(422).json({
                message: 'email is mandatory!!'
            })
        }
        if(!password){
            return res.status(422).json({
                message: 'Password is mandatory!!'
            })
        }
        const checkUserExist = await User.findOne({
            where:{email}
        })
        //valida se o usuário existe
        if(!checkUserExist){
            return res.status(422).json({
                message: 'Email or password incorrect'
            })
        }
        //comparar as senhas
        const checkPassword = await compare(password, checkUserExist.password)
        if(!checkPassword || !checkUserExist){
            return res.status(422).json({
                message: 'Email or password incorrect'
            })
        }
        createToken(checkUserExist, res)
    }
}