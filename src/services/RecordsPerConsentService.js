import axios from "axios";

const CMS_API_BASE_URL = "http://localhost:8081/patient_end/api/v1/cms";

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