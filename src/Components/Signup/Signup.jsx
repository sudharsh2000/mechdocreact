import React, { useState } from 'react'
import { use } from 'react'
import './Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { signupapi } from '../../Redux/api'
import { useSelector } from 'react-redux'
import api from '../../Redux/apiinterceptor'
function Signup() {
  const {usertype}=useSelector((state)=>state.admincounter)
  const role=useSelector((state)=>state.counter.role)

  

  const [name,Setname]=useState('')
  const [password,setpassword]=useState('')
  const [cpass,setCpass]=useState('')
  const [mobile,setmobile]=useState('')
  const [otp,setotp]=useState('')
  const [error,setError]=useState({
    name:'',
    password:'',
    cpass:'',
    mobile:''
  })

  const naigate=useNavigate()
  function Register(){
    if(validationfu()){
      
      const insertdata={
        username:name,
          password:password,
        mobile:mobile,
        role:usertype
      }

    try{
      api.post(signupapi,insertdata,{
  headers: { "Content-Type": "application/json" }
})
      .then((e)=>{
        if(role && role==='admin'){
        naigate('/admin')
          }
          else{
        if(usertype=='user'){
          naigate('/signin')
        
        }
        else{
          
          naigate('/admin-signin')
        }
      }
        })
      .catch((e)=>console.log(e))
     
    }
    catch(e){
      console.log(e)
      
    }
      
    }
  }
  function validationfu(){
    
let check=true;
const newerror={name:'',password:'',cpass:'',mobile:''}
const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

    if(name===''){
      
        newerror.name='Name Is empty'
      
      check=false;
    }
    if(password===''){
      newerror.password='Password Is empty'
      
      check=false;
    }
    else if(password.length<8){
      newerror.password='Password length should minimum 8 character '
      
      check=false;
    }
    else if(!pattern.test(password)){
      newerror.password='Password length mixture of number,Letter,Special character '
      
      check=false;
    }
    if(cpass===''){
      newerror.cpass='Confirm Password Is empty'
      
      check=false;
    }
    else if(cpass!==password){
      newerror.cpass='Password missmatch'
      
      check=false;
    }
    if(mobile==''){
      newerror.mobile='mobile number Is empty'
      
      check=false;
    }
    else if(mobile.length!==10){
      newerror.mobile='mobile number should minimum 10 character '
      
      check=false;
    }
    setError(newerror)

    return check;

  }

  return (
    <div className="signup-home">
    <div className='user-form'>
      <h2>{usertype} Sign Up</h2>
        <input className='input-username' placeholder='User Name' value={name}
         onChange={(e)=>{
          Setname(e.target.value);
          setError({...error,name:''})

        }} />
        <label>{error.name}</label>
         <input className='input-password' placeholder='Password' value={password}
         onChange={(e)=>{
          setpassword(e.target.value);
          setError({...error,password:''})

        }} />
        <label>{error.password&& error.password}</label>
         <input className='input-cpass' placeholder='Confirm Password' value={cpass}
         onChange={(e)=>{
          setCpass(e.target.value);
          setError({...error,cpass:''})

        }} />
        <label>{error.cpass&& error.cpass}</label>
         <input className='input-mobile' placeholder='Mobile Number' value={mobile}
         onChange={(e)=>{
          setmobile(e.target.value);
          setError({...error,mobile:''})

        }} />
        <label>{error.mobile}</label>
        <button className='signup-btn' onClick={Register}>Signup</button>
        
    </div>
    </div>
  )
}

export default Signup