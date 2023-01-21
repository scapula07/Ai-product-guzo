import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardRoutes from './components/dashboard/DashboardRoutes'
import UserRoutes from './components/user/UserRoutes'

const Main = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/dashboard/*' element={
            <DashboardRoutes/>
        }  />
         <Route path='/user/*' element={
            <UserRoutes/>
        }  />
    </Routes>
    </BrowserRouter>
  )
}

export default Main