import "./topbar.css";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import patient_logout from "../../services/Logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import get_minors from "../../services/GetMinors";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button } from "@mui/material";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import patient_login from "../../services/SignIn";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid gray',
  boxShadow: 24,
  borderRadius:20,
  height:400,
  p: 10,
};

export default function Topbar(props) {
const pid=props.pid;
const patientname=props.name;
const nav=useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [minors, setMinors] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [name, setName] = React.useState(null);

React.useEffect(() => {
  setMinors(null)

 
}, [])


  const open = Boolean(anchorEl);
  const handleClick = (event) => {

    setAnchorEl(event.currentTarget);
    const getMinors=async()=>{
      const token = localStorage.getItem(pid)
      await get_minors.get_minors(token,pid)
      .then((response)=>{
        try{
        if(response.status===200&&response.data.length!==0){
        setMinors(response.data)
        
        }
        else
        setMinors(null)
        }

        catch(e){
          console.log(e)
          setMinors(null)
        }
        
      })

    }

    getMinors()
  };
  const [modalopen, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);


  const handleOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileSetting = () => {
    console.log("Profile setting ")
    nav("/profile/"+pid+"/"+patientname);
  };

  
  const handlePasswordReset = () => {
    console.log("Moving to Password Reset Portal ")
 
    toast.success("Redirecting to Password Reset Portal!!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

    setTimeout(() => {
      nav("/password-reset");
      }, 1000); // 5000 ms = 5 seconds



  };
  const handleLogout=()=>{
    let token =localStorage.getItem(pid);
    patient_logout.logout(token)
    .then((response) => {
      if (response.status === 200) {
        toast.success("Successfully logged in!!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        localStorage.removeItem(pid);

        nav(`/`);
     
      
      }
      
    })
    .catch((error) => {
      toast.error("Error Logging out!!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      
    });
  }




  const handleSubmit = (event) => {
    event.preventDefault();
    let token =localStorage.getItem(pid);
    patient_logout.logout(token)
    .then((response) => {
      if (response.status !== 200) {
        toast.warn("Could not switch!!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        
      }})
    handleModalClose();
    setMinors(null)
    const data = new FormData(event.currentTarget);
    const bodyParameters ={
      username: id,
      password: data.get('password'),
    };

   token =localStorage.getItem(id)
  console.log(bodyParameters)
  
  patient_login.login(bodyParameters,token)
  .then((response) => {
    console.log(response)
    console.log(response.status)
    if (response.status === 200) {

      toast.success("Successfully Switched the user!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      
      localStorage.setItem(response.data['pid'],response.data['token'])
      localStorage.removeItem(pid);
      nav(`/home/${response.data['pid']}/${response.data['name']}`);

      window.location.reload(true)

    }
    
  })
  .catch((error) => {
    toast.error("Error Logging In!!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    
  });

  };



  return (<>
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Hey, {props.name}!</span>
        </div>
        <div className="topRight">
        <Tooltip title="Account settings">
          <img src={`https://ui-avatars.com/api/?background=fff&name=${props.name}&length=1`} alt="" className="topAvatar"  onClick={handleClick} 
           aria-controls={open ? 'account-menu' : undefined}
           aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
          
          />
          </Tooltip>
        </div>
      </div>
    </div>

    <React.Fragment>
     
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {minors?
        <div>
       <b>&nbsp;Swtich Accounts:</b>
      { minors.map((m,i)=>(
        <MenuItem id={`id${i}`} onClick={()=>{setId(m.pid);setName(m.name);handleOpen()}}>
        &nbsp;&nbsp;<Avatar fontSize="small" id={i}  
        /> {m.name}
        </MenuItem>
      ))}
        <Divider />
        </div>:<></>}
        
        <MenuItem onClick={handleProfileSetting}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
        Profile Settings
        </MenuItem>
        
        <MenuItem onClick={handlePasswordReset}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
        Password Reset
        </MenuItem>
       
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    


    <div>
      <Modal
        open={modalopen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
        <b> Minor Account Switching </b> 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Minor ID : {id}<br/>
          Minor Name: {name}
          </Typography>
        <div> 
          <FormControl sx={{ m: 0, width: '28ch',top:30 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
          />
        </FormControl>
      
        </div>
        <div className="reject-btn">
      <Button className="btn" variant="contained" color="error"
       style={{top:40,left:80}}
       type="submit"
         >
      <strong>    Switch </strong> 
      </Button>
      </div>
        </Box>
      </Modal>
      
    </div>
    </React.Fragment>
  </>
  );
}
