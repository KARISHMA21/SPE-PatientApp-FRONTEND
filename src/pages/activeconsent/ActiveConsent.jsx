import React from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';

import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { useParams } from 'react-router-dom';
import Consents from './Consents';
import Notify from '../../components/notification/Notify';
function ActiveConsent() {
  const {pid, name} = useParams();
 
  const theme = createTheme();
  

  return (<>
  <Topbar pid={pid} name={name}/>
      <div className="container">
      <Sidebar pid={pid} name={name}/>
   <div className="moveright">
   <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
    <div className='container'> <div><h3>Active Consents</h3></div>
    <div style={{marginLeft:600}}> <Notify/></div>
</div>
           <Consents/>
    </Container>
   </ThemeProvider>

    </div>
    
    </div>
   
    </>
  )
}

export default ActiveConsent