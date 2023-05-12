import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MedicalHistory from "./pages/medicalhistroty/MedicalHistory";
import VoluntaryConsent from "./pages/voluntaryconsent/VoluntaryConsent";
import SignIn from "./pages/signin/SignIn";
import ActiveConsent from "./pages/activeconsent/ActiveConsent";
import Profile from "./pages/profile/PatientProfile"
import PasswordReset from "./pages/passwordreset/PasswordReset"
import ViewConsentLog from "./pages/consentlogs/ViewConsentLog";


import PendingRequests from "./pages/pendingrequests/PendingRequests";
import {getRowsStateFromCache} from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";
import RequestDetails from "./pages/pendingrequests/RequestDetails";

function App() {
  return (
    <Router>


        <Routes>
          <Route exact path="/" element={<SignIn/>}/>
          <Route exact path="/home/:pid/:name" element={<Home />}/>
          <Route exact path="/medicalhistory/:pid/:name" element={<MedicalHistory />}/>
          <Route exact path="/voluntaryconsent/:pid/:name" element={<VoluntaryConsent />}/>
            <Route exact path="/pendingrequests/:pid/:name" element={<PendingRequests />}/>
            {/*<Route exact path="/recordsperconsent/:pid/:id/:name" element={<RequestDetails />}/>*/}
          <Route exact path="/activeconsent/:pid/:name" element={<ActiveConsent />}/>
          <Route exact path="/profile/:pid/:name" element={<Profile />}/>
          <Route exact path="/password-reset"element={<PasswordReset />}/>
          <Route exact path="/consentlog/:pid/:name" element={<ViewConsentLog/>}/>

        </Routes>

    </Router>
  );
}

export default App;
