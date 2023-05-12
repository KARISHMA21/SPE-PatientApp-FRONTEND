import axios from "axios";

const PATIENT_API_BASE_URL = process.env.REACT_APP_PATIENT_BASE_URL_TO_CMS;

class GetStats {
    get_stats(token,pid) {
    
        const config = {
            headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
        }
       
        return axios.get(PATIENT_API_BASE_URL+"/get-stats/"+pid,config);
      }
}


const get_stats =new GetStats()
export default get_stats ;