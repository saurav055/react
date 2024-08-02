import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from 'components/severity-pill';
import { useSelector } from 'react-redux';
import moment from 'moment';

const orders = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  }
];

export const LatestOrders = (props) =>{ 
  const astroTrans=useSelector(state=>state.astrotrans)?.list

  return(
  <Card {...props}>
    <CardHeader title="Lastest transactions" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
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
            {[...astroTrans].slice(0,4)?.map(x=><Box key={x?._id} display="flex" alignItems="center" py={".5em"} borderBottom="1px solid gray">
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
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);}
