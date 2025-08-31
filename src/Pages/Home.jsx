import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import RowItem from '../Components/RowItem/RowItem'
import './Home.css'


function Home() {
  
  return (
   
    <div>
        <Navbar/>
        <div className='home-view'>
          <RowItem/>
           <RowItem/>
        </div>
    </div>
  )
}

export default Home