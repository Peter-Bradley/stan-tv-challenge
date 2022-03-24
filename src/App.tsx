import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from "./app/store";
import { useNavigate } from "react-router-dom";

interface ProgramInterface {
  id: number;
  title: string;
  description: string;
  type: string;
  image: string;
  rating: string;
  genre: string;
  year: number;
  language: string;
}

var beginning = 0;
var maxItems = 6;
var ending = maxItems;

function App() {
  const programs = useSelector((state: RootState) => state.programs.programList);
  const [currentPrograms, setPrograms] = useState<ProgramInterface[]>();

  useEffect(() => {
      const displayedPrograms = programs.slice(beginning, ending);
      setPrograms(displayedPrograms);
  }, [programs]);

  let navigate = useNavigate();
  const routeChange = (routeId: number) => {
    let path = `${routeId}`;
    navigate(path);
  }

  document.onkeydown = function (e) {
    switch (e.key) {
      case "ArrowLeft":
        if (beginning > 0)
          beginning -= maxItems;
        if (ending > maxItems)
          ending -= maxItems;

        setPrograms(programs.slice(beginning, ending));
        console.log(`Beginning: ${beginning}`);
        console.log(`Ending: ${ending}`);
        break;
      case "ArrowRight":
        if(beginning < programs.length - 6)  
        beginning += maxItems;
        if(ending < programs.length)
        ending += maxItems;

        setPrograms(programs.slice(beginning, ending));
        console.log(`Beginning: ${beginning}`);
        console.log(`Ending: ${ending}`);
        break;
    }
  }

  if (programs.length === 0) {
    return <h2>Loading :)</h2>
  }
  
  return (
    <div className="App" onLoad={() => setPrograms}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="carosuel-container">
        <div className="carosuel-item-container"> {
          currentPrograms && currentPrograms.length > 0 ? (
            currentPrograms.map((program) =>
              <div className='single-item-container'>
                <img key={program.id.toString()} className="programImage" src={program.image} alt=':(' onClick={() => routeChange(program.id)} />
              </div>
            )
          ) : (
            <h2>Nothing XD</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;