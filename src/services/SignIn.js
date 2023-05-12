import axios from "axios";

const PATIENT_API_BASE_URL = process.env.REACT_APP_PATIENT_BASE_URL_TO_AUTH;


class SignIn {
  
  login (records,token) {
    
    if(token===""){
      const config = {
        headers: { Authorization: `Bearer ${token}` ,'Access-Control-Allow-Origin': '*'}
    };
    config.headers["Access-Control-Allow-Origin"]='*';
    config.headers['Access-Control-Allow-Credentials']= 'true';
      return axios.post(PATIENT_API_BASE_URL+"/authenticate",  records, config);
  }
  else{
    return axios.post(PATIENT_API_BASE_URL+"/authenticate",  records);
  }


  }


}
const patient_login =new SignIn()
export default patient_login ;