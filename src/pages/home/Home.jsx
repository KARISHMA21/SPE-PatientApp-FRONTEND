
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";


import WidgetLg from "../../components/widgetLg/WidgetLg";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import get_stats from "../../services/Stats";
export default function Home() {
  const {pid, name} = useParams();
  const theme = createTheme();
  const nav=useNavigate();
  const [reload,setReload]=React.useState(true);
  let token =localStorage.getItem(pid)



  // if(token!==""){


    React.useEffect(() => {

        if(token===null){

            nav('/');
        }
    }, [])
  
       





  return (
    <>
    
    <Topbar pid={pid} name={name}/>
      <div className="container">
      <Sidebar pid={pid} name={name}/>
   <div className="moveright">
     
      
    <div className="home">
      
      <div className="home-comp">
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
         {/* <Chart data={userData} title="User Analytics" grid dataKey="Active User"/> */}
      <div className="homeWidgets">
        {/* <WidgetSm/> */}
        <WidgetLg/>
      </div>
      <FeaturedInfo  />
     
      </Container>
   </ThemeProvider>
      </div>
    </div>
    </div>
    </div>
    <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
    </>
  );
}
