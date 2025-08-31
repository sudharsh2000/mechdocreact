import React, { useState,useEffect } from 'react'
import './userdetail.css'
import axios from 'axios';
import profile from '../../assets/profile.png'
import { userbyidapi, usersapi } from '../../Redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { userset } from '../../Redux/User';
import api from '../../Redux/apiinterceptor';
function Userdetail() {
  const [users,setusers]=useState('')
  const [proimage,setproimage]=useState(null)
  const [username,setUsername]=useState('')
  const [mobile,setmobile]=useState('')
const user=useSelector(state=>state.counter);
const navigate=useNavigate()
const access=localStorage.getItem('access');
console.log(user)
const dispatch=useDispatch()
  useEffect(()=>{
   const apirun= async()=>{  
    try{
      
        
     const  response=await api.get(`${userbyidapi}?uid=${user.userid}`)
       
      const userdata=response?.data[0]
      
      
   
     setusers(userdata)
      setUsername(userdata.username);
      setmobile(userdata.mobile)
    }
    catch(errors){
     console.error(errors);
    }
  }

 apirun();
  
   
  },[user.userid]);

  const Editdata=async ()=>{
    try{
      if(username && mobile){
      const response= await api.patch(`${userbyidapi}${user.userid}/`,{
  username:username,
    mobile:mobile
      }
    
    )
    const editreturns=response.data
    console.log(editreturns)
    dispatch(userset({
      access:editreturns.access,
      username:editreturns.username,
      userid:editreturns.id ,
      role:editreturns.role,

    }))
   
      navigate('/profile')
    }
    if(proimage){
      const formdata=new FormData()
      formdata.append("profileimage",proimage);
      const response= await api.patch(`${userbyidapi}${user.userid}/`,formdata,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
    
    )
    const editreturns=response.data
    console.log(editreturns)
    dispatch(userset({
      access:editreturns.access,
      username:editreturns.username,
      userid:editreturns.id ,
      role:editreturns.role,

    }))
   
      navigate('/profile')
    }
  }
    catch(e){
console.error('invalid patch'+e)
    }
  }
  return (
    <div className='main-card'>
        <div className="card1">
  <label htmlFor="file-input" className="profile-label">
    <img
      src={users.profileimage ? users.profileimage : profile}
      alt="Profile"
      className="profile-img"
    />
  </label>
  <input
    id="file-input"
    type="file"
    accept="image/*"
    onChange={(e) =>{
setproimage( e.target.files[0]);

    } }
    className="file-input"
  />
</div>
 
        <div className="card2">
            <img />
        <div className="inputcontainer">
            <label>Username </label>
            <input placeholder='Username' value={username} onChange={(val)=>setUsername(val.target.value)}/>
        </div>
             
        <div className="inputcontainer">
            <label>Mobile number</label>
            <input placeholder='Mobile' value={mobile} onChange={(val)=>setmobile(val.target.value)}/>
        </div>
        </div>
        <div className="card3">
          <button onClick={()=>Editdata()}>Submit</button>
        </div>

    </div>
  )
}

export default Userdetail