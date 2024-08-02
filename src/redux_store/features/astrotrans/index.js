import { createSlice } from "@reduxjs/toolkit";

const initialState={
    list:[]
}

const astroTransSlice=createSlice({
    name:"astroTrans",
    initialState:initialState,
    reducers:{
        setAstroTransData:(state,action)=>{
            state.list=action.payload
        }
    }
})

export const {setAstroTransData}=astroTransSlice.actions


export default astroTransSlice.reducer