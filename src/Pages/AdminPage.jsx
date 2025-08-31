import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Adminpage from '../Components/AdminPage/Adminpage'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { adminset } from '../Redux/Admin'
import { loginapi, logoutapi } from '../Redux/api'
import api from '../Redux/apiinterceptor'

function AdminPage() {
const admin=useSelector(state=>state.counter)
const dispatch=useDispatch()
const navigate=useNavigate()
const [loading,setloading]=useState(true)
useEffect(()=>{
  const logoutapifn=async ()=>{


     if(admin.role && admin.role!=='admin'){
      
      try{
         const response= await api.post(logoutapi)
         console.log(response.data.message)

      }
      catch (Errorval){

console.log(Errorval)
      }
      


   dispatch(adminset('admin'))
    navigate('/admin-signin')

  }
  }
 
  logoutapifn();
  
},[navigate,admin])

  return (
    <div>
        <Navbar/>
        <Adminpage/>
    </div>
  )
}

export default AdminPage