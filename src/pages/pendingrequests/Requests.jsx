import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import PendingRequestsService from '../../services/PendingRequestsService';
import {useEffect, useState} from "react";
import moment from "moment/moment";
import RequestDetails from "./RequestDetails";

import {toast} from "react-toastify";
import img from "../../Loading_icon.gif";
export default function Requests(props) {
    moment.defaultFormat = "DD.MM.YYYY";
    const [records,setRecords]=useState([]);
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [itemSelected, setSelected] = useState([])
    const [buttonText, setButtonText] = useState('View');
    const [show, setShow] = useState(true);
    const [expanded, setExpanded] = React.useState("-1");

    const pid=props.pid;
    const name=props.name;
    const token=props.token;
    // {console.log(token)}
    const handleRecords=(e)=>{
        if(buttonText==="Minimize"){
            setShow(true)
            setButtonText("View")
        }
        else{
            setShow(false)
            setButtonText("Minimize")
            const fetchData = async () => {
                setLoading(true)
                await PendingRequestsService.getPendingRequestId(pid,token)
                    .then((response)=>{
                        let res=response.data['finalRecordsList']
                        setSelected(res)
                    })
                    .catch((e)=>{
                        console.log(e)
                    })
                setLoading(false);

            };
            fetchData();
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            // {console.log(props.pid)}
            setLoading(true);
            try {
                
                const response = await PendingRequestsService.getPendingRequestId(pid,token);
                console.log(response);
                let res=response.data;

                for(let i=0;i<res.length;i++){
                    res[i]['auto_id']=i;
                    res['accordionOpen']=false;
                }
                setRecords(res);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    },[])

    const handleRevoke=(pendingRequestId)=> {
        let x = Math.floor((Math.random() * 1000) + 1);
        const date = new Date();
        // let day = date.getDate();
        // let month = date.getMonth() + 1;
        // let year = date.getFullYear();
        
        // const currentDate =`${year}-${month}-${day}`;
        // const today=moment(currentDate).format('DD-MMM-YYYY')
        const body = {
            'cid': 'CID'+x,
            'action_taken_by':pid,
            'status': 'Rejected',
             'expiry_date': date,
                'rid':[]
        }
        const rejectConsent = async (body) => {
            await PendingRequestsService.update_consent_records(token,pendingRequestId, body)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success("Successfully Rejected the Request!!", {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                        window.location.reload(true)
                    } else {
                        toast.warn("Could not reject  Request!!", {
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
        rejectConsent(body)
        window.location.reload(true)
    }
    let props1 = {
        showRecords:true,
        info:records,
        pid:pid,
        name:name
    }
    const [style,setStyle] =useState();
    return (
        <div>
            {loading?<>{loading?<>
                <img src={img}></img>
            </>:<></>}</>:<></>}
            {!loading &&records.length===0?<>You have no pending consent requests</>:<></>}
            { !loading &&records.map((row,id) => (
            <Accordion expanded={expanded === row.auto_id}  >
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <table className="widgetLg" style={{backgroundColor:row.reason==='Emergency'?"#ff4d4d":"",
                        color:row.reason==='Emergency'?"white":""
                    }}>
                        <tr >
                            <td >
                                {/*{console.log(row)}*/}
                                <b>Pending Request ID </b>: {row.pendingRequestId}<br/>
                                <b>Requestor</b> : {row.requestor_name}<br/>
                                <b>Hospital</b> : {row.requestor_ename}
                            </td>
                            <td >
                                <div className="tags"><Button className="btn" variant="outlined" style={{color:row.reason==='Emergency'?"gray":"" ,
                                    borderColor:row.reason==='Emergency'?"white":"" ,  background:row.reason==='Emergency'?"white":"" ,
                                }}>{row.tag1}</Button></div>
                                <div className="tags" ><Button className="btn" variant="outlined" style={{color:row.reason==='Emergency'?"gray":"" ,
                                    borderColor:row.reason==='Emergency'?"white":"" ,  background:row.reason==='Emergency'?"white":"" ,
                                }}>{row.tag2}</Button></div>
                                <div className="tags"><Button className="btn"variant="outlined" style={{color:row.reason==='Emergency'?"gray":"" ,
                                    borderColor:row.reason==='Emergency'?"white":"" ,  background:row.reason==='Emergency'?"white":"" ,
                                }}>{row.tag3}</Button></div>
                            </td>
                            <td><b>Reason</b> : {row.reason}<br/>
                                {/*<br/><b>From</b> :{moment(row.request_date).calendar()}<br/>*/}
                                <b> From </b>: {moment(row.from_date).format('DD-MM-YYYY')}<br/>
                                <b> To </b>: {moment(row.to_date).format('DD-MM-YYYY')} <br/>
                                <b> Expires On </b>: {moment(row.expiry_date).format('DD-MMM-YYYY')} </td>
                            <td className="widgetLgStatus">
                                <div className="view-btn" >
                                    <Button className="btn" variant="outlined" id="id1"
                                            style={{color:row.reason==='Emergency'?"gray":"" ,
                                                background:row.reason==='Emergency'?"white":""

                                            }}
                                            onClick={(e) =>   {
                                            if(expanded==='-1')
                                                setExpanded(row.auto_id);
                                            else
                                                setExpanded('-1')
                                            row.accordionOpen=(!row.accordionOpen);

                                            handleRecords(row.cid)}}  >
<strong>{!row.accordionOpen?<>View</>:<>Minimize</>}</strong>                           

         </Button></div>
                   
         {!row.accordionOpen?
                                    <div className="reject-btn">
                                        <Button className="btn" variant="contained"
                                                color="error"
                                                style={{color:row.reason==='Emergency'?"white":"" ,
                                                    background:row.reason==='Emergency'?"black":""
                                                }}
                                                onClick={(e) =>  {e.stopPropagation();handleRevoke(row.pendingRequestId)}}  >
                                            <strong>     Reject </strong>
                                        </Button>
                                    </div>
                                    :(<></>)
                                }
                            </td>
                        </tr>
                    </table>
                </AccordionSummary>
                <AccordionDetails>
                        {/*{console.log(token)}*/}
                        {row.accordionOpen?   <RequestDetails {...props1.info[id]} token={token}  />:<></>}
                </AccordionDetails>
            </Accordion>
            ))}
        </div>
    )
}