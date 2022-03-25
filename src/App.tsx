import logo from './logo.svg';
import './App.css';
import { Carosuel } from './features/Carosuel/Carosuel'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Carosuel />
    </div>
  );
}

export default App;