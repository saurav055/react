import { Box, Container } from '@mui/material';
import {EnquiresList,EnquiresToolbar} from 'components'
import React from 'react';

const Enquires = () => {
    const [open,setOpen] =React.useState(false)
   return (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <EnquiresToolbar />
        <Box sx={{ mt: 3 }}>
          <EnquiresList openModal={()=>setOpen(true)}  />
        </Box>
      </Container>
    </Box>
  </>
);}


export default Enquires;
