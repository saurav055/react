import { createSlice } from "@reduxjs/toolkit";

const initialState={
    authorize:false,
    user:null,
    token:null,
}

const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setAuthorize:(state,action)=>{
            state.authorize=action.payload.authorize
            state.user=action.payload.user
            state.token=action.payload.token
        },
        setUserData:(state,action)=>{
            state.user=action.payload.user
        },
        logout:(state,action)=>{
            return initialState
        }
    }
})

export const {setAuthorize,setUserData,logout}=authSlice.actions

export default authSlice.reducer