import React from 'react'
import StationListing from './StationListing'
import StationCreate from './StationCreate';
import StationDetail from './StationDetail';
import StationEdit from './StationEdit';
import EmployeesListing from './components/EmployeesListing';
import EmployeesCreate from './components/EmployeesCreate';
import EmployeesEdit from './components/EmployeesEdit';
import ProductCreate from './components/ProductCreate';
import Service from './components/Service';
import DeviceEdit from './DeviceEdit';
import { BrowserRouter, Route, Routes,useLocation } from 'react-router-dom'

import {AnimatePresence} from 'framer-motion'

function AnimatedRoutes() {
const location=useLocation();

  return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
            <Route path='/' element={<StationListing />}></Route>
            <Route path='/employee/create' element={<StationCreate />}></Route>
            <Route path='/employee/detail/:empid' element={<StationDetail />}></Route>
            <Route path='/employee/edit/:empid' element={<StationEdit />}></Route>
            <Route path='/Employees' element={<EmployeesListing />}></Route>
            <Route path='/Employees/employee/create' element={<EmployeesCreate />}></Route>
            <Route path='/Employees/edit/:empid' element={<EmployeesEdit />}></Route>
            <Route path='/employee/detail/:empid/product/create' element={<ProductCreate />}></Route>
            <Route path='/employee/detail/:empid/services' element={<Service />}></Route>
            <Route path='/device/edit/:empid' element={<DeviceEdit />}></Route>



            

            </Routes>
        </AnimatePresence>
       
  )
}

export default AnimatedRoutes
