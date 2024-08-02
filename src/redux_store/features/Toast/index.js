import { createSlice } from "@reduxjs/toolkit";

const initialState={
    open:false,
    message:"",
    type:"success"
}
const toastSlice=createSlice({
    name:"toast",
    initialState:initialState,
    reducers:{
        setToastOpen:(state,action)=>{
            state.open=action.payload.open
            state.message=action.payload.message
            if(action.payload?.type){
                state.type=action.payload.type
            }
        },
        setToastClose:(state,action)=>{
            return initialState
        }
    }
})

export const {setToastClose,setToastOpen}=toastSlice.actions
export default toastSlice.reducer