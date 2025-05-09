import logo from './logo.svg';
import './App.css';

// for showcase
import ProjectsForm from './components/projectsForm';
import ProjectsDisplay from './components/ProjectsDisplay';
import ProjectsPage from './components/ProjectsPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Firebase Backened
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* for showcase */}
      <ProjectsPage />
    </div>
  );
}

export default App;
