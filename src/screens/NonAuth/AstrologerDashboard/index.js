import * as React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { Budget } from 'components/dashboard/budget';
import { LatestOrders } from 'components/dashboard/latest-orders';
import { LatestProducts } from 'components/dashboard/latest-products';
import { Sales } from 'components/dashboard/sales';
import { TasksProgress } from 'components/dashboard/tasks-progress';
import { TotalCustomers } from 'components/dashboard/total-customers';
import { TotalProfit } from 'components/dashboard/total-profit';
import { TrafficByDevice } from 'components/dashboard/traffic-by-device';
import { useDispatch, useSelector } from 'react-redux';
import hit from 'service';
import { setAstroTransData } from 'redux_store/features/astrotrans';

export default function AstrologerDashboard() {
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
        <Box
      component="main"
      sx={{
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            laptop={3}
            mobile={6}
          >
            <Budget />
          </Grid>
          <Grid
           item
           laptop={3}
           mobile={6}
          >
            <TotalCustomers />
          </Grid>
          <Grid
           item
           laptop={3}
           mobile={6}
          >
            <TasksProgress />
          </Grid>
          <Grid
          item
          laptop={3}
          mobile={6}
          >
            {/* <TotalProfit sx={{ height: '100%' }} /> */}
          </Grid>
          <Grid
            item
            laptop={12}
            mobile={12}
          >
            <Sales />
          </Grid>
          <Grid
           item
           laptop={12}
           mobile={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
    );
}
