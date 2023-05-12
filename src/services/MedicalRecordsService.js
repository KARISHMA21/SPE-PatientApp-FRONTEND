import axios from "axios";

const ADMIN_API_BASE_URL =process.env.REACT_APP_PATIENT_BASE_URL_TO_ADMIN;

class MedicalRecordsService {


getMedicalRecordsId(id,token) {
  if(token!==""){
const config = {
     headers: { 'Authorization': `Bearer ${token}`}
 };
    return axios.get(ADMIN_API_BASE_URL + "/get-medical-records/" + id,config);
  }
}


}
const m=new MedicalRecordsService()
export default m ;