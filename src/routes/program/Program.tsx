import './Program.css';
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

  document.onkeydown = function (e) {
    switch (e.key) {
      case "Backspace":
        routeChange()
        break;
    }
  }

  if(program === undefined)
  {
    return (
      <div>
        <Header />
        <h2 className = "Test">Spooky Scary Skeletons :O</h2>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <img key={program.id} className='image' src={program.image} alt={program.title} />
      <h1>{program.title}</h1>
      <h2>{program.rating} | {program.year} | {program.genre} | {program.language}</h2>
      <p className='description'>{program.description}</p>
    </div>
  );
}