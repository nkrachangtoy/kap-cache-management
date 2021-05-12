import React from "react";
import "./Styles/main.css";
import SideNav from "./components/SideNav";
import MainCtrl from "./controllers/MainCtrl";

function App() {
  return (
    <div className="App">
      <SideNav />
      <MainCtrl />
    </div>
  );
}

export default App;
