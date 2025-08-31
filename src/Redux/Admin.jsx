import { createSlice } from "@reduxjs/toolkit"

const initialState={
    usertype:'',
    searchvalue:'',
    admin:localStorage.getItem('admin')||''

}
const adminreducer=createSlice(
    {
        name:'adminreducer',
        initialState,
        reducers:{
            adminset:(state,action)=>{
                state.usertype=action.payload
            },
            setSearch:(state,action)=>{
                state.searchvalue=action.payload
            },
            adminnameset:(state,action)=>{
                state.admin=action.payload;
            }
        }
    }
);
export default adminreducer.reducer;
export const {adminset,setSearch,adminnameset}=adminreducer.actions