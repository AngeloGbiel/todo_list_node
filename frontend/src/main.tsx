import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './Components/Routes/SignUp.tsx'
import SignIn from './Components/Routes/SignIn.tsx'
import RouterPrivateTodo from './Components/Auth/RouterPrivateTodo.tsx'
import NotFoundPage from './Components/Routes/404.tsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: '/register',
        element: <SignUp/> 
      },
      {
        path: '/login',
        element: <SignIn/> 
      },
      {
        path: '/todo',
        element: <RouterPrivateTodo/> 
      },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
