import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/login";
import Services from "./pages/Services";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterMaid from './pages/RegisterPortal.jsx'



const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {path:"/",element:<Home/>},
      {path:"/contact",element:<Contact/>},
      {path:"/about",element:<About/>},
      {path:"/login",element:<Login/>},
      {path:"/services",element:<Services/>},
      {path:"/register",element:<RegisterMaid/>},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
