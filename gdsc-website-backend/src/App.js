import logo from './logo.svg';
import './App.css';

// for showcase
import ProjectsForm from './components/projectsForm';

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
      <ProjectsForm />
    </div>
  );
}

export default App;
