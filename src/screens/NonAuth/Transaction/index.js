import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { ScreenContainer } from 'components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import hit from 'service'
import moment from 'moment'
import { setUserData } from 'redux_store/features/Auth'
export default function Transaction() {
    const navigate = useNavigate()
    const user = useSelector(state => state?.auth)?.user
    const [list,setList]=React.useState([])
    const dispatch=useDispatch()
    React.useEffect(()=>{
        getList()
        getUserDetails()
    },[])
    const getList = async () => {
        try{
            let res = await hit("/user/listTransaction", "post", {})
            console.log(res.data)
            if (!res.err) {
                setList(res.data?.reverse())
            }
        }catch(err){

        }finally{
        }
    }
    const getUserDetails=async()=>{
        try{
            let res = await hit("/user/getProfile", "post", {})
            if (!res.err) {
                dispatch(setUserData({user:res.data}))
                
            }
        }catch(err){

        }finally{
            
        } 
    }
    return (
        <ScreenContainer style={{ paddingX: { "mobile": "5%", laptop: "10%", minHeight: "50vh" } }} >
            <Typography textAlign="center" fontSize="1.5em">Transactions</Typography>
            <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                    <Typography color="secondary">Available Balance :₹{user?.balance}</Typography>
                    <Button onClick={() => {
                        navigate("/add_money")
                    }} variant="outlined" color="secondary" sx={{ marginLeft: "10px" }}>Recharge</Button>
                </Box>
                {/* <Button variant="contained" sx={{ backgroundColor: "info.main", "&:hover": { backgroundColor: "error.main" } }}>
                    Delete all transaction
                </Button> */}
            </Box>
            {/* </Box> */}
            <Box display="flex" borderBottom="1px solid gray" paddingY="1em">
                <Typography flex={2} fontWeight={500} fontSize={"1.1em"} >
                    Description
                </Typography>
                {/* <Typography flex={1} textAlign="right" fontWeight={500} fontSize={"1.1em"} >
                    Invoice / Receipt
                </Typography> */}
                <Typography flex={1} textAlign="right" fontWeight={500} fontSize={"1.1em"} >
                    Transaction Amount(₹)
                </Typography>
                <Typography flex={1} textAlign="right" fontWeight={500} fontSize={"1.1em"} >
                    Datetime
                </Typography>
                {/* <Typography flex={1} textAlign="right" fontWeight={500} fontSize={"1.1em"} >
                    Actions
                </Typography> */}
            </Box>
            {list.map(x=><Box key={x?._id} display="flex" alignItems="center" py={".5em"} borderBottom="1px solid gray">
                <Typography flex={2} fontWeight={300}>
                   {x?.description}
                </Typography>
                {/* <Typography flex={1} textAlign="right" fontWeight={300}>
                    Invoice file
                </Typography> */}
                <Typography flex={1} textAlign="right" color={x?.amount<0?"red":"green"} fontWeight={300}>
                    {x?.amount<0?"-":""}₹{Math.abs(x?.amount)}
                </Typography>
                <Typography flex={1} textAlign="right" fontWeight={300}>
                {moment(x?.createdAt).format("MMM DD, YYYY, hh:mm A")}
                </Typography>
                {/* <Typography flex={1} textAlign="right" fontWeight={300}>
                    <Button variant="outlined" color="warning" >Delete</Button>
                </Typography> */}
            </Box>)}
        </ScreenContainer>
    )
}