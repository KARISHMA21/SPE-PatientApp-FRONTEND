import axios from "axios";

const PAT_API_BASE_URL = process.env.REACT_APP_PATIENT_BASE_URL_TO_CMS;

class VoluntaryConsentService {
  
  saveVoluntaryConsent (records,token) {
    if(token!==""){
      const config = {
           headers: { 'Authorization': `Bearer ${token}`}
       };
      return axios.post(PAT_API_BASE_URL+"/send-voluntary-consent", records,config);
    }

  }


}
const voluntaryConsentService=new VoluntaryConsentService()
export default voluntaryConsentService ;