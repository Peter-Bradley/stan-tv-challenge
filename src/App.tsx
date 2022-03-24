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
var currentItem:number = 0;
var selectedItemClass = "selectedProgramImage"
var selectedProgramId = 0;

function App() {
  const programs = useSelector((state: RootState) => state.programs.programList);
  const [currentPrograms, setPrograms] = useState<ProgramInterface[]>();
  const [selectedProgram, changeSelectedProgram] = useState<Number>();

  useEffect(() => {
    changeSelectedProgram(currentItem);
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
        changeSelectedProgram(currentItem -= 1);
      break;
      case "ArrowRight":
        changeSelectedProgram(currentItem += 1);
      break;
      case "ArrowUp":
        if (beginning < programs.length - maxItems)
          beginning += maxItems;
        if (ending < programs.length)
          ending += maxItems;
        setPrograms(programs.slice(beginning, ending));
      break;
      case "ArrowDown":
        if (beginning > 0)
          beginning -= maxItems;
        if (ending > maxItems)
          ending -= maxItems;
        setPrograms(programs.slice(beginning, ending));
      break;
      case "Enter":
        routeChange(selectedProgramId);
      break;
    }
  }

  if (programs.length === 0) {
    return <h2>Loading :)</h2>
  }

  return (
    <div className="App" onLoad={() => [setPrograms]}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="carosuel-container">
        <div className="carosuel-item-container"> {
          currentPrograms && currentPrograms.length > 0 ? (
            currentPrograms.map((program, index) =>
              <div className='single-item-container'>
                <div className="hiddenCheck"> {
                selectedProgram === index ? (
                  selectedItemClass = "selectedProgramImage",
                  selectedProgramId = program.id
                ):(
                  selectedItemClass="notSelectedProgramImage"
                )}
                </div>
                <img key={program.id} className={`${selectedItemClass}`} src={program.image} alt=':('/>
              </div>
            )
          ):(
            <h2>Nothing XD</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;