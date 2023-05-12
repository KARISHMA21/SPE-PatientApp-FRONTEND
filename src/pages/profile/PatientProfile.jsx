import React, { useEffect } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import Notify from '../../components/notification/Notify';
import Demographics from "./Demographics";

function PatientProfile() {
    const {pid, name} = useParams();
 console.log("Patient name"+name);
    const theme = createTheme();


    return (<>
    <Topbar pid={pid} name={name}/>
      <div className="container">
      <Sidebar pid={pid} name={name}/>
   <div className="moveright">
   {/* <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
    <div className='container'> */}
                    <h3><i>Your Profile Details</i></h3>
                    <div style={{ display: 'block' }}>
                    <Demographics pid={pid} name={name} />
                    </div>
                    {/* <div style={{marginLeft:600}}> <Notify/></div> */}
</div>
    
    {/* </Container>
   </ThemeProvider> */}

    {/* </div> */}
    
    </div>
        </>
    )
}

export default PatientProfile;