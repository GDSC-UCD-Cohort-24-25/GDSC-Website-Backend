import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Events from "./events";

// Empty placeholder components
const Projects = () => <div><h1>Projects</h1></div>;
const Members = () => <div><h1>Members</h1></div>;
const Authentication = () => <div><h1>Login</h1></div>;

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "events":
        return <Events />;
      case "projects":
        return <Projects />;
      case "members":
        return <Members />;
      case "auth":
        return <Authentication />;
      case "home":
      default:
        return (
          <div className="App-home">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Firebase Admin Dashboard</p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-logo">GDSC Admin</div>
        <ul className="App-nav-links">
          <li>
            <button
              className={currentPage === "home" ? "active" : ""}
              onClick={() => setCurrentPage("home")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={currentPage === "events" ? "active" : ""}
              onClick={() => setCurrentPage("events")}
            >
              Events
            </button>
          </li>
          <li>
            <button
              className={currentPage === "projects" ? "active" : ""}
              onClick={() => setCurrentPage("projects")}
            >
              Projects
            </button>
          </li>
          <li>
            <button
              className={currentPage === "members" ? "active" : ""}
              onClick={() => setCurrentPage("members")}
            >
              Members
            </button>
          </li>
          <li>
            <button
              className={currentPage === "auth" ? "active" : ""}
              onClick={() => setCurrentPage("auth")}
            >
              Login
            </button>
          </li>
        </ul>
      </nav>
      <main className="App-main">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;