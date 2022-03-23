import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { RootState } from "../app/store";
//import {selectProgramById} from '../features/programs/programsSlice'

export default function Program() {
  let params = useParams();
  const program = useSelector((state: RootState) => state.programs.programList.find(o => (o.id) === Number(params.id)));

  if(program === undefined)
  {
    return <h2>Loading :)</h2>
  }

  return <h2>Program: {program.title}</h2>;
}