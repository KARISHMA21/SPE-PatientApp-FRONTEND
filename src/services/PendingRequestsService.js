import axios from "axios";

const PATIENT_API_BASE_URL = "http://localhost:8081/patient_end/api/v1/cms";

class PendingRequestsService {
    getPendingRequestId(pid,token) {

        // if (token ==="") {
            const config = {
                headers: {'Authorization': `Bearer ${token}`}
            }

            return axios.get(PATIENT_API_BASE_URL + "/get-pending-request-list/" + pid, config);
        // }
    }
    update_consent_records(token,pendingreqid,body) {

        // if (token ==="") {
            const config = {
                headers: {'Authorization': `Bearer ${token}`}
            }

            return axios.post(PATIENT_API_BASE_URL + "/action-on-pending-request/" + pendingreqid,body, config);
        // }
    }

 
}
const pendingRequestsService=new PendingRequestsService()
export default pendingRequestsService ;