import './App.css';
import { Carosuel } from './features/carosuel/Carosuel'
import Header from './features/header/Header'
import { Routes, Route } from "react-router-dom";
import Program from './routes/program/Program'

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
          <Route path = "/" element={<Carosuel />} />
          <Route path = ":id" element={<Program />} />
      </Routes>
    </div>
  );
}

export default App;