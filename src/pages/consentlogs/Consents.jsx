import * as React from 'react';
// import Box from '@mui/lab/Box';
import Box from '@mui/material/Box';
// import Tabs from '@mui/lab/Tabs';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import img from '../../Loading_icon.gif';

import ConsentLogService from "../../services/ConsentLogService";
import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as moment from "moment/moment";
import { useNavigate } from 'react-router-dom';
// import Button from "@mui/material/Button";


// import Container from '@mui/material/Container';
// // import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

export default function Consents(props) {
  // const theme = createTheme();
const nav=useNavigate();
  const pid=props.pid;
  // const name=props.name;
  const token=props.token;
  // const did='D01';


  const [index, setIndex] = useState(1);


  const [activeConsents, setactiveConsents] = useState([]);
  const [inactiveConsents, setinactiveConsents] = useState([]);
  const [emergencyConsents, setemergencyConsents] = useState([]);
;

  const [loading, setLoading] = useState(true);

//   useEffect(() => {
    
  
  
  const fetchConsentLog= async () => {
    // const response = await fetch('your-api-endpoint-url');
    setLoading(true);
    try {
      const response = await ConsentLogService.getConsentLog(pid,token);
      const res = response.data;
     
    let ConsentData=res.consentLogs;
    setactiveConsents(ConsentData.filter(request => request.status === 'Active'));
    setinactiveConsents(ConsentData.filter(request => request.status === 'Expired' || request.status === 'Rejected'))
    setemergencyConsents(ConsentData.filter(request => request.status === 'Emergency'))
    } catch (error) {
      
        nav('/');
    }
    setLoading(false);
  };
//   fetchConsentLog()

// }, [])
//   const activeConsents = ConsentData.filter(request => request.status === 'Active');
//   const inactiveConsents = ConsentData.filter(request => request.status === 'Expired' || request.status === 'Rejected');
//   const emergencyConsents = ConsentData.filter(request => request.status === 'Emergency');

  const [value, setValue] = React.useState('1');

  const handleTabClick = (event, newvalue) => {
    
     if (newvalue === "1") {
      fetchConsentLog();
   
    }
    else if (newvalue === "2") {
      fetchConsentLog();
    }
    else if (newvalue === "3") {
        // fetchPendingRequests();
        fetchConsentLog();
      }
      setValue(newvalue)
    setIndex(newvalue);
  }


  useEffect(() => {

    fetchConsentLog();
  }, []);
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',marginLeft:2.5 }}>
        <TabList onChange={handleTabClick} aria-label="consentlogs">
          <Tab  label="Active Consents" value="1" />
          <Tab 
          sx={{marginLeft:"10%"}}
        //   sx={{background:index==="2"?"blue":"gray",color:'white' }}
          label="Rejected/Expired Consents" value="2" />
          <Tab 
          sx={{marginLeft:"10%"}}
        //   sx={{background:index==="3"?"blue":"gray",color:'white' }}
          
          label="Emergency Consents" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
      {loading?<>{loading?<>
        <img src={img}></img>
        </>:<></>}</>:<></>}
      {!loading && activeConsents.length==0?<>No Active Consents Present</>:<></>}
      {!loading && activeConsents.length!==0?
      <TableContainer component={Paper}>
               <Table sx={{ minWidth: 550}} aria-label="simple table">
                 <TableHead sx={{ backgroundColor:"whitesmoke" }}>
                   <TableRow>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Consent ID</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Create Date</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Patient ID</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Consent Validity</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Last Updated On</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Approved By</TableCell>
                     <TableCell align="left"
                         // sx={{ fontWeight: 'bold' }}
                     >Reason</TableCell>
                   </TableRow>
                 </TableHead>

                 <TableBody sx={{ backgroundColor:"white" }}>

                   { !loading && activeConsents.map((request) => (
                       <TableRow
                           key={request.cid}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                       >
                         <TableCell align="center">{request.cid}</TableCell>
                         <TableCell align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(request.create_date).format("MMMM D, YYYY")

                           }
                         </TableCell>
                         <TableCell align="center">{request.pid}</TableCell>
                         <TableCell align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                               moment(request.expiry_date).format("MMMM D, YYYY")
                           }
                         </TableCell>
                         <TableCell  align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(request.last_update).format("MMMM D, YYYY")
                           }
                         </TableCell>
                         <TableCell align="center">{request.action_taken_by}</TableCell>

                         <TableCell sx={{maxWidth:"200px"}} align="left">{request.reason}</TableCell>
                         {/*<TableCell align="left">Dr. {row.requestor_ename}</TableCell>*/}
                         {/*<TableCell align="left">{row.requestor_eid+" "+row.etype}</TableCell>*/}
                       </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
:<></>}


        
      </TabPanel>
      <TabPanel value="2">  
      {loading?<>{loading?<>
        <img src={img}></img>
        </>:<></>}</>:<></>}
      {!loading && inactiveConsents.length==0?<>No Expired or Rejected Consents Present</>:<></>}
      {!loading && inactiveConsents.length!==0?
      <TableContainer component={Paper}>
               <Table sx={{ minWidth: 550,width:"100%"}} aria-label="simple table">
                 <TableHead sx={{ backgroundColor:"whitesmoke" }}>

                   <TableRow>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Consent ID</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Create Date</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Patient ID</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Consent Validity</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Last Updated On</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Approved By</TableCell>
                     <TableCell align="left"
                    
                         // sx={{ fontWeight: 'bold' }}
                     >Reason</TableCell>
                   </TableRow>
                 </TableHead>

                 <TableBody sx={{ backgroundColor:"white" }}>
                   { !loading && inactiveConsents.map((request) => (
                       <TableRow
                           key={request.cid}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                       >
                         <TableCell align="center">{request.cid}</TableCell>
                         <TableCell align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(request.create_date).format("MMMM D, YYYY")

                           }
                         </TableCell>
                         <TableCell align="center">{request.pid}</TableCell>
                         <TableCell align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                               moment(request.expiry_date).format("MMMM D, YYYY")
                           }
                         </TableCell>
                         <TableCell  align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(request.last_update).format("MMMM D, YYYY")
                           }
                         </TableCell>
                         <TableCell align="center">{request.action_taken_by}</TableCell>

                         <TableCell sx={{maxWidth:"200px"}} align="left">{request.reason}</TableCell>
                         {/*<TableCell align="left">Dr. {row.requestor_ename}</TableCell>*/}
                         {/*<TableCell align="left">{row.requestor_eid+" "+row.etype}</TableCell>*/}
                       </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
             :<></>}
</TabPanel>
      <TabPanel value="3">  
      {loading?<>{loading?<>
        <img src={img}></img>
        </>:<></>}</>:<></>}
      {!loading && emergencyConsents.length==0?<>No Emergency Consents Present</>:<></>}
      {!loading && emergencyConsents.length!==0?
      <TableContainer component={Paper}>
               <Table sx={{ minWidth: 550}} aria-label="simple table">
                 <TableHead sx={{ backgroundColor:"whitesmoke" }}>
                   <TableRow>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Consent ID</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Create Date</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Patient ID</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Consent Validity</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Last Updated On</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >Approved By</TableCell>
                     <TableCell align="left"
                    
                         // sx={{ fontWeight: 'bold' }}
                     >Reason</TableCell>
                   </TableRow>
                 </TableHead>

                 <TableBody sx={{ backgroundColor:"white" }}>
                   { !loading && emergencyConsents.map((request) => (
                       <TableRow
                           key={request.cid}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                       >
                         <TableCell align="center">{request.cid}</TableCell>
                         <TableCell align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(request.create_date).format("MMMM D, YYYY")

                           }
                         </TableCell>
                         <TableCell align="center">{request.pid}</TableCell>
                         <TableCell align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                               moment(request.expiry_date).format("MMMM D, YYYY")
                           }
                         </TableCell>
                         <TableCell  align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(request.last_update).format("MMMM D, YYYY")
                           }
                         </TableCell>
                         <TableCell align="center">{request.action_taken_by}</TableCell>

                         <TableCell  sx={{maxWidth:"200px"}} align="left">{request.reason}</TableCell>
                         {/*<TableCell align="left">Dr. {row.requestor_ename}</TableCell>*/}
                         {/*<TableCell align="left">{row.requestor_eid+" "+row.etype}</TableCell>*/}
                       </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
             :<></>}
</TabPanel>
    </TabContext>
  </Box>
  );
}