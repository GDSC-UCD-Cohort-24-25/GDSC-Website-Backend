import logo from './logo.svg';
import './App.css';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';

function App() {






  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Firebase Backend
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
      <Signin />
      <Signup />
    </div>
  );
}

export default App;
