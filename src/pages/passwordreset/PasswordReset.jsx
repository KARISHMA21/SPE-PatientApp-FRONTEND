import * as React from 'react';
import PwdReset from '../../services/PwdReset';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import {Modal} from "@mui/material/Modal";
import { Modal,ModalDialog} from "@mui/joy";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
const theme = createTheme();



export default function PasswordReset() {
  let nav=useNavigate();

  const [OTPSent, setOTPSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [pid, setpid] = useState("");

  const [newpwd, setNewPwd] = useState("");
  const [newpwd2, setNewPwd2] = useState("");
  const [match, setMatch] = useState(false);
  
  const [IsOtpVerified, setIsOtpVerified] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTPButton = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const bodyParameters ={
      pid: data.get('userid'),
      phone: data.get('phone'),
      OTP: ""
      
    };
console.log(bodyParameters);
    setPhone(data.get('phone'));
    setpid(data.get('userid'));
    PwdReset.validatereq(bodyParameters)
  .then((response) => {
    console.log(response)
    console.log(response.status)
    if (response.status === 200) {

      toast.success("Account Found, OTP SENT", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      
      setOTPSent(true);
    
    }
    else{
      toast.error("Account not found !!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

    }
    
  })
  .catch((error) => {
    toast.error("Account not found !!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    // nav("/")
  });

  };

  const handleVerifyOTP = () => {
    verifyOTP(otp,phone);
  };
   
  const verifyOTP = (otp,phone) => {
    // Make an API call to verify OTP
      // const url = 'https://example.com/api/verify-otp';
      const data = {
        otp: otp,
        phone: phone
      };
    
      // axios.post(url, data)
      PwdReset.validateOTP(data)
        .then(response => {
          console.log('OTP verification successful!');
          setIsOtpVerified(true);
          toast.success("OTP verification successful!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          
          
        })
        .catch(error => {
          console.error('Error verifying OTP: ', error);
          toast.error("Error verifying OTP!!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          setOTPSent(false);
        });
    }
  

// Update the value of otp when the input field changes
const handleOtpChange = (e) => {
  setOtp(e.target.value);
};
function handleNewPwdChange(event) {
  setNewPwd(event.target.value);
  if (event.target.value === newpwd2) {
    setMatch(true);
  } else {
    setMatch(false);
  }
}

function handleNewPwd2Change(event) {
  setNewPwd2(event.target.value);
  if (event.target.value === newpwd) {
    setMatch(true);
  } else {
    setMatch(false);
  }
}


const handleProceedPwdUpdate= (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const bodyParameters ={
    pid: pid,
    newpassword: data.get('newpwd'),
   
    
  };
console.log(bodyParameters);
  // setPhone(data.get('userid'));
  PwdReset.updatepwd(bodyParameters)
.then((response) => {
  console.log(response)
  console.log(response.status)
  if (response.status === 200) {
    console.log("password updated")

    // setModalVisible(true);

    toast.success("Password Reset Successfull, Login to Confirm. \nRedirecting...", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  
  }
  else{
    toast.error("Password Reset Failed!!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  }
  
})
.catch((error) => {
  toast.error("Password Reset Failed!!", {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
 

});
 setTimeout(() => {
  nav("/");
  }, 5000); // 5000 ms = 5 seconds
};

   
  // };

  return (


<> <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://wpcdn.platomedical.com/plato/specialist/a2_not_sg.svg)',
            backgroundRepeat: 'no-repeat',
            borderBlock:5,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: '90% 90%',
            backgroundPosition: 'center',
           
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Password Reset Portal
            </Typography>
          {!IsOtpVerified?(
            <>
            <Box component="form"
             onSubmit={handleSendOTPButton} noValidate 
             sx={{ mt: 1 }}>
             
              
            <TextField
              margin="normal"
              required
              fullWidth
              id="userid"
              label="Patient ID"
              name="userid"
              autoComplete="none"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Registered Mobile No."
              type="password"
              id="phone"
              autoComplete="phone"
            />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              { OTPSent ?(

              <div>
                  <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="OTP"
                  label="Enter OTP received on Registered Mobile No."
                  type="password"
                  id="OTP"
                  value={otp} onChange={handleOtpChange}
                  autoComplete="OTP"
                  />
                   <Button 
                  //  type="submit"
                            // fullWidth
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }} 
                           onClick={handleVerifyOTP}>Verify OTP</Button>
                </div>
                  
              ): (
              <Button
                type="submit"
                // fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={handleSendOTPButton}
              >
                Send OTP
              </Button>
              )}
              {/* <Button
                type="submit"
                // fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Back to Login
              </Button> */}
             
            
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Back to Login
                  </Link>
                </Grid>
                {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
            </Box>
           </> 
            ):(
              <>
              <Box component="form"
               onSubmit={handleProceedPwdUpdate} noValidate 
               sx={{ mt: 1 }}>
               
                
              <TextField
                margin="normal"
                required
                fullWidth
                disabled
                id="userid"
                label="Patient ID"
                name="userid"
                autoComplete="none"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="newpwd"
                label="Enter New Password"
                type="password"
                id="newpwd"
                autoComplete="newpwd"
                value={newpwd}
                onChange={handleNewPwdChange}
                // value={pwds.pwd1}
                
                // onChange={(e) => handleChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="newpwd2"
                label="Re-enter New Password to Confirm"
                type="password"
                id="newpwd2"
                // value={pwds.pwd2}
                autoComplete="newpwd2"
                value={newpwd2}
        onChange={handleNewPwd2Change}
                // onChange={(e) => handleChange(e)}
              />
                {match  ? (
        <p style={{ color: "green" }}>Passwords match!</p>
      ) : (
        <p style={{ color: "red" }}>Passwords do not match.</p>
      )}
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                
                <Button
                  type="submit"
                  // fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // onClick={handleSendOTPButton}
                >
                  Proceed Reset
                </Button>
               
              
                <Grid container>
                  <Grid item xs>
                    <Link href="/" variant="body2">
                      Back to Login
                    </Link>
                  </Grid>
                  {/* <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid> */}
                </Grid>
              </Box>
             </> 


            )}
          </Box>
        </Grid>
      </Grid>

      <Modal open={modalVisible} onClose={() => setModalVisible(false)}>
                {/*<div>{JSON.stringify(patientid)}</div>*/}

                <ModalDialog

                    color="primary"
                    size="lg"
                    variant="soft"
                >
                    {/*<ModalClose />*/}
                    <Typography  component="h2" level="inherit">
                        <strong>Password Updated Successfully !!</strong>
                    </Typography>
                    {/* <br />

                    <Typography id="variant-modal-description" textColor="inherit">
                        <i>Patient ID :</i> <strong>{patientid.pid}</strong>
                    </Typography> */}
                </ModalDialog>
            </Modal>
    
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
    </ThemeProvider>

    </>
  );
}