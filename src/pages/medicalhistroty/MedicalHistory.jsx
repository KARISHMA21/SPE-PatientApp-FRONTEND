import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import Records from './Records'
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import Notify from '../../components/notification/Notify';

function MedicalHistory() {

  const theme = createTheme();
  const {pid, name} = useParams();
  return (
 <>
    <Topbar pid={pid} name={name} />
      <div className="container">
      <Sidebar pid={pid} name={name} />
   <div className="moveright">
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
    <div className="medicalrecords">
    {/* <WidgetSm/> */}
    <div className='container'>
   <h3> Medical Records History</h3>
   <div style={{marginLeft:450}}> <Notify/></div>
   </div>


    <Records showRecords={false} pid={pid} name={name} />

    
  </div>
  </Container>
   </ThemeProvider>
  </div>
  
  </div>
  </>
  )
}

export default MedicalHistory