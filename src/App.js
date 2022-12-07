import './App.css';
import { BrowserRouter, Route, Routes,useLocation } from 'react-router-dom'

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react"
import Navbarmenu from './NavbarMenu';
import AnimatedRoutes from './AnimatedRoutes';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbarmenu />
       <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
