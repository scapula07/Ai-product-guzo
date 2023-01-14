import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardRoutes from './components/dashboard/DashboardRoutes'

const Main = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/dashboard/*' element={
            <DashboardRoutes/>
        }  />
    </Routes>
    </BrowserRouter>
  )
}

export default Main