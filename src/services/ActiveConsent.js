import axios from "axios";

const PATIENT_API_BASE_URL = process.env.REACT_APP_PATIENT_BASE_URL_TO_CMS;

class ActiveConsent {
  
  get_active_consent(token,pid) {
    
    const config = {
        headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
    }
   
    return axios.get(PATIENT_API_BASE_URL+"/get-active-consent/"+pid,config);
  }

  get_active_consent_records(token,pid,cid) {
    
    const config = {
        headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
    }
   
    return axios.get(PATIENT_API_BASE_URL+"/get-active-consent-records/"+pid+"/"+cid,config);
  }


  update_active_consent_records(token,body) {
    
    const config = {
        headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
    }
   
    return axios.put(PATIENT_API_BASE_URL+"/update-active-consent-records/",body,config);
  }

    revoke_active_consent(token,body) {
    
    const config = {
        headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
    }
   
    return axios.put(PATIENT_API_BASE_URL+"/revoke-active-consent/",body,config);
  }

  
}
const active_consent =new ActiveConsent()
export default active_consent ;