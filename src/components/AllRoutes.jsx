import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Seller from '../pages/Seller'
import Buyer from '../pages/Buyer'
import SellerProductAdd from '../pages/SellerProductAdd'
import Deposit from '../pages/Deposit'
import OrderBuyer from '../pages/OrderBuyer'
import OrderSeller from '../pages/OrderSeller'
const AllRoutes = () => {
  return (
   <Routes>
         <Route path='/' element={<Register/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/seller' element={<Seller/>}/>
         <Route path='/buyer' element={<Buyer/>}/>
         <Route path='/seller/add_product' element={<SellerProductAdd/>}/>
         <Route path='/seller/order' element={<OrderSeller/>}/>
         <Route path='/buyer/deposit' element={<Deposit/>}/>
         <Route path='/buyer/order' element={<OrderBuyer/>}/>

   </Routes>
  )
}

export default AllRoutes