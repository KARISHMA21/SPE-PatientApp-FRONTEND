import "./sidebar.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PendingIcon from '@mui/icons-material/Pending';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VerifiedIcon from '@mui/icons-material/Verified';
import HistoryIcon from '@mui/icons-material/History';
import { Link } from "react-router-dom";
import {useState} from "react";

export default function Sidebar(props) {
  const pid=props.pid;
  const name=props.name;
  const [active1,setActive1]=useState('active');
  const [active2,setActive2]=useState('');
  const [active3,setActive3]=useState('');
  const [active4,setActive4]=useState('');
  const [active5,setActive5]=useState('');
  const buttonClickHandler = (e) => {
    let elem = document.querySelector('li.active');
    elem.classList.remove('active');
    e.currentTarget.classList.add('active');
    console.log(e.target.id)
    if(e.target.id==="1"){
      setActive1('active')
      setActive2('')
      setActive3('')
      setActive4('')
      setActive5('')

    }
    else if(e.target.id==="2"){
      setActive2('active')
      setActive1('')
      setActive3('')
      setActive4('')
      setActive5('')

    }
    else if(e.target.id==="3"){
      setActive3('active')
      setActive1('')
      setActive2('')
      setActive4('')
      setActive5('')

    }
    else if(e.target.id==="4"){
      setActive4('active')
      setActive1('')
      setActive2('')
      setActive3('')
      setActive5('')

    }
    else if(e.target.id==="5"){
      setActive1('')
      setActive2('')
      setActive3('')
      setActive4('')
      setActive5('active')



    }
};
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          {/* <h4 className="sidebarTitle1">Patient Dashboard</h4> */}
          <ul className="sidebarList">
          <Link to={`/home/${pid}/${name}`} className="link">
            <li  className={`sidebarListItem ${active1}`} onClick={buttonClickHandler} >
              <DashboardIcon className="sidebarIcon" />
              Dashboard
            </li>
            </Link>
            <Link to={`/activeconsent/${pid}/${name}`} className="link" >
              <li  className={`sidebarListItem ${active2}`} onClick={buttonClickHandler} >
              <AssignmentTurnedInIcon className="sidebarIcon" />
              Active Consents
            </li>
            </Link>
            <Link to={`/consentlog/${pid}/${name}`} className="link">
              <li  className={`sidebarListItem ${active3}`} onClick={buttonClickHandler} >
              <HistoryIcon className="sidebarIcon" />
              Consent Logs
            </li>
            </Link>
            <Link to={`/pendingrequests/${pid}/${name}`}  className="link">
              <li  className={`sidebarListItem ${active4}`} onClick={buttonClickHandler} >
                <PendingIcon className="sidebarIcon" />
                Pending Requests
              </li>
            </Link>
            <Link to={`/medicalhistory/${pid}/${name}`} className="link">
              <li  className={`sidebarListItem ${active5}`} onClick={buttonClickHandler} >
              <AssignmentIcon className="sidebarIcon" />
              
              Medical Records
            </li>
            </Link >
            <Link to={`/voluntaryconsent/${pid}/${name}`} className="link">
            <li className="sidebarListItem"  onClick={buttonClickHandler}>
              <VerifiedIcon className="sidebarIcon" />
              Voluntary Consents
            </li>
            </Link >
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Medical</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
         */}
      </div>
    </div>
  );
}
