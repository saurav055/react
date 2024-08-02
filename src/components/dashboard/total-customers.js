import React from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import { collection, setDoc, doc, query, onSnapshot, where, orderBy } from "firebase/firestore";
import { db } from '../../firebase_config'
import { useSelector } from "react-redux";
export const TotalCustomers = (props) =>{ 
  const [list,setList]=React.useState([])
  const user = useSelector(state => state.auth)?.user

    React.useEffect(() => {
        let un = onSnapshot(query(collection(db,"chats"), where("user_ids", "array-contains",String(user?._id)), orderBy("createdAt", "asc")), (snapshot) => {
            let messagesC = [];
            snapshot.forEach((doc) => {
                messagesC.push(doc.data());
            })
            setList(messagesC)
        },
            (error) => {
                console.log("Error",error)
            })
        return ()=>{
            un()
        }
    }, [])
  return(
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TOTAL USER ChATED WITH
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {list?.length}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        {/* <ArrowUpwardIcon color="success" />
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          16%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography> */}
      </Box>
    </CardContent>
  </Card>
);}
