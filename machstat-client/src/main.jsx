import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Login from './auth/login/Login'
import Register from './auth/register/Register'
import './index.css'
import AuthenticatedLayout from './_containers/authenticated-layout'
import { AuthProvider } from './_contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <AuthProvider>
        <AuthenticatedLayout>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </AuthenticatedLayout>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
