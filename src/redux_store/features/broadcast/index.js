import { createSlice } from "@reduxjs/toolkit";
import hit from 'service'
import {broadcast} from 'service/endpoints'
import { setModalVisible } from '../modal'
import { setToastOpen } from "../Toast";

const initialState={
    data:[]
}

const broadCastSlice=createSlice({
    name:"broadcast",
    initialState:initialState,
    reducers:{
        setBroadCastData:(state,action)=>{
            state.data=action.payload
        },
    }
})

export const {setBroadCastData}=broadCastSlice.actions

export const listBroadCastThunk = () => {
    return async (dispatch) => {
        try {
            dispatch(setModalVisible(true))
            let res = await hit(broadcast.get, "post", {})
            if (!res.err) {
                dispatch(setBroadCastData(res.data))
            } else {
                dispatch(setToastOpen({ open: true, type: "success", message: res.msg }))
            }
        } catch (err) {

        } finally {
            dispatch(setModalVisible(false))

        }
    }
}

export const addBroadCastThunk = (data) => {
    return async (dispatch) => {
        try {
            dispatch(setModalVisible(true))
            let res = await hit(broadcast.add, "post", data)
            if (!res.err) {
                dispatch(listBroadCastThunk())
            } else {
                dispatch(setToastOpen({ open: true, type: "success", message: res.msg }))
            }
        } catch (err) {

        } finally {
            dispatch(setModalVisible(false))

        }
    }
}

export default broadCastSlice.reducer