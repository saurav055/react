import { createSlice } from "@reduxjs/toolkit";

const onlineSlice=createSlice({
    name:"onlineUSers",
    initialState:{
        list:[]
    },
    reducers:{
        setOnlineUserData:(state,action)=>{
            state.list=action.payload
        }
    }
})

export const {setOnlineUserData}=onlineSlice.actions
export default onlineSlice.reducer