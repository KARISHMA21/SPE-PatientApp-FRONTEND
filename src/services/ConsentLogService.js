import axios from "axios";

const PATIENT_API_BASE_URL = process.env.REACT_APP_PATIENT_BASE_URL_TO_CMS;

class ConsentLogService {

  
    getConsentLog(pid,token){
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        return axios.get(PATIENT_API_BASE_URL+"/get-consent-logs/"+pid,config);
        // return newData;
    }

}
const logs=new ConsentLogService()
export default logs ;