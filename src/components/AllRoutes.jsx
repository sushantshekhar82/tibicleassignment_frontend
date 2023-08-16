import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Seller from '../pages/Seller'
import Buyer from '../pages/Buyer'
const AllRoutes = () => {
  return (
   <Routes>
         <Route path='/' element={<Register/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/seller' element={<Seller/>}/>
         <Route path='/buyer' element={<Buyer/>}/>
   </Routes>
  )
}

export default AllRoutes