import axios from "axios";

const PATIENT_API_BASE_URL = process.env.REACT_APP_PATIENT_BASE_URL_TO_AUTH;

class Logout {
  
  logout (token) {
    
    const config = {
        headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
    }
    const body ={};
    return axios.post(PATIENT_API_BASE_URL+"/logout",body,config);
  }


  
}
const patient_logout =new Logout()
export default patient_logout ;