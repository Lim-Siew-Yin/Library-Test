import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'



const App = () => {
    return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route exact path="/login"  element={ <Login/> } />
            <Route exact path="/register"  element={ <Register/> } />
            <Route exact path="/dashboard"  element={ <Dashboard/> } />
        </Routes>
        </BrowserRouter>
    </div>
    
)}

export default App