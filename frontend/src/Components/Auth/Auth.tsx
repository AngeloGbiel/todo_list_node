import Api from "../Api/Api";
import { FormRegister } from "../Types/Register";

export default function Auth(){
    async function registerUser(user:FormRegister){
        await Api.post('/register',user).then((response)=>{
            return response.data
        }).catch((err)=>{
            return err
        })
    }
    return {registerUser}
}