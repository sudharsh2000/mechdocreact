import React, { useEffect, useState } from 'react'
import { use } from 'react'
import './Login.css'
import axios from 'axios'
import { gettokenapi, loginapi } from '../../Redux/api'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { userset } from '../../Redux/User'
import { adminnameset } from '../../Redux/Admin'
import { jwtDecode } from 'jwt-decode'
function Login() {
  axios.defaults.withCredentials=true;
  const usertype=useSelector((state)=>state.admincounter.usertype);
  const accessvalue=useSelector((state)=>state.counter.access);
 
  const [uname,Setname]=useState('')
  const [upassword,setpassword]=useState('')
 const [nouser,setnoUser]=useState('')
  const [error,setError]=useState({
    name:'',
    password:''
    
  })

  const navigate=useNavigate()
const dispatch=useDispatch();

  useEffect(()=>{
    const access=localStorage.getItem('access');
 
  })
 async function SignInfn(){

 
    const payload={
      username:uname,
      password:upassword,
      role:usertype
    }
    if(validationfu()){
      try{
    const response= await axios.post(loginapi,payload,
      {withCredentials:true})
    
      const accesstok=response.data.accesstoken;
      console.log(accesstok)
       const decode=jwtDecode(accesstok)
             dispatch(userset({
              access:accesstok,
               username:decode.username,
               id:decode.user_id,
               role:decode.role
       
             }))
        
        console.log('access',accesstok)
       
        if(usertype==='user'){
          navigate("/")
        }
        else{
          navigate("/admin")
        }
      
      
   
    }catch(exc){
      setnoUser('Invalid Username or Password')
    }}
    
  }
  function validationfu(){
let check=true;
const newerror={name:'',password:''}


    if(uname===''){
      
        newerror.name='Name Is empty'
      
      check=false;
    }
    if(upassword===''){
      newerror.password='Password Is empty'
      
      check=false;
    }
   
    
    setError(newerror)

    return check;

  }

  return (
    <div className="signup-home">
    <div className='user-form'>
      <h2>{usertype} Log In</h2>
        <input className='input-username' placeholder='User Name' value={uname}
         onChange={(e)=>{
          Setname(e.target.value);
          setError({...error,name:''})

        }}  />
        <label>{error.name}</label>
         <input className='input-password' type="password" placeholder='Password' value={upassword}
         onChange={(e)=>{
          setpassword(e.target.value);
          setError({...error,password:''})

        }} />
        <label>{error.password&& error.password}</label>
       <label>{nouser&& nouser}</label>
        <button className='signup-btn' onClick={SignInfn}>Signup</button>
        
    </div>
    </div>
  )
}

export default Login