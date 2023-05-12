import axios from "axios";

const PATIENT_API_BASE_URL = process.env.REACT_APP_PATIENT_BASE_URL_TO_AUTH;


class PwdReset {
  
  validatereq(records) {
    
      return axios.post(PATIENT_API_BASE_URL+"/password-reset",  records);


  }

  validateOTP(records) {
    
    return axios.post(PATIENT_API_BASE_URL+"/validate-OTP",  records);
  }

  updatepwd(records) {
    
    return axios.post(PATIENT_API_BASE_URL+"/update-password",  records);
  }

}
const PwdRst =new PwdReset()
export default PwdRst ;