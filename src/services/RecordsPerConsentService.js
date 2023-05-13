import axios from "axios";

const CMS_API_BASE_URL = process.env.REACT_APP_PATIENT_BASE_URL_TO_CMS;

class RecordsPerConsentService {
    getPendingRequestIdDetails(pid, id, token) {
         // if (token ==="") {
            const config = {
                headers: {'Authorization': `Bearer ${token}`}
            }
            return axios.get(CMS_API_BASE_URL + "/get-pending-request-details/" + pid + "/" + id, config);
// }
    }
}
const recordsPerConsentService=new RecordsPerConsentService()
export default recordsPerConsentService ;
