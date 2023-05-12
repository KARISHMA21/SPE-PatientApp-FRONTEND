import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {useEffect, useState} from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { useNavigate, useParams } from 'react-router-dom';
import Requests from './Requests';
function PendingRequests() {
    const {pid, name} = useParams();
    const nav=useNavigate();
    const theme = createTheme();
    let token=localStorage.getItem(pid)
    useEffect(() => {
        if(token===null){
            nav('/');
        }
    })
    return (<>
            <Topbar pid={pid} name={name}/>
            <div className="container">
                <Sidebar pid={pid} name={name}/>
                <div className="moveright">
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="lg">
                            <CssBaseline />
                            <div> <h3>Pending Consent Requests</h3></div>
                            <Requests showRecords={false} pid={pid} name={name} token={token}/>
                        </Container>
                    </ThemeProvider>

                </div>

            </div>

        </>
    )
}

export default PendingRequests