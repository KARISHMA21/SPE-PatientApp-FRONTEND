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
import { useEffect, useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import './medicalhistory.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import active_consent from '../../services/ActiveConsent';
import img from '../../Loading_icon.gif';
export default function ConsentedRecords(props) {
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
        width:'50%',
        scrollY:true,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        // boxShadow: 24,
        p: 4,
      };
   
      let token=localStorage.getItem(id)
      useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {

                let res=props.info;
                // setCount(res)



                for (let i = 0; i <res.length; i++) {
                    res[i]['auto_id']=i+1;
                    res[i]['isChecked']=false;
                    res[i]['gen_date']=   moment(res[i]['gen_date']).format('DD-MMM-YYYY')
                }
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

//revoke consent


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
      indx++;
    }


  }
  console.log(updatedListOfItems[0].eid)
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

  const date = new Date();
  let today = date.getDate();
  indx=0;
  for(let i=0;i<updatedListOfItems.length;i++){

      finalListOfItems[indx]={
        'cid':props.cid,
        'pid':id,
        'provider_eid':updatedListOfItems[indx].eid,
        'rid':updatedListOfItems[indx].rid,
        'active_flag':0,
        'last_update': moment(today).format('YYYY-MM-DD')
      }

      indx++;
  }

      console.log(finalListOfItems)
      const updateConsent=async(finalListOfItems)=>{
        await active_consent.update_active_consent_records(token,finalListOfItems)
    .then((response)=>{
      console.log(finalListOfItems)
      if(response.status===200){
        toast.success("Successfully revoked the consent for selected records!!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        window.location.reload(true)
      }
      else{
        toast.warn("Could not revoke consent for the records!!", {
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

    })

      }


updateConsent(finalListOfItems)
}

  return (
    <>
     {loading?<>
        <img src={img}></img>
        </>:<></>}
        {props.showRecords? <h4>Select the records you want to share : </h4>:<></>}
        {records?<>
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

    </>:<><br/>No Records Found </>}



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
             <FormControlLabel control={<Checkbox required id="checkbox" className="checkbox" checked={checked}  onChange={handleCheckbox} />} label="Are you sure you want to  revoke the consent ?" />
             <br/>
             <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
             <br/>
          <Button variant="contained" disabled={!agreement}  color="success" onClick={handleData}>
             Proceed
          </Button>

          <Button variant="outlined"  sx={{marginLeft:2}} onClick={reset}  >
          Clear
          </Button>

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