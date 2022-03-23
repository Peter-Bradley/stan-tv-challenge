import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux'
import { RootState } from "./app/store";
import { useNavigate } from "react-router-dom";

function App() {
  const programs = useSelector((state: RootState) => state.programs.programList);
  
  let navigate = useNavigate();
  const routeChange = (routeId: number) => {
    let path = `${routeId}`;
    navigate(path);
  }

  document.onkeydown = function(e) {
    switch(e.key) {
      case "ArrowLeft":
        console.log("Pressed Left :)")
        break;
      case "ArrowRight":
        console.log("Pressed Right :)")
        break;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="divSearchResults carosuel-container">
        <div className="carosuel-item-container"> {
          programs.map((program) =>
          <div className='single-item-container'>
            <img key={program.id.toString()} className = "programImage" src={program.image} alt=':(' onClick={() => routeChange(program.id)} />
          </div>
          )
        }
        </div>
      </div>
    </div>
  );
}

export default App;
