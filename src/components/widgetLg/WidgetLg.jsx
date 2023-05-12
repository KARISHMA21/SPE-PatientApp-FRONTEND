import "./widgetLg.css";
import img from './home.jpg'
import Calendar from 'react-calendar';
import { useState } from "react";

import './Calendar.css';
export default function WidgetLg() {
  const [value, onChange] = useState(new Date());
  return (
   <div className="container"> 
   <div className="widgetLg-1">
    <b>Patient Dashboard</b>
       <img className="img" src={img}></img> 
     </div>
    <span className="widgetLg-2"> <Calendar className="cal" value={value} /></span>
   
    </div>
  );
}
