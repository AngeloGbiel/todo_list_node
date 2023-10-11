import { useContext } from "react";
import Api from "../Api/Api";
import { FormRegister,FormLogin } from "../Types/Register";
import Cookies from "js-cookie";
import { UserContext } from "../Context/Context";

export default function Auth() {
  const {setToken} = useContext(UserContext)
  async function registerUser(user: FormRegister) {
    const UserData: Record<string, string> = {
      // Record<string, string>: Isso é uma anotação de tipo em TypeScript.
      // Indica que UserData é um objeto onde as chaves (propriedades) são
      // strings e os valores associados a essas chaves também são strings.
      // Em outras palavras, UserData é um objeto onde todas as chaves e valores
      // são strings.

      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image[0],
    };

    const formData = new FormData();
    Object.keys(UserData).forEach((key) => {
      formData.append(key, UserData[key]);
    });

    await Api.post('/register',formData).then((response)=>{
        return response.data
    }).catch((err)=>{
        return err
    })
  }

  async function loginUser(user: FormLogin){
    console.log(user)
    await Api.post('/login', user).then(()=>{
        setToken(Cookies.get('token')!)
    }).catch((err)=>{
        return err
    })
  }
  return { registerUser,loginUser };
}
