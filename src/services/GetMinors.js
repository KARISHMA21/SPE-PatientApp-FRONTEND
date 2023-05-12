import axios from "axios";

const PATIENT_API_BASE_URL = process.env.REACT_APP_PATIENT_BASE_URL_TO_ADMIN;

class GetMinors {
    get_minors(token,pid) {
    
        const config = {
            headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
        }
       
        return axios.get(PATIENT_API_BASE_URL+"/get-minor-accounts/"+pid,config);
      }
}


const get_minors =new GetMinors()
export default get_minors ;