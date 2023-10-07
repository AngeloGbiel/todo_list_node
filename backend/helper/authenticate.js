import jwt from "jsonwebtoken"
import getToken from "./get-token.js"

const secret = process.env.TOKEN_SECRET

const authenticate = (req,res,next) => {
    const authToken = req.headers.authorization
    if(!authToken){
        return res.status(401).json({
            message: "Token is missing!!"
        })
    }
    const [, token] = authToken.split(' ');
    try{
        jwt.verify(token, secret)
        next()
    } catch{
        return res.status(401).json({
            message: 'Token invalid!'
        })
    }
}

export default authenticate;
