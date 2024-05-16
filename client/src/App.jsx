import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './index.css'
import Home from './pages/Home'
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm'
import Dahsboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext';
function App() {


  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/login',
      element:<LoginForm />
    },
    {
      path:'/register',
      element:<RegisterForm/>
    },
    {
      path:'/dashboard',
      element:<Dahsboard/>
    },

    
  ])
  return (
    
     <AuthProvider>
        <RouterProvider router={router}/>
     </AuthProvider>
     
  )
}

export default App