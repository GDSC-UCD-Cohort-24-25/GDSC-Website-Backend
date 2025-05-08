import React, { useState } from "react";
import Events from "./events";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("events");

  return (
    <div>
      <div className="navbar">
        <span>GDSC Admin</span>
        <button onClick={() => setCurrentPage("events")}>Events</button>
      </div>
      
      <div className="content">
        {currentPage === "events" && <Events />}
      </div>
    </div>
  );
}

export default App;