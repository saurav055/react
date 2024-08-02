import { createSlice } from "@reduxjs/toolkit";

const astrolistSlice=createSlice({
    name:"astros",
    initialState:{list:[]},
    reducers:{
        setAstrolist:(state,action)=>{
            state.list=action.payload
        }
    }
})

export const {setAstrolist}=astrolistSlice.actions
export default astrolistSlice.reducer