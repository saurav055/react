import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Card, Typography } from '@mui/material'
import { Zodaic } from 'assets';
import { useNavigate } from 'react-router-dom'

import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { customers } from '__mocks__/customers';
import { useDispatch, useSelector } from 'react-redux';
import { assignAstrologerThunk } from 'redux_store/features/services';


export default function AstrologerListModal({selectedService, open, setOpen }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('tablet'));
    const navigate = useNavigate()
    const astrologers=useSelector(state=>state.astrolist)?.list
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                sx={{ maxWidth: { laptop: "60%", mobile: "95%" }, marginX: "auto" }}
                aria-labelledby="responsive-dialog-title"
            >
                <Card sx={{flexDirection: "column", display: 'flex', paddingTop: "1em" }} >
                    <CancelIcon onClick={() => setOpen(false)} sx={{ alignSelf: "flex-end", marginRight: "1em" }} color="primary" fontSize="large" />
                    <Typography textAlign="center" fontSize={"1.5em"} fontWeight={400}>Select Astrologer</Typography>
                    <Box sx={{height:"50vh",width:"70vw",overflow:"scroll"}}>
                       <CustomerListResults selectedService={selectedService}  setOpen={setOpen}/>
                    </Box>
                </Card>
            </Dialog>
        </div>
    );
}







const CustomerListResults = ({ selectedService, setOpen, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const astro_list=useSelector(state=>state.astrolist)?.list
  const dispatch=useDispatch()

  return (

    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ width: "55vw" }}>
          <Table>
            <TableHead>
              <TableRow>
              
                <TableCell>
                  Order
                  </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Year of Experience
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody >
              {astro_list.filter(x=>x.status==1).map((customer, index) => (
                <TableRow
                  hover
                  key={customer._id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell scope="row">{index + 1}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {customer?.name}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer?.name} {customer?.lname}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer?.email}
                  </TableCell>
                  <TableCell>
                    {customer?.phone}
                  </TableCell>
                  <TableCell>
                    {customer?.experience}
                  </TableCell>
                  <TableCell sx={{ display: "flex" }}>
                    <Button variant="contained"
                    onClick={()=>{
                      dispatch(assignAstrologerThunk({astrologer:customer._id,_id:selectedService?._id}))
                      setOpen(false)
                    }}
                    color="error">
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </Box>
      </PerfectScrollbar>
   
    </Card>

  );
};



CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};
