import { Outlet } from "react-router-dom"
import { CSSreset } from "./Components/CSSreset"
import NavBar from "./Components/NavBar"
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { UserProvider } from "./Components/Context/Context"

export default function App(){
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(()=>{
    if(location.pathname == "/"){ //impede o usuário ir para a raiz do site
      navigate('/register')
    }
  },[navigate, location.pathname])

  return(
    <UserProvider>
      <div style={{display:"flex"}}>
        <CSSreset/>
        <NavBar/>
        <Outlet/>
      </div>
    </UserProvider>
  )
}