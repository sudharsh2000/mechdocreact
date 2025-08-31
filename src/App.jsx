
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import UserSignup from './Pages/UserSignup'
import Signin from './Pages/Signin'
import UserLogin from './Pages/UserLogin'
import { store } from './Redux/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import Userdetails from './Pages/Userdetails'
import AdminPage from './Pages/AdminPage'
import React, { useEffect, useState } from 'react'
import { adminset } from './Redux/Admin'
import { jwtDecode } from 'jwt-decode'
import { userdecode, userset } from './Redux/User'
import axios from 'axios'
import { refreshtokenapi } from './Redux/api'
import api from './Redux/apiinterceptor'


function App() {
  const user=useSelector(state=>state.counter)
  const dispatch=useDispatch()
  const [loading,setloading]=useState(true)
 
useEffect(()=>{
    const apirefreshfn=async ()=>{
try{

  
 const response= await axios.post(refreshtokenapi,{},{withCredentials:true});

 const accesstoken=response.data.accesstoken;
  
 const decode=jwtDecode(accesstoken)
 console.log('phase2',decode)
      dispatch(userset({
        access:accesstoken,
        username:decode.username,
        id:decode.user_id,
        role:decode.role

      }))
}
catch (Errorval){
  console.error(Errorval)
}
finally{
  setloading(false)
}
    }
  
     apirefreshfn();
  
},[dispatch])
 function SigninFragment({type,CustomComponent}){
    const dispatch=useDispatch();
  React.useEffect(()=>{
    dispatch(adminset(type))
  },[type])
  return <CustomComponent/>
 }
if (loading) return<h4>Loading...</h4>
  return (
    <>
   

  
  
    <BrowserRouter>
    <Routes>
      
      <Route path='/'  element={<Home/>} />
      <Route path='/Signup' element={<SigninFragment type="user" CustomComponent={UserSignup} />}/>
      <Route path='/signin' element={<SigninFragment type="user" CustomComponent={UserLogin} />} />
      <Route path='/profile' element={<Userdetails/>}/>
      <Route path='/admin-signin' element={<SigninFragment type="admin" CustomComponent={UserLogin}/>}/>
     <Route path='/admin-signup' element={<SigninFragment type="admin" CustomComponent={UserSignup} />} />
     <Route path='/admin' element={<AdminPage/>}/>
    </Routes>
    
    </BrowserRouter>
   
 
    </>
  )
}

export default App
