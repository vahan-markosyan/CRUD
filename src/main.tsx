import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { UserList } from './user-list.tsx'
import { AddUser } from './add-user.tsx'
import { User } from './user.tsx'
import { Layout } from './layout.tsx'

const router = createBrowserRouter([
  {
    path:"",
    element:<Layout/>,
    children:[
      {path:"", element:<UserList/>},
      {path:"add", element:<AddUser/>},
      {path:"/user/:id", element:<User/>}
    ]
  },
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)