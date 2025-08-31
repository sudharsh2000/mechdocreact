import React, { useEffect } from 'react'
import Signup from '../Components/Signup/Signup'
import Navbar from '../Components/Navbar/Navbar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function UserSignup() {
  const admin=useSelector(state=>state.counter.role)
  const adminname=useSelector((state)=>state.admincounter.name)
  const navigate=useNavigate()
  useEffect(()=>{
    
    if(admin==='user'){
      navigate('/')
    }
   
    // else{
    //   navigate('/')
    // }
  })
  return (
    <>
    <Navbar/>
    <Signup/>
    </>
  )
}

export default UserSignup