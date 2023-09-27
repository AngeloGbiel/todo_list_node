import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()

const secret = process.env.TOKEN_SECRET

const createToken = (user,res) =>{
    const subject = String(user.id)

    //create token
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, secret,{
        subject: subject,
        expiresIn: "1h"
    })
    res.cookie( //armazena o token no cookie
        'token',token, {maxAge: 3600000}
    ).json({
        message: "Você está autenticado"
    })
}
export default createToken;