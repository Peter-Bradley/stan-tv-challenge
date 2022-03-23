import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux'
import { RootState } from "./app/store";
import { useNavigate } from "react-router-dom";

function App() {
  const programs = useSelector((state: RootState) => state.programs.programList);
  let navigate = useNavigate();
  const routeChange = (routeId: number) =>{ 
    let path = `${routeId}`; 
    navigate(path);
  }

  const programsList = programs.map((program) =>
  <li><img key={program.id.toString()} src={program.image} alt=':(' onClick={() => routeChange(program.id)}/></li>
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <ul>{programsList}</ul>
    </div>
  );
}

export default App;
