import './program.css';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
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
    return <h2 className = "Test">Loading :)</h2>
  }

  return <h2 className = "Test">Program: {program.title}</h2>;
}