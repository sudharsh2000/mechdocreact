import React, { useState } from 'react'
import './Navbar.css'
import mechdoc from '/src/assets/mechdoc.png'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/User';
import { setSearch } from '../../Redux/Admin';
import { homeapi } from '../../Redux/api';
import api from '../../Redux/apiinterceptor';
function Navbar() {
  const navigate=useNavigate();
  
  const {username,role}=useSelector(state=>state.counter)
  
  const dispatch=useDispatch();
  const [search,searchvalue]=useState('');
 async function Logout(){

  const response=  await api.post(`http://127.0.0.1:8000/logout/`)
  console.log('response is',response)
dispatch(logout());
  
  navigate('/signin');
 }
  return (
    <div className='navbar-main'>
        <div className='logo-search'>
            <img onClick={()=>navigate('/')} className='logo-image' src={mechdoc} alt='mechdoc' />
            <div className='search-div'>
            <input className='navbar-search' value={search} onChange={(e)=>searchvalue(e.target.value)} placeholder='Search Products,Brands and More'/>
            <i className="fa fa-search" onClick={()=>dispatch(setSearch({search}))}></i>
            </div>
        </div>
  {username?
 <div className='items-div'>
   
    <div className='items'>
      {role=='admin'?
    <button onClick={()=>navigate("/Signup")}> Add user +</button>

  :
    <button onClick={()=>navigate('/profile')}> My Account</button>
  
}
<button onClick={()=>{
Logout();
}}>Logout</button>
</div>
  
  </div>
  :
  <div>
    <button onClick={()=>navigate('/signin')}> Login</button>
  </div>}
  
    </div>
  )
}

export default Navbar