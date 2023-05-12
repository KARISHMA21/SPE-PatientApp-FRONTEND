import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useEffect, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
// import RecordsPerConsentService from "../../../services/RecordsPerConsentService";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecordsPerConsentService from "../../services/RecordsPerConsentService";
import moment from "moment";
import pendingRequestsService from "../../services/PendingRequestsService";

export default function RequestDetails(props) {
    const pid =props.pid;
    const id = props.pendingRequestId;
    // console.log(props)
    const exp_date=props.expiry_date;
     const token=props.token;
    let count = 0;
    // const [recordsselected, setRecordsselected] = useState(null);



    const [agreement, setAgreement] = useState(false);
    const [isChecked1, setisChecked1] = useState(false);// select all
    const [isChecked2, setisChecked2] = useState(false);// select all
    const [isChecked3, setisChecked3] = useState(false);// select all

    const [checked, setChecked] = useState(false);// consent approval
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState(null);
    const [l1, setL1] = useState(null);
    const [l2, setL2] = useState(null);
    const [l3, setL3] = useState(null);
    const [l4, setL4] = useState(null);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: ' 50%',
        scrollY: true,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        // boxShadow: 24,
        p: 4,
    };
    const handleCheckbox = (event) => {
        setChecked(!checked)
        setAgreement(event.target.checked);
    }
    const updateListOfItems = (itemIndex, isChecked) => {
        const updatedListOfItems = [...l4];
        updatedListOfItems[itemIndex].isChecked = isChecked;
        setL4(updatedListOfItems)
        // setRecordsselected(updatedListOfItems);
       
    }
    const reset = () => {
        const updatedListOfItems = [...l4];
        for (let i = 0; i < l4.length; i++) {
            updatedListOfItems[i].isChecked = false;
        }
        setisChecked1(false);
        setisChecked2(false);
        setisChecked3(false);
        setChecked(false);
        setAgreement(false);
        setL4(updatedListOfItems)
        // setRecordsselected(updatedListOfItems);
    }
    const handleData = () => {
        
        const length=l1.length+l2.length+l3.length
        // console.log(l4);
        let updatedListOfItems = [];
        let finalListOfItems;
        let indx = 0;
        for (let i = 0; i < l4.length; i++) {
            if (l4[i].isChecked === true) {
                updatedListOfItems[indx] = l4[i];
                indx++;
            }
        }
        console.log(updatedListOfItems)

        if(updatedListOfItems.length===0){
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
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        
        const currentDate =`${year}-${month}-${day}`;
        let x = Math.floor((Math.random() * 1000000) + 1);

        finalListOfItems={
            'cid': 'CID'+x,
            'action_taken_by':pid,
            'status': 'Active',
            'expiry_date':exp_date,
     }
     let rid=[]
     indx=0;

        for(let i=0;i<updatedListOfItems.length;i++){
            rid[indx]=[updatedListOfItems[i]['rid'],updatedListOfItems[i]['did'],updatedListOfItems[i]['eid']]
            indx++;
        }
        finalListOfItems['rid']=rid
        console.log(finalListOfItems)
        const updateConsent=async(finalListOfItems)=>{
            await pendingRequestsService.update_consent_records(token,id,finalListOfItems)
                .then((response)=>{
                    console.log(finalListOfItems)
                    if(response.status===200){
                        toast.success("Successfully given the consent for selected records!!", {
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
                        toast.warn("Could not give consent for the records!!", {
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
        updateConsent(finalListOfItems);
       

    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await RecordsPerConsentService.getPendingRequestIdDetails(pid, id,token);
                let res = response.data;
                setRecords(res);
                for (let i = 0; i < res.length; i++) {
                    for (let j = 0; j < res[i]['finalRecordsList'].length; j++) {
                        count = count + 1;
                        res[i]['finalRecordsList'][j]['auto_id'] = count;
                        res[i]['finalRecordsList'][j]['isChecked'] = false;
                        res[i]['finalRecordsList'][j]['gen_date'] =  moment(res[i]['finalRecordsList'][j]['gen_date']).format('DD-MMM-YYYY');
                    }
                }
                setL1(res[0]['finalRecordsList']);
                setL2(res[1]['finalRecordsList']);
                setL3(res[2]['finalRecordsList']);
                setL4([...res[0]['finalRecordsList'], ...res[1]['finalRecordsList'], ...res[2]['finalRecordsList']])
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData()
    }, []);
    const [itemSelected, setSelected] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const handleClose = () => setModalOpen(false);
    const openModal = (item) => {
        const Item = l4.filter((obj) => obj.auto_id === item)
        setSelected(Item)
        setModalOpen(true)
    }
    const display1=(e)=>{
        const updatedListOfItems = [...l1];
        for(let i=0;i<l1.length;i++){
            updatedListOfItems[i].isChecked = (!isChecked1);
        }
        setisChecked1(!isChecked1)

        setL1(updatedListOfItems);
        setL4(updatedListOfItems.concat(l2, l3))

    }
    const display2=(e)=>{
        const updatedListOfItems = [...l2];
        for(let i=0;i<l2.length;i++){
            updatedListOfItems[i].isChecked = (!isChecked2);
        }
        setisChecked2(!isChecked2)
        setL2(updatedListOfItems);
        setL4(l1.concat(updatedListOfItems, l3))


    }
    const display3=(e)=>{
        const updatedListOfItems = [...l3];
        for(let i=0;i<l3.length;i++){
            updatedListOfItems[i].isChecked = (!isChecked3);
        }
        setisChecked3(!isChecked3)
        setL3(updatedListOfItems);
        setL4(l1.concat(l2, updatedListOfItems))
    }
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography>Records matching tags in timeline</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 550}} aria-label="simple table">
                                <TableHead sx={{backgroundColor: "whitesmoke"}}>
                                    <TableRow>
                                        <TableCell align="left"><Checkbox
                                            checked={isChecked1}
                                            onClick={display1}
                                        ></Checkbox></TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="left">Generated By</TableCell>
                                        <TableCell align="left">Hospital Name</TableCell>
                                        <TableCell align="left">Record Type</TableCell>
                                        <TableCell align="left">Tags</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{backgroundColor: "white"}}>
                                    {!loading && l1.map((row, id) => (
                                        
                                            <TableRow
                                                key={id}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                <TableCell align="left"><Checkbox key={id}
                                                                                  type="checkbox"
                                                                                  checked={row.isChecked}
                                                                                  id={id}// onChange={()=>{setChecked(!checked)}}
                                                                                  onChange={() => updateListOfItems((id), !row.isChecked)}
                                                ></Checkbox></TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.gen_date}
                                                </TableCell>
                                                <TableCell align="left">Dr. {row.dname}</TableCell>
                                                <TableCell align="left">{row.ename + " " + row.etype}</TableCell>
                                                <TableCell align="left"><Button onClick={() => {
                                                    openModal(row.auto_id)
                                                }}>{row.rec_type}</Button>
                                                </TableCell>
                                                <TableCell align="left"><button className='button'>{row.tag1}</button><button className='button'>{row.tag2}</button><button className='button'>{row.tag3}</button></TableCell>
                                            </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {modalOpen && itemSelected ? (
                            <Modal
                                keepMounted
                                onClose={handleClose}
                                className={id}
                                open={modalOpen}>
                                <Box sx={style}>
                                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                        {itemSelected[0].rec_type}
                                    </Typography>
                                    <Typography id="keep-mounted-modal-description" sx={{mt: 2, whiteSpace: "pre"}}>
                                        <strong>Date : </strong>{itemSelected[0].gen_date} <br/>
                                        <strong>Generated By :</strong>Dr. {itemSelected[0].dname}<br/>
                                        <strong>Tags : </strong>{itemSelected[0].tags}
                                        <br/>{itemSelected[0].desc.split("<br/>")}
                                    </Typography>
                                    <Button sx={{mx: 38}} variant="contained" className='btn btn-primary'
                                            startIcon={<CloseIcon/>} onClick={handleClose}>Close</Button>
                                </Box>
                            </Modal>) : <></>}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <br/>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header">
                    <Typography>Records not matching tag and but matching timeline</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 550}} aria-label="simple table">
                                <TableHead sx={{backgroundColor: "whitesmoke"}}>
                                    <TableRow>
                                        <TableCell align="left"><Checkbox
                                            checked={isChecked2}
                                            onClick={display2}
                                        ></Checkbox></TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="left">Generated By</TableCell>
                                        <TableCell align="left">Hospital Name</TableCell>
                                        <TableCell align="left">Record Type</TableCell>
                                        <TableCell align="left">Tags</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{backgroundColor: "white"}}>
                                    {!loading && l2.map((row, id) => (
                                       
                                            <TableRow
                                                key={id}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                <TableCell align="left"><Checkbox key={id}
                                                                                  type="checkbox"
                                                                                  checked={row.isChecked}
                                                                                  id={(id+l1.length)}// onChange={()=>{setChecked(!checked)}}
                                                                                  onChange={() => updateListOfItems((id+l1.length), !row.isChecked)}
                                                ></Checkbox></TableCell>                                                <TableCell component="th" scope="row">
                                                {row.gen_date}
                                            </TableCell>
                                                <TableCell align="left">Dr. {row.dname}</TableCell>
                                                <TableCell align="left">{row.ename + " " + row.etype}</TableCell>
                                                <TableCell align="left"><Button onClick={() => {
                                                    openModal(row.auto_id)
                                                }}>{row.rec_type}</Button>
                                                </TableCell>
                                                <TableCell align="left"><button className='button'>{row.tag1}</button><button className='button'>{row.tag2}</button><button className='button'>{row.tag3}</button></TableCell>
                                            </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {modalOpen && itemSelected ? (
                            <Modal
                                keepMounted
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                className={id}
                                open={modalOpen}>
                                <Box sx={style}>
                                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                        {itemSelected[0].rec_type}
                                    </Typography>
                                    <Typography id="keep-mounted-modal-description" sx={{mt: 2, whiteSpace: "pre"}}>
                                        <strong>Date : </strong>{itemSelected[0].gen_date} <br/>
                                        <strong>Generated By :</strong>Dr. {itemSelected[0].dname}<br/>
                                        <strong>Tags : </strong>{itemSelected[0].tags}
                                        <br/>{itemSelected[0].desc.split("<br/>")}
                                    </Typography>
                                    <Button sx={{mx: 38}} variant="contained" className='btn btn-primary'
                                            startIcon={<CloseIcon/>} onClick={handleClose}>Close</Button>
                                </Box>
                            </Modal>) : <></>}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <br/>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Records not in timeline</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 550}} aria-label="simple table">
                                <TableHead sx={{backgroundColor: "whitesmoke"}}>
                                    <TableRow>
                                        <TableCell align="left"><Checkbox
                                            checked={isChecked3}
                                            onClick={display3}
                                        ></Checkbox></TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="left">Generated By</TableCell>
                                        <TableCell align="left">Hospital Name</TableCell>
                                        <TableCell align="left">Record Type</TableCell>
                                        <TableCell align="left">Tags</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{backgroundColor: "white"}}>
                                    {!loading && l3.map((row, id) => (
                                       
                                            <TableRow
                                                key={id}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                <TableCell align="left"><Checkbox key={id}
                                                                                  type="checkbox"
                                                                                  checked={row.isChecked}
                                                                                  id={(id+l1.length+l2.length)}// onChange={()=>{setChecked(!checked)}}
                                                                                  onChange={() => updateListOfItems((id+l1.length+l2.length), !row.isChecked)}
                                                ></Checkbox></TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.gen_date}
                                                </TableCell>
                                                <TableCell align="left">Dr. {row.dname}</TableCell>
                                                <TableCell align="left">{row.ename + " " + row.etype}</TableCell>
                                                <TableCell align="left"><Button onClick={() => {
                                                    openModal(row.auto_id)
                                                }}>{row.rec_type}</Button>
                                                </TableCell>
                                                <TableCell align="left"><button className='button'>{row.tag1}</button><button className='button'>{row.tag2}</button><button className='button'>{row.tag3}</button></TableCell>
                                            </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {modalOpen && itemSelected ? (
                            <Modal
                                keepMounted
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                className={id}
                                open={modalOpen}>
                                <Box sx={style}>
                                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                        {itemSelected[0].rec_type}
                                    </Typography>
                                    <Typography id="keep-mounted-modal-description" sx={{mt: 2, whiteSpace: "pre"}}>
                                        <strong>Date : </strong>{itemSelected[0].gen_date} <br/>
                                        <strong>Generated By :</strong>Dr. {itemSelected[0].dname}<br/>
                                        <strong>Description : </strong>{itemSelected[0].tags}
                                        <br/>{itemSelected[0].desc.split("<br/>")}
                                    </Typography>
                                    <Button sx={{mx: 38}} variant="contained" className='btn btn-primary'
                                            startIcon={<CloseIcon/>} onClick={handleClose}>Close</Button>
                                </Box>
                            </Modal>) : <></>}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <div className='consent-given'><br/><br/>
                <FormControlLabel control={<Checkbox required id="checkbox" className="checkbox" checked={checked}
                                                     onChange={handleCheckbox}/>}
                                  label="  I hereby declare that the entity will have the access to the medical records I am sharing until I revoke access or consent expires."/>
                <br/>
                <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
                    <br/>
                    <Button variant="contained" disabled={!agreement} color="success" onClick={handleData}>
                        Accept
                    </Button>
                    <Button variant="outlined" sx={{marginLeft: 2}} onClick={reset}>
                        Clear
                    </Button>
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
        </div>
    );
}
