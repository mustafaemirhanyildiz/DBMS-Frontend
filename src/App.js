import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import Navbarmenu from "./NavbarMenu";
import AnimatedRoutes from "./AnimatedRoutes";
import { myContext } from "./ContextProvider";
function App() {
  const API ="http://192.168.1.107:5243/api/"

  const data={
    API
  }
  return (
    <div className="App">
      <myContext.Provider value={data}>
        <BrowserRouter>
          <Navbarmenu />
          <AnimatedRoutes />
        </BrowserRouter>
      </myContext.Provider>
    </div>
  );
}

export default App;
