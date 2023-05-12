import axios from "axios";

// const HIS_API_BASE_URL = "http://localhost:8080/his_end/api/v1/admin";
const ADMIN_API_BASE_URL =process.env.REACT_APP_PATIENT_BASE_URL_TO_ADMIN;

class PatientProfileService {
    // const saveMedicalRecords=(records)=>
    showprofiledetails(id,token) {

        if(token!==""){
            const config = {
                 headers: { 'Authorization': `Bearer ${token}`}
             };

             return axios.get(ADMIN_API_BASE_URL + "/get-profile-details/" + id,config);
        // return newData;
    }

}


saveProfileUpdate(data,token) {

    // getPatients (did,token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

    config.headers["Access-Control-Allow-Origin"]='*';
    config.headers['Access-Control-Allow-Credentials']= 'true';

    return axios.post(ADMIN_API_BASE_URL+"/update-profile-details", data,config);
    // return newData;
}
}
const prof=new PatientProfileService()
export default prof ;