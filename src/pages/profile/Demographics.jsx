import * as React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import {FormControl, Grid, ModalClose, ModalDialog, Select} from "@mui/joy";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {toast, ToastContainer} from "react-toastify";
import reg from "../../services/PatientProfileService";
import PatientProfileService from "../../services/PatientProfileService";
import Modal from "@mui/material/Modal";
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MenuItem from "@mui/material/MenuItem";
import {InputLabel} from "@mui/material";

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function Demographics(props) {
    const theme = createTheme();
    const id=props.pid;
    const name=props.name;
    let nav=useNavigate();

    const [editing, setEditing] = useState(false);
    const [dob, setDob] = useState("");

    const [accountType, setaccountType] = useState("");
    const [confirmation, setconfirmation] = useState(false);
  
    const [modalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    const genderOptions = [
        {
            value: "Male",
            label: "Male",
        },
        {
            value: "Female",
            label: "Female",
        },
        {
            value: "Other",
            label: "Other",
        },
    ];

/* ---------------------------------------------------------*/

let token=localStorage.getItem(id)
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
   
    try {
    //   const response = await PatientProfileService.showprofiledetails(id,token);
      const response = await PatientProfileService.showprofiledetails(id,token);
      console.log(response);
      let res=response.data;
        const birthDate = Date.parse(res.dob);
        console.log( birthDate);
        const today = new Date();
        const diff = today - birthDate;
        const ageInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      res.age=ageInYears;
      // console.log(diff);
      setRecords(res);
      backupRecords(res);
    //   console.log(res.minor_incapacitated);
      if(res.minor_incapacitated==="Yes")
      {
          setaccountType("Dependent's Account");
      }
      else if(res.minor_incapacitated==="No")
          setaccountType("General Account");
    } catch (error) {
            console.log(error)
            nav("/")
           toast.error("Error Logging In!!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
          }
          setLoading(false);
          
        };
        fetchData();
      }, []);

    //   console.log("is minor"+records.minor);
   

    const handleEditButtonClick = () => {
        setEditing(true);
      };

      const handleChange = (e) => {
        const value = e.target.value;
       
        setRecords({ ...records, [e.target.name]: value });
    };

    const reset = (e) => {
        e.preventDefault();
        setRecords(prevrecords); 
        setEditing(false);


    };
    const handleCheckbox = (event) => {
        setconfirmation(event.target.checked);
    }
    const handleClose= (event) => {
        event.preventDefault();
        nav(`/home/${records.pid}/${records.name}`);

    }

    const handleSaveButtonClick = (e) => {
        // setEditing(false);
        // save changes to database or perform other actions
        setLoading(true);
        e.preventDefault();
        let data=
            {
                'pid': records.pid,
                'name': records.name,
                // 'uniqueid': records.uniqueid,
                // 'dob': records.dob,
                // 'age': records.age,
                'gender':records.gender,
                'email':records.email,
                'phone':records.phone,
                'address':records.address,
                // 'guardian_id':records.guardian_id
            }
        console.log(data);
        if(!data.name || !data.gender || !data.phone)
        {
            setLoading(false);
            alert("One or more required field empty" );
        }
        // else if(data.age<0)
        // {
        //     setLoading(false);
        //     alert("Invalid DOB please select correct date" );
        // }
        // else if(data.age<18  && !data.guardian_id)
        // {
        //     setLoading(false);
        //     alert("Guardian Id is mandatory for Minor/Incapacinated" );
        // }
        // console.log(JSON.parse(JSON.stringify(data)))
        // console.log(JSON.stringify(data));

            // do something with data
    else {
        // console.log(data);
        PatientProfileService.saveProfileUpdate(data, token)
                .then((response) => {
                    if (response.status === 200) {
                        setLoading(false);
                        // toast.success("Successfully Generated the record!!", {
                        //     position: "bottom-right",
                        //     autoClose: 2000,
                        //     hideProgressBar: false,
                        //     closeOnClick: true,
                        //     pauseOnHover: true,
                        //     draggable: true,
                        //     progress: undefined,
                        //
                        // })


                        console.log(response);
                        let res = response.data;

                        console.log(res);
                        // setpatientid(res);
                        // response.json().then((data) => {
                        //     setpatientid(data);
                        setModalVisible(true);
                        setEditing(false);
                        // });
                    }

                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
            // setLoading(false);
        }

      };

    // const handleDobChange = (event) => {
    //     // setDob(event.target.value);
    //     console.log("DOB updated"+event.target.value);
    //     // setRecords({ ...records, dob: "" });
    //     const value = event.target.value;
    //     setRecords(prevState => ({
    //       ...prevState,
    //       dob: value,
    //     }));
    //     setEditing(true);

    //     // Calculate age
    //     const birthDate = new Date(event.target.value);
    //     const today = new Date();
    //     const diff = today - birthDate;
    //     const ageInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    //     if(ageInYears<0) {
    //         alert("Invalid DOB please select correct Date of Birth")
    //         setRecords({ ...records, dob:records.dob, age:records.age});
           
    //     }
    //     else {
    //         setRecords({ ...records, dob: event.target.value, age:ageInYears});

    //         if (ageInYears < 18) {
    
    //             setRecords({ ...records,  age:ageInYears,setminor_incapacitated:true});
    //             setaccountType("Dependent's Account");

    //         } else {
    //             setRecords({ ...records,  age:ageInYears,setminor_incapacitated:false,guardian_id:""});
    //             setaccountType("General Account");
    //         }
    //     }

    // };

    // const handleAccountTypeChange = () => {
    //     if(records.minor_incapacitated==="Yes")
    //     {
    //         setaccountType("Dependent's Account");
    //     }
    //     else
    //         setaccountType("General Account");
    //   };
/*------------------------------------------------*/


    const [records,
        setRecords] = useState({
        'pid':"",
        'age':"",
        'dob':"",
        'name':"",
        'uniqueid':"",
        'gender':"",
        'email':"",
        'phone':"",
        'address':"",
        'guardian_id':"",
        'minor_incapacitated':""

    });
    const [prevrecords,
        backupRecords] = useState({
        'pid':"",
        'age':"",
        'dob':"",
        'name':"",
        'uniqueid':"",
        'gender':"",
        'email':"",
        'phone':"",
        'address':"",
        'guardian_id':"",
        'minor_incapacitated':""

    });
    
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="lg">
                    <CssBaseline />

            {/*<Typography variant="h6" gutterBottom>*/}
            {/*    Patient Registration*/}
            {/*</Typography>*/}
            <Grid container spacing={4} >
            <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="Name"
                        name="name"
                        label="Name"
                        value={records.name}
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        
                        InputProps={{
                            readOnly: !editing,
                          }}
                        onChange={(e) => handleChange(e)}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="PatientID"
                        disabled
                        name="pid"
                        label="Patient ID"
                        value={records.pid}
                        fullWidth
                        // autoComplete="given-name"
                        variant="standard"
                        
                        InputProps={{
                            readOnly: true,
                          }}
                        
                    />
                </Grid>
                <Grid item xs={12} sm={2.5}>
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Contact No."
                        value={records.phone}
                        fullWidth
                        autoComplete="phone"
                        variant="standard"
                        onChange={(e) => handleChange(e)}
                        InputProps={{
                            readOnly: !editing,
                          }}
                    />
                </Grid>

                {editing === false ?(
                <Grid item xs={12} sm={2.5}>
                    <TextField
                        // select
                        required
                        // id="gender"
                        name="gender"
                        label="Gender"
                        fullWidth
                        value={records.gender}
                        autoComplete="gender"
                        variant="standard"
                        
                        >
                       

                        InputProps={{
                         readOnly: !editing,
                        }}

                    </TextField>

                 
                </Grid>
                ):
                <Grid item xs={12} sm={2.5}>
                    <TextField
                        select
                        required
                        id="gender"
                        name="gender"
                        label="Gender"
                        fullWidth
                        value={records.gender}
                        autoComplete="gender"
                        variant="standard"
                        onChange={(e) => handleChange(e)}
                        >
                        {genderOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    </Grid>
                }
                
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        disabled
                        id="uniqueId"
                        name="uniqueid"
                        label="Unique ID"
                        value={records.uniqueid}
                        fullWidth
                        autoComplete="uid"
                        variant="standard"
                        
                        InputProps={{
                            readOnly: true,
                          }}
                        
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField

                        id="email"
                        name="email"
                        type="email"
                        label="Email Id"
                        value={records.email}
                        fullWidth
                        autoComplete="email"
                        variant="standard"
                        onChange={(e) => handleChange(e)}
                        InputProps={{
                            readOnly: !editing,
                          }}
                    />
                </Grid>
                <Grid item xs={12} sm={2.5}>

                <TextField
                    id="dob"
                    required
                    disabled
                    label="DOB"
                    type="date"
                    // defaultValue=
                    name="dob"
                    // value={dob}
                    value={records.dob}
                  
                    
                    sx={{ width: "100%"}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    // InputProps={{
                    //     readOnly: !editing,
                    //   }}
                      
                    // onChange={handleDobChange}
                />
                </Grid>

                <Grid item xs={12} sm={2.5}>

                    <TextField
                        id="age"
                        // disabled={true}
                        disabled
                        label="Age"
                        variant='standard'
                        // defaultValue=
                        name="age"
                        // value={age}
                        value={records.age}
                       
                        sx={{ width: "100%"}}
                        InputLabelProps={{
                            readOnly: true,

                        }}
                        // onChange={(e) => handleChange(e)}
                    />
                </Grid>
                
              
                
               
                <Grid item xs={12} sm={10}>
                    <TextField
                        id="address"
                        name="address"
                        label="Address"
                        value={records.address}
                        fullWidth
                        
                        variant="standard"
                        onChange={(e) => handleChange(e)}
                        InputProps={{
                            readOnly: !editing,
                          }}
                    />
                </Grid>
                
                {records.minor_incapacitated === 'Yes' ?(
                     
                    <Grid item xs={12} sm={2.5} >
                <TextField

                        
                        label="Account Type"
                        id="account-type"
                        name="minor"
                        required
                        disabled
                        // value="Dependent's Account"
                        value={accountType}
                        // fullWidth
                        variant="standard"
                       
                       
                    />
               </Grid>
              
              ):
              <Grid item xs={12} sm={2.5} >
              <TextField

                     
                      label="Account Type"
                      id="account-type"
                      name="minor"
                     
                      disabled
                      value="General Account"
                      fullWidth
                     
                      variant="standard"
                     
                      onChange={(e) => handleChange(e)}
                  />
                   </Grid>
              }

                {records.minor_incapacitated === 'Yes' && (
                     
                     <Grid item xs={16} sm={8} >
                 <TextField
        
                        id="guardian_id"
                        name="guardian_id"
                        required
                        label="Guardian's ID"
                        // fullWidth
                        disabled
                        value={records.guardian_id}
                         // fullWidth
                         width="10%"
                         variant="standard"
                         InputProps={{
                            readOnly: !editing,
                          }}
                         onChange={(e) => handleChange(e)}
                     />
                </Grid>
                
               
               )}
               {!editing &&  (
               <Grid item xs={1.7}>
       
                    <Button type="edit" variant="contained"  color="success" onClick={handleEditButtonClick}>
                        EDIT
                    </Button>
                
                
                </Grid>
                
              )}
                {editing && (
                <>
                    <Grid item xs={12} sm={2.5}>
                    <FormControlLabel
                        control={<Checkbox color="primary" required id="checkboxconfirm"
                                 checked={confirmation} onChange={handleCheckbox}/>}
                        label="Confirm Changes"
                     />

                    </Grid>
                    <Grid item xs={9}>
                     <Button variant="outlined"    onClick={reset}>
                     RESET
                     </Button>
                     </Grid>
                    <Grid item xs={12} sm={2.5}>
                    {loading ? (
                        <CircularProgress color="success" />
                    ) : (
                    <Button variant="contained"color="success" disabled={!confirmation} onClick={handleSaveButtonClick}>
                    Save Changes
                    </Button>
                     )}
                    </Grid>
                    
                    
                 </>
             )} 

             <Grid item xs={1.7}>

               
                    <Button type="back" variant="contained"   onClick={handleClose}>
                        CLOSE 
                    </Button>
                
                
                </Grid>   
                
                
            </Grid>
                </Container>
            </ThemeProvider>

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

            <Modal open={modalVisible} onClose={() => setModalVisible(false)}>
                {/*<div>{JSON.stringify(patientid)}</div>*/}

                <ModalDialog

                    color="primary"
                    size="lg"
                    variant="soft"
                >
                    {/*<ModalClose />*/}
                    <Typography  component="h2" level="inherit">
                        <strong>Updation Successful !!</strong>
                    </Typography>
                    {/* <br />

                    <Typography id="variant-modal-description" textColor="inherit">
                        <i>Patient ID :</i> <strong>{patientid.pid}</strong>
                    </Typography> */}
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}

export default Demographics;