import './App.css';
import { Carosuel } from './features/carosuel/Carosuel'
import Header from './features/header/Header'

function App() {
  return (
    <div className='App'>
      <Header />
      <Carosuel />
    </div>
  );
}

export default App;