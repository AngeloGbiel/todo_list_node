import {config} from 'dotenv';
import jwt from 'jsonwebtoken';
config();

const secret = process.env.TOKEN_SECRET

const getToken = (auth) =>{
    const token = auth.split(" ")[1]
    try {
        const UserByToken = jwt.verify(token, secret)
        return UserByToken
    } catch (error) {
        return error
    }
}
export default getToken