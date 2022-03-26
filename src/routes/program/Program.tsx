import './Program.css';
import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import Header from '../../features/header/Header';
//import {selectProgramById} from '../features/programs/programsSlice'

export default function Program() {
  let params = useParams();
  const program = useSelector((state: RootState) => state.programs.programList.find(o => (o.id) === Number(params.id)));

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  }

  function onLoadSetFocus() {
    const box = document.getElementById('container');
    box?.focus();
  }

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "Backspace":
        routeChange()
        break;
    }
  };

  return (
    <div>
      <Header />
      <div className='container' id="container" tabIndex={0} onLoad={() => [onLoadSetFocus()]} onKeyDown={keyDownHandler}>{
        program ? (
          <div className="program-details">
            <div className='image-col'>
              <img key={program.id} className='image' src={program.image} alt={program.title} />
            </div>
            <div className='text-col'>
              <h1>{program.title}</h1>
              <h2>{program.rating} | {program.year} | {program.genre} | {program.language}</h2>
              <p className='description'>{program.description}</p>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="Test">Spooky Scary Skeletons :O</h2>
          </div>
        )}
    </div>
    </div>
  );
}