import React from 'react';
import ReactDOM from 'react-dom';
// import { Route, BrowserRouter } from "react-router-dom";
// import Registration from "./Registration";
import App from './App';
// import "./registration.css";
// const routes = (
//     <BrowserRouter>
//         <Route exact path="/src/components/Registration" component={Registration} />
//     </BrowserRouter>
// );
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
const rootElement = document.getElementById("root");
// ReactDOM.render(routes, rootElement);