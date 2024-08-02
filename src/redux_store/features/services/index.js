import { createSlice } from "@reduxjs/toolkit";
import hit from 'service'
import { services } from 'service/endpoints'
import { setModalVisible } from '../modal'
import { setToastOpen } from "../Toast";

const serviceSlice = createSlice({
    name: "services",
    initialState: { list: [], loading: false },
    reducers: {
        setServicesList: (state, action) => {
            state.list = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setServicesList, setLoading } = serviceSlice.actions

export const getServicesListThunk = () => {
    return async (dispatch) => {
        try {
            let res = await hit(services.get_services, "post", {})
            
            if (!res.err) {
                dispatch(setServicesList(res.data))
            } else {
                dispatch(setServicesList([]))
            }
        } catch (err) {

        } finally {
            dispatch(setLoading(false))
            dispatch(setModalVisible(false))
        }
    }
}

export const markAstrologerThunk = (data) => {
    return async (dispatch) => {
        try {
            dispatch(setModalVisible(true))
            dispatch(setLoading(true))
            let res = await hit(services.mark_service, "post", data)
            if (!res.err) {
                // dispatch(setToastOpen({open:true,type:"success",message:res.msg}))
            } else {
                dispatch(setToastOpen({ open: true, type: "success", message: res.msg }))
            }
        } catch (err) {

        } finally {
            dispatch(getServicesListThunk())

        }
    }
}
export default serviceSlice.reducer