import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import './index.css'
import Home from './routes/Home/Home.jsx'
import Formulario from './routes/Formulario.jsx'
import FormTransferencia from './routes/FormTransferencia.jsx'
import Transferencias from './routes/Transferencias.jsx'

// const API_URL = 'http://localhost:8080'

const router = createBrowserRouter([
  
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/new",
        element: <Formulario />
      },
      {
        path: "/transferencias/:id",
        element: <Transferencias />
      },
      {
        path: "/newTransferencia/:id",
        element: <FormTransferencia />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
