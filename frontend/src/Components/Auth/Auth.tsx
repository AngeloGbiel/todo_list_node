// import { useEffect } from "react";
import { useCallback, useEffect, useState } from "react";
import Api from "../Api/Api";
import { FormEditUser, FormLogin, FormRegister } from "../Types/interface";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [authorization, setAuthorization] = useState<boolean>(false);
  const [userData,setUserData] = useState({})
  const [userExist, setUserExist] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

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

    await Api.post("/register", formData)
      .then(() => {
        authenticate(Cookies.get("token")!);
      })
      .catch((err) => {
        setUserExist(false);
        return err;
      });
  }

  async function loginUser(user: FormLogin) {
    await Api.post("/login", user)
      .then((response) => {
        authenticate(Cookies.get("token")!);
        return response.data;
      })
      .catch((err) => {
        setUserExist(false);
        return err;
      });
  }
  const authenticate = useCallback(async(data: string) => {
    await Api.get("getuser", {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    }).then((response) => {
      setUserData(response.data)
      setAuthorization(true);
      setToken(data);
      setUserExist(true);
      navigate("/todo");
    });
  },[navigate])

  useEffect(()=>{
    if(Cookies.get('token')){
      authenticate(Cookies.get('token')!)
    }
  },[authenticate])

  function logout(){
    navigate('/login')
    alert('Logout realizado')
    setAuthorization(false)
    Cookies.remove('token')
  }

  async function editUser(data:FormEditUser, token: string){
    const UserData: Record<string, string> = {
      // Record<string, string>: Isso é uma anotação de tipo em TypeScript.
      // Indica que UserData é um objeto onde as chaves (propriedades) são
      // strings e os valores associados a essas chaves também são strings.
      // Em outras palavras, UserData é um objeto onde todas as chaves e valores
      // são strings.

      name: data.name,
      image: data.image[0],
    };

    const formData = new FormData();
    Object.keys(UserData).forEach((key) => {
      formData.append(key, UserData[key]);
    });

    await Api.patch('/edit',formData,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(()=>{
      navigate('/todo');
    }).catch((err)=>{
      console.log(err)
    })
  }

  return { registerUser, loginUser, authorization, userExist, token, userData, logout,editUser };
}
