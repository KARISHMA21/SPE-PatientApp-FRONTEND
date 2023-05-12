import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';
import active_consent from '../../services/ActiveConsent';
import moment from 'moment';
import './activeconsent.css';
import img from '../../Loading_icon.gif';
import ConsentedRecords from './ConsentedRecords';
function Consents() {
    const [records,setRecords]=React.useState([]);
    // const [accordionOpen, setAccordionOpen] = React.useState(false);
    const [buttonText, setButtonText] = React.useState('View');
    const [loading, setLoading] = React.useState(true);
    const {pid, name} = useParams();
    const [itemSelected, setSelected] = React.useState([])
    // const [accordionOpen, setAccordionOpen] =  React.useState(false)
    const [expanded, setExpanded] = React.useState("-1");
    const token=localStorage.getItem(pid);


  //Handle the button actions
    const handleRecords=(cid)=>{
        if(buttonText==="Minimize"){
        setButtonText("View")
        }
        else{
        setButtonText("Minimize")


        const fetchData = async () => {
          setLoading(true);

          await active_consent.get_active_consent_records(token,pid,cid)
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



// eslint-disable-next-line
      React.useEffect(() => {

        const fetchData = async () => {
          setLoading(true);

          await active_consent.get_active_consent(token,pid)
        .then((response)=>{

            let res=response.data['activeConsentsList']
            for(let i=0;i<res.length;i++){
              res[i]['auto_id']=i;
              res['accordionOpen']=false;
            }

            // console.log(res)
            setRecords(res);
        })
        .catch((e)=>{
            console.log(e)
        })
        setLoading(false);

      };
      fetchData();
      }, [])
      

    const handleRevoke=(cid)=>{
      const body={
        'cid':cid,
        'pid':pid

      }
      const updateConsent=async(body)=>{
        await active_consent.revoke_active_consent(token,body)
    .then((response)=>{

      if(response.status===200){
        toast.success("Successfully revoked the consent!!", {
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
        toast.warn("Could not revoke consent!!", {
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


updateConsent(body)


      window.location.reload(true)
    }
    let props = {
        showRecords:true,
       info:itemSelected,
       pid:pid,
       name:name,

      }

      // const handleChange=(auto_id)=>async(event,newExpanded
      // ) =>{
      //   setExpanded(newExpanded ? auto_id : false);

      // }
  const [style,setStyle] =React.useState();



  return (
    <div>
      {loading?<>{loading?<>
        <img src={img}></img>
        </>:<></>}</>:<></>}
      {!loading &&records.length===0?<>No Active Consents Given</>:<></>}

      { !loading &&records.map((row,id) => (

      // <Accordion expanded={row.accordionOpen}   onClick={(e) =>  {e.stopPropagation();}}>
         <Accordion
            // sx={style}

         expanded={expanded === row.auto_id} onClick={(e) =>  {e.stopPropagation();}}>

        <AccordionSummary
        //   expandIcon={<ExpandMoreIcon />}

          aria-controls={id}
          id={id}
          onClick={(e) =>  {e.stopPropagation();}
        }

        >
         <table className="widgetLg"
           style={{backgroundColor:row.status==='Emergency'?"#ff4d4d":"",
           color:row.status==='Emergency'?"white":""
           }}

         >
        <tr >
          <td className='td-col1' >
              <b>Consent ID </b>: {row.cid}<br/>

              <b>Accessor</b> : {row.accessor_name}<br/>
              <b>Hospital</b> : {row.accessing_ename}
          </td>

          <td className='td-tags'>
                  <div className="tags"><Button className="btn"
                  style={{color:row.status==='Emergency'?"gray":"" ,
                  borderColor:row.status==='Emergency'?"white":"" ,  background:row.status==='Emergency'?"white":"" ,

                }}

                  variant="outlined">{row.tag1}</Button></div>
                  <div className="tags" ><Button className="btn"
                  style={{color:row.status==='Emergency'?"gray":"" ,
                  borderColor:row.status==='Emergency'?"white":"" ,  background:row.status==='Emergency'?"white":""

                }}
                  variant="outlined">{row.tag2}</Button></div>
                  <div className="tags"><Button className="btn"
                  style={{color:row.status==='Emergency'?"gray":"" ,
                  borderColor:row.status==='Emergency'?"white":"" ,  background:row.status==='Emergency'?"white":""

                }}

                  variant="outlined">{row.tag3}</Button></div>
         </td>
          <td className='td-reason'><b>Reason</b> : {row.reason}
               <br/><b>Consent Given on</b> : {moment(row.create_date).format('DD/MM/YYYY')} <br/>
               <b> Consent Expires on </b>: {moment(row.expiry_date).format('DD/MM/YYYY')} </td>

          <td className="widgetLgStatus">
            <div className="view-btn">
          <Button className="btn"
          style={{color:row.status==='Emergency'?"gray":"" ,
          background:row.status==='Emergency'?"white":""

        }}
          variant="outlined" id="id1" onClick={(e) =>
          {
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
      <Button className="btn" variant="contained" color="error"
      style={{color:row.status==='Emergency'?"white":"" ,
          background:row.status==='Emergency'?"black":""

        }}  onClick={(e) =>  {e.stopPropagation();handleRevoke(row.cid)}}  >
      <strong>     Revoke </strong>
      </Button>
      </div>
      :(<></>)
      }

          </td>
        </tr  >
        </table>
        </AccordionSummary>

        <AccordionDetails >
          <Typography>
      <ConsentedRecords {...props} cid={row.cid}/>
          {/* <Records {...props}   /> */}
          </Typography>
        </AccordionDetails>

      </Accordion>
      ))
    }
    {records?<></>:<>No Active consent found </>}

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
  )
}

export default Consents