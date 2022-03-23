import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux'
import { RootState } from "./app/store";

function App() {
  const programs = useSelector((state: RootState) => state.programs.programList);

  programs.forEach(function (item, index) {
    console.log(item);
  });

  const programsList = programs.map((program) =>
  <li><img src={program.image} alt=':('/></li>
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
