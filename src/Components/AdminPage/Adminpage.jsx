import React, { useEffect, useState } from 'react'
import './Adminpage.css'
import axios from 'axios'
import  {  usersapi } from '../../Redux/api'
import { useSelector } from 'react-redux'
import api from '../../Redux/apiinterceptor'
function Adminpage() {
 
const [users,setusers]=useState([])
const [editid,setEditid]=useState()

const [name,setname]=useState('')
const [mobile,setmobile]=useState('')
const search=useSelector(state=>state.admincounter.searchvalue)
  useEffect(()=>{
   const apirun= async()=>{  
    try{
      console.log(search)
      let response;
      if(search){
        
       response=await api.get(`${usersapi}?uname=${search.search}`)
       
      }
      else{
       
       response=await api.get(usersapi)
      
      }
      
      console.log(response.data)
      setusers(response.data)
    }
    catch(errors){
     console.error(errors);
    }
  }
    apirun();
  },[search,editid]);


  const deleteuser=(id)=>{
    const deleteapi=async ()=>{

    
    try{
    const response= await api.delete(`${usersapi}${id}/`)
    console.log('response is ',response.data)
      setusers(prevuser=>{
     return   prevuser.filter(curuser=>curuser.id!==id)
      })
    }
    catch (er){
      console.error('delete error ')

    }
    }
    deleteapi();
  }
  const SaveUser=async (id)=>{
    let updatedata={}
    if (name){
     
        updatedata.username=name
      
      }
       if (mobile){
        updatedata.mobile=mobile
      }
       
      try{
          const status=await api.patch(`${usersapi}${editid}/`,updatedata)
          console.log(status.data)
          setEditid(null)
      }
      catch(e){
        console.error(e)
      }
    }
  
  return (
    <div className='admin-container'>
        
           {users&& users.map((user)=>{
    return <div className="admin-list" key={user.id}>
            <div className="input-container">
              <input className={`Username-input ${editid==user.id?'edit':'noedit'}` } onChange={(e)=>setname(e.target.value)}
               value={editid===user.id&&name?name:user.username}/>
             
            </div>
         
            <div className="input-container">
              <input className={`Username-input ${editid==user.id?'edit':'noedit'}` } onChange={(e)=>setmobile(e.target.value)}
               value={editid===user.id&&mobile?mobile:user.mobile}/>
             
            </div>
            
              {user.id==editid?
              <div className="btn-container">
                <button className='btn-save' onClick={()=>SaveUser(user.user_id)}>Save</button>
              <button className='btn-clear' onClick={()=>setEditid(null)}>Clear</button>
              </div>
              
              :
              <div className="btn-container">
              <button className='btn-edit' onClick={()=>setEditid(user.id)}>Edit</button>
              
              
              <button className='btn-delete' onClick={()=>{
                
                deleteuser(user.id);
                }}>Delete</button>
              </div>
           }
        </div>
           })}
       
        
        
    </div>
  )
}

export default Adminpage