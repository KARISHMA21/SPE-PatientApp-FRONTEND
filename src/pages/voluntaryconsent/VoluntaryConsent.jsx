import React from 'react'
import Records from '../medicalhistroty/Records'
import TextField from '@mui/material/TextField';
import './voluntaryconsent.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { useParams } from 'react-router-dom';
import Notify from '../../components/notification/Notify';
function VoluntaryConsent() {
  const {pid, name} = useParams();
  // const [curDate, setCurDate] = useState('');
  const date = new Date();
  // let day = date.getDate();
  // let month = date.getMonth() + 1;
  // let year = date.getFullYear();
  
  // const currentDate =`${year}-${month}-${day}`;
  // let imp=moment(date).format('YYYY-MM-DD')
  let curDate=date;
  // const [curDate, setCurDate] = useState(date);
  const theme = createTheme();

  const [records, setRecords] = useState({
    'pid':"",
    'accessor_id': "",
    'entity': "",
    'exp_date':"",
    'tag1' :"",
    'tag2':"",
    'tag3':"",
    'accessor_name':"",
    'accessing_ename':""



  });
  const handleChange = (e) => {
    const value = e.target.value;
    setRecords({ ...records, [e.target.name]: value });
    
  };
  let props = {
    showRecords:true,
   info:records,
   pid:pid,
   name:name
  }

  return (<>
  <Topbar pid={pid} name={name}/>
      <div className="container">
      <Sidebar pid={pid} name={name}/>
   <div className="moveright">
   <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
    <div className='container'> 
     <div> <h3>Voluntary Consent</h3></div>
    
   <div style={{marginLeft:600}}> <Notify/></div>
    </div>
    <div className="widgetLg">
      {/* <div className='box'>
      <div className='box-title'> Accessor ID: </div> 
        <div className='box-content'>
          <TextField id="outlined-basic" label="Accessor ID" variant="outlined" name="accessor_id" required={true}
            value={records.accessor_id}
            onChange={(e) => handleChange(e)}
              />
      </div> 
      
    
      <div className='box-title'> Entity ID: </div> 
        <div className='box-content'>
          <TextField id="outlined-basic" label="Entity ID" variant="outlined" name="entity" required={true}
            value={records.entity}
            onChange={(e) => handleChange(e)}
              />
        </div> 
        <div className='box-title'>Expiry Date : </div>
        <div className='box-content'> 
        <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue="yyyy-MM-dd"
        name="exp_date"
        // inputProps={{ min: '2023-03-20' }}
        
        inputProps={{ min:curDate}}
        value={records.exp_date}
        onChange={(e) => handleChange(e)}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}/>
      </div>
      </div> */}


        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
          }}
        >
          
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={4}>

            <Grid item xs={12} sm={12} lg={4}>
      <TextField
        required
        fullWidth
        id="accessor_id"
        label="Accessor ID"
        name="accessor_id"
        value={records.accessor_id}
        onChange={(e) => handleChange(e)}
        autoComplete="accessor_id"
      />
    </Grid>

    


      <Grid item xs={12} sm={12} lg={4}>
      <TextField
        required
        fullWidth
        id="entity"
        label="Entity ID"
        name="entity"
        value={records.entity}
        onChange={(e) => handleChange(e)}
        autoComplete="entity-name"
      />
    </Grid>



    <Grid item xs={12} sm={12} lg={4}>
    <TextField
        id="date"
        label="Expiry Date"
        type="date"
        defaultValue="yyyy-MM-dd"
        name="exp_date"
        // inputProps={{ min: '2023-03-20' }}
        
        inputProps={{ min:curDate}}
        value={records.exp_date}
        onChange={(e) => handleChange(e)}
        sx={{ width: "100%" }}
        InputLabelProps={{
          shrink: true,
        }}/>
        </Grid>


        <Grid item xs={12} sm={6} lg={4}>
      <TextField
        required
        fullWidth
        id="tag1"
        label="Tag-1"
        name="tag1"
        value={records.tag1}
        onChange={(e) => handleChange(e)}
        autoComplete="tag1-name"
      />
    </Grid>   
    <Grid item xs={12} sm={6} lg={4}>
      <TextField
        required
        fullWidth
        id="tag2"
        label="Tag-2"
        name="tag2"
        value={records.tag2}
        onChange={(e) => handleChange(e)}
        autoComplete="tag2-name"
      />
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
      <TextField
        required
        fullWidth
        id="tag3"
        label="Tag-3"
        name="tag3"
        value={records.tag3}
        onChange={(e) => handleChange(e)}
        autoComplete="tag3-name"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        required
        fullWidth
        id="accessor_name"
        label="Accessor Name"
        name="accessor_name"
        value={records.accessor_name}
  onChange={(e) => handleChange(e)}
        autoComplete="accessor_name"
      />
      </Grid>
      <Grid item xs={6}>
      <TextField
        required
        fullWidth
        id="accessing_ename"
        label="Accessing Entity Name"
        name="accessing_ename"
        value={records.accessing_eid}
  onChange={(e) => handleChange(e)}
        autoComplete="accessing_ename"
      />
      </Grid>
</Grid>
      </Box>
    </Box>
     </div>
    <br/>
    <Records {...props}   />
    
    
    </Container>
   </ThemeProvider>

    </div>
    
    </div>
   
    </>
  )
}

export default VoluntaryConsent