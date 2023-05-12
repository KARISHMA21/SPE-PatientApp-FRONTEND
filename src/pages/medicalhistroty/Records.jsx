import  * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import MedicalRecordsService from "../../services/MedicalRecordsService";
import { useEffect, useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './medicalhistory.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import voluntaryConsentService from '../../services/VoluntaryConsent'
import moment from 'moment/moment';

import { useNavigate } from 'react-router-dom';
import img from '../../Loading_icon.gif';
import RecordsPerConsentService from "../../services/RecordsPerConsentService";

export default function Records(props) {
  let nav=useNavigate();
// console.log(props)
//Record fetch
    const id=props.pid;
    const name=props.name;
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState(null);
    const [agreement, setAgreement] = useState(false);
    const [isChecked, setisChecked] = useState(false);// select all
    const [checked, setChecked] = useState(false);// consent approval

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        scrollY: true,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        // boxShadow: 24,
        p: 4,
    };

    let token = localStorage.getItem(id)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await MedicalRecordsService.getMedicalRecordsId(id, token);
                let res = response.data['finalRecordsList'];
                // setCount(res)


            for (let i = 0; i <res.length; i++) {
              res[i]['auto_id']=i+1;
              res[i]['isChecked']=false;
              res[i]['gen_date']=   moment(res[i]['gen_date']).format('DD-MMM-YYYY')
            }
            console.log(res)
            setRecords(res);
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

      const [itemSelected, setSelected] = useState([])
      

      const [modalOpen, setModalOpen] = useState(false)
      const handleClose = () => setModalOpen(false);

      const openModal = (item) =>{
        
          console.log(item)
          const Item = records.filter((obj) => obj.auto_id === item)
          console.log(Item)
          setSelected(Item)
          setModalOpen(true)
      }
      // console.log(itemSelected)


  const handleCheckbox = (event) => {
    setChecked(!checked)
    setAgreement(event.target.checked);
  }



//Voluntary consent 


const updateListOfItems = (itemIndex, isChecked) => {
  const updatedListOfItems = [...records];
  updatedListOfItems[itemIndex].isChecked = isChecked;
  setRecords(updatedListOfItems);
}

const display=(e)=>{
  const updatedListOfItems = [...records];
  for(let i=0;i<records.length;i++){
  updatedListOfItems[i].isChecked = (!isChecked);
  }
  setisChecked(!isChecked)
  setRecords(updatedListOfItems);

}

const reset=()=>{
  const updatedListOfItems = [...records];
  for(let i=0;i<records.length;i++){
  updatedListOfItems[i].isChecked = false;
  }
  setisChecked(false);
  setChecked(false);
  setAgreement(false);
  setRecords(updatedListOfItems);
}

const handleData=()=>{
  let updatedListOfItems=[] ;
  let finalListOfItems=[] ;
  let indx=0;
  props.info['pid']=id
  for(let i=0;i<records.length;i++){
    if(records[i].isChecked===true){
      updatedListOfItems[indx]=records[i];  
      updatedListOfItems[indx]['accessor_id']=props.info['accessor_id'];
      updatedListOfItems[indx]['entity']=props.info['entity'];
      updatedListOfItems[indx]['exp_date']=props.info['exp_date'];
      updatedListOfItems[indx]['pid']=props.info['pid'];
      updatedListOfItems[indx]['tag11']=props.info['tag1'];
      updatedListOfItems[indx]['tag12']=props.info['tag2'];
      updatedListOfItems[indx]['tag13']=props.info['tag3'];
      updatedListOfItems[indx]['accessor_name']=props.info['accessor_name'];
      updatedListOfItems[indx]['accessing_ename']=props.info['accessing_ename'];

      indx++;
    }
   
 
  }
  console.log(updatedListOfItems)
  if(indx===0){

    toast.warn("No records selected!!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    return;
  }
  if(updatedListOfItems[0]['accessor_id']===""||updatedListOfItems[0]['exp_date']===""||updatedListOfItems[0]['entity']===""
  ||updatedListOfItems[0]['tag11']===""||updatedListOfItems[0]['tag12']===""||updatedListOfItems[0]['tag13']===""
  ||updatedListOfItems[0]['accessor_name']===""||updatedListOfItems[0]['accessing_ename']===""
  
  ){

    toast.warn("Please enter all the details!!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    return;
  }
  indx=0; 
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  
  const currentDate =`${year}-${month}-${day}`;
  let x = Math.floor((Math.random() * 1000) + 1);
  for(let i=0;i<updatedListOfItems.length;i++){
    
      finalListOfItems[indx]={
        'cid':'CID'+x,
        'pid':updatedListOfItems[indx]['pid'],
     'accessor_id':updatedListOfItems[indx]['accessor_id'],
     'accessing_eid':updatedListOfItems[indx]['entity'],
     'last_update':currentDate,
     'status':'Active',
     'create_date':currentDate,
     'expiry_date':updatedListOfItems[indx]['exp_date'],
     'action_taken_by':updatedListOfItems[indx]['pid'],
     'reason':'Self Consent',
     'rid':updatedListOfItems[indx]['rid'],
     'record_creator_id':updatedListOfItems[indx]['did'],
     'provider_eid':updatedListOfItems[indx]['eid'],
     'tag1':updatedListOfItems[indx]['tag1'],
     'tag2':updatedListOfItems[indx]['tag2'],
     'tag3':updatedListOfItems[indx]['tag3'],
     'consent_tag1':updatedListOfItems[indx]['tag11'],
     'consent_tag2':updatedListOfItems[indx]['tag12'],
     'consent_tag3':updatedListOfItems[indx]['tag13'],
     'accessor_name':updatedListOfItems[indx]['accessor_name'],
     'accessing_ename':updatedListOfItems[indx]['accessing_ename'],
     'active_flag':'1'
  }
      
      indx++;
  }

 console.log(finalListOfItems)


        voluntaryConsentService.saveVoluntaryConsent(finalListOfItems, token)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Successfully provided voluntary consent!!", {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
                reset()
                // nav(`/home/${id}/${name}`)
            })
            .catch((error) => {
                // console.log(error)
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

            });

        RecordsPerConsentService.saveRecordsPerConsent(finalListOfItems, token)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Successfully selected records!!", {
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

            });
    }
  return (
    <>
        {props.showRecords? <h4>Select the records you want to share : </h4>:<></>}
        {loading?<>
        <img src={img}></img>
        </>:<></>}
        {!loading&&records.length===0?<>No Records found</>:<></>}

        {!loading && records.length!==0?<>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550}} aria-label="simple table">
        <TableHead sx={{ backgroundColor:"whitesmoke" }}>
          <TableRow>
                     {props.showRecords?   <TableCell align="left"><Checkbox
                     checked={isChecked}
                     onClick={display}
                     ></Checkbox></TableCell>:<></>}

            <TableCell sx={{ minWidth: 150}}> Date</TableCell>
            <TableCell align="left">Generated By</TableCell>
            <TableCell align="left">Hospital Name</TableCell>
            <TableCell align="left">Record Type</TableCell>
            <TableCell align="left">Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor:"white" }}>
          { !loading &&records.map((row,id) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              
              {props.showRecords?<TableCell align="left"><Checkbox key={id}
          type="checkbox"
          checked={row.isChecked}
          id={id}
          // onChange={()=>{setChecked(!checked)}}
          onChange={() => updateListOfItems(id, !row.isChecked)}
          ></Checkbox></TableCell>:<></>}
              <TableCell component="th" scope="row">
                {row.gen_date
                
                }
              </TableCell>
              <TableCell align="left">Dr. {row.dname}</TableCell>
              <TableCell align="left">{row.ename+" "+row.etype}</TableCell>
              <TableCell align="left"><Button onClick = {() => {openModal(row.auto_id)
               
              // setSelected(row.auto_id)
              }}>{row.rec_type}</Button>


      </TableCell>
              <TableCell align="left"><button className='button'>{row.tag1}</button><button className='button'>{row.tag2}</button><button className='button'>{row.tag3}</button></TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </>:<> </>}


    
    {modalOpen&&itemSelected ?(
<Modal
        keepMounted
        
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        className={id}
        open ={modalOpen}
        
      >
        
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            {itemSelected[0].rec_type}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 ,whiteSpace:"pre"}}>
          <strong>Date : </strong>{itemSelected[0].gen_date} <br/>
          <strong>Generated By :</strong>Dr. {itemSelected[0].dname}<br/>
          <strong>Tags : </strong><button className='button'>{itemSelected[0].tag1}</button><button className='button'>{itemSelected[0].tag2}</button><button className='button'>{itemSelected[0].tag3}</button>

            <br/>{itemSelected[0].desc.split("<br/>")}
           
          </Typography>
         <Button sx={{ mx: 38 }} variant="contained" className='btn btn-primary' startIcon={<CloseIcon/>} onClick={handleClose}>Close</Button>
        </Box>

      </Modal>):<></>}


     {props.showRecords? 
     
     <div className='consent-given'> <br/><br/>
             <FormControlLabel control={<Checkbox required id="checkbox" className="checkbox" checked={checked}  onChange={handleCheckbox} />} label="  I hereby declare that the entity will have the access to the medical records I am sharing until I revoke access or consent expires." />
             <br/>
             <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
             <br/>
          <Button variant="contained" disabled={!agreement}  color="success" onClick={handleData}>
             Proceed     
          </Button>
          
          <Button variant="outlined"  sx={{marginLeft:2}} onClick={reset}  >
          Clear
          </Button>
          <br/>          <br/>
          <br/>

        </div>
        </div> :<></>}
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