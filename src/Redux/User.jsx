import { createSlice } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"

const initialState={
    access:null,
    username:null,
    userid:null,
    role:null,
    is_authenticated:false
}
const userreducer=createSlice({
    name:'usercounter',
    initialState,
    reducers:{
        
       userset: (state,action)=>{
        state.username=action.payload.username
        state.userid=action.payload.id
        state.role=action.payload.role
        state.is_authenticated=true,
        state.access=action.payload.access
         },
    logout:(state)=>{
        state.username=null
        state.userid=null
        state.role=null
        state.is_authenticated=false
    },
    

}
})
export default userreducer.reducer;
export const {userset,logout}=userreducer.actions
export const userdecode=()=>(dispatch)=>{
    const access=localStorage.getItem('access');
    if(access){

    
    const decode=jwtDecode(access)
          console.log(decode)
           
           dispatch(userset({
             username:decode.username,
             userid:decode.user_id,
             role:decode.role
           }))
        }
}