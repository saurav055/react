import { createSlice } from "@reduxjs/toolkit";

const initialState={
   data:{
    "name": "",
    "lname": "",
    "user_name": "",
    "profile_pic": "",
    "email": "",
    "cover_pic": "cover.png",
    "dob": "",
    "tob": "",
    "phone": "",
    "primary_skills": [],
    "all_skills": [],
    "country_code": "1",
    "password":"",
    "about_me": "",
    "pin_code": "",
    "place_of_birth": "",
    "auth_token": "",
    "experience": "",
    "gender": "",
    "daily_limit": 4,
    "onboard_reason": "",
    "current_city": "",
    "main_bussiness_source": "",
    "preferred_interview_time": "",
   }
}

const formSlice=createSlice({
    name:"form",
    initialState:initialState,
    reducers:{
        setFormData:(state,action)=>{
            state.data={...state.data,...action.payload}
        },
        clearFormData:(state,action)=>{
            return initialState
        }
    }
})

export const {clearFormData,setFormData}=formSlice.actions

export default formSlice.reducer