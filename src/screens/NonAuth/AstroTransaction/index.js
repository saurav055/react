import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { ScreenContainer } from 'components';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import hit from 'service'
import moment from 'moment'
import { setUserData } from 'redux_store/features/Auth'
import { setAstroTransData } from 'redux_store/features/astrotrans';
export default function Transaction() {
    const navigate = useNavigate()
    const user = useSelector(state => state?.auth)?.user
    const [list,setList]=React.useState([])
    const dispatch=useDispatch()
    const astroTrans=useSelector(state=>state.astrotrans)?.list
    React.useEffect(()=>{
        getList()
    },[])
    const getList = async () => {
        try{
            let res = await hit("/astrologer/listTransaction", "post", {})
            console.log(res.data)
            if (!res.err) {
                dispatch(setAstroTransData(res.data?.reverse()))
            }
        }catch(err){

        }finally{
        }
    }

    return (
        <Box sx={{ paddingX: "5%", minHeight: "50vh" }} >
            <Typography textAlign="center" fontSize="1.5em">Transactions</Typography>
            {/* </Box> */}
            <Box display="flex" borderBottom="1px solid gray" paddingY="1em">
                <Typography flex={2} fontWeight={500} fontSize={"1.1em"} >
                    Description
                </Typography>
                <Typography flex={1} textAlign="right" fontWeight={500} fontSize={"1.1em"} >
                    Transaction Amount(₹)
                </Typography>
                <Typography flex={1} textAlign="right" fontWeight={500} fontSize={"1.1em"} >
                    Datetime
                </Typography>
            </Box>
            {astroTrans?.map(x=><Box key={x?._id} display="flex" alignItems="center" py={".5em"} borderBottom="1px solid gray">
                <Typography flex={2} fontWeight={300}>
                   {x?.user_id?.email} chatted with you
                </Typography>
                <Typography flex={1} textAlign="right" color={"green"} fontWeight={300}>
                ₹{Math.abs(x?.amount)}
                </Typography>
                <Typography flex={1} textAlign="right" fontWeight={300}>
                {moment(x?.createdAt).format("MMM DD, YYYY, hh:mm A")}
                </Typography>
            </Box>)}
        </Box>
    )
}