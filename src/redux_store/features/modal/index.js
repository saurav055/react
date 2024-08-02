import { createSlice } from "@reduxjs/toolkit";

const modalSlice=createSlice({
    name:"modal",
    initialState:{open:false},
    reducers:{
        setModalVisible:(state,action)=>{
            state.open=action.payload
        }
    }
})

export const {setModalVisible}=modalSlice.actions
export default modalSlice.reducer