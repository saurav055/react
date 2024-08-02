import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Card,
  Button
} from '@mui/material';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { EnquiryModal } from 'components'
import { markAstrologerThunk } from 'redux_store/features/services'

const CustomerListResults = ({ customers, openModal, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)

  const serviceslist = useSelector(state => state.services)?.list
  const [selectedService, setSelectedService] = useState(null)
  const dispatch = useDispatch()
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email/Whatsapp' },
    { field: 'birth', headerName: 'Place of birth', sortable: false },
    { field: 'focus', headerName: 'Focus Area', flex: 0.7 },
    { field: 'response', headerName: 'Responded', flex: 0.6 },
    {
      field: "action", headerName: "Action", flex: 1, sortable: false, filterable: false, renderCell: (params) => {
        return (
          <Box position={"relative"} display={"flex"} flexDirection={"row"}>
            <Box position={"relative"} sx={{ marginRight: "10px" }}>
              <Button
                variant="contained"
                onClick={() => {
                }}
                color="error">
                {params?.row?.data?.marked_completed ? "Not Done" : "Add Response"}
              </Button>
              <input type={"file"} onChange={event => {
                let formdata = new FormData()
                formdata.append("_id",params?.row?.data?._id)
                formdata.append("marked_completed",params?.row?.data?.marked_completed ? false : true)
                if (event.target.files && event.target.files[0]) {
                  const fileSupported=["image/jpeg", "image/jpg", "application/pdf", "image/png"]
                  if(fileSupported.includes(event.target.files[0]?.type)) {
                    formdata.append("media", event.target.files[0])
                    dispatch(markAstrologerThunk(formdata))
                  } else {
                      alert("Please select image or pdf file only")
                  }
              }
              }} className="filetype" style={{ height: 40, top: 5, marginLeft: -120, width: 120, backgroundColor: "red", position: "absolute", opacity: 0 }} />
            </Box>
            <Button
              variant="contained"
              position={"relative"} sx={{ marginRight: "10px" }}
              onClick={() => {
                setSelectedService(params?.row?.data)
                setOpen1(true)
              }}
              color="info">
              details
            </Button>
          </Box>
        )
      }
    }
  ];


  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050, height: "60vh" }}>
          <DataGrid
            rows={serviceslist.map((service, index) => ({
              id: index + 1,
              name: service.name,
              data: service,
              email: service.whatsapp_no,
              dob: service.dob,
              birth: `${service.pob}`,
              focus: service?.focous_area,
              payment: 'stripe',
              status: service?.astrologer ? "Assigned" : "Not Assigned",
              assigned: service?.astrologer ? 1 : 0,
              response: service?.marked_completed ? "Yes" : "No"
            }))}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />

        </Box>
      </PerfectScrollbar>
      <EnquiryModal selectedService={selectedService} open={open1} setOpen={setOpen1} />
    </Card>
  );
};

export default CustomerListResults
CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};
