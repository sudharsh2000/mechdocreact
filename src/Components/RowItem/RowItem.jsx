import React, { useEffect, useState } from 'react'
import mechdoc from '/src/assets/mechdoc.png'
import './RowItem.css'
import axios from 'axios'
import  {  homeapi, refreshtokenapi } from '../../Redux/api'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../Redux/apiinterceptor'
function RowItem() {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const [items,setItems]=useState([])
  const user=useSelector(state=>state.counter)
   
useEffect( ()=>{
  async function  apirun(){

 
  
  try{
  const response= await api.get(`${homeapi}products`,
    { withCredentials:true }
  )
  

setItems(response.data)
}
  catch(e){
    console.error(e)
       }
  

  }
 
  
setItems([])
  apirun();
},[])

  return (
    <div className='main-container'>
      <h3>Selected For You</h3>
      <div className='card-container'>
      {items&& items.map((item)=>{
       return <div key={item.productid} className='cards' >
            <img src={item.image} />
            <label>{item.productname}</label>
            <h4> {item.price}</h4>
        </div>
      })}
      
        </div>
    </div>
  )
}

export default RowItem