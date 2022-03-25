import './Carosuel.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { ProgramInterface } from "../programs/programInterface"

let beginning: number = 0;
let maxItems: number = 6;
let ending: number = maxItems;
let selectedProgramPosition: number = 0;
let selectedProgramClass: string = "selectedProgramImage"
let selectedProgramId: number = 0;

export function Carosuel() {
    const programs = useSelector((state: RootState) => state.programs.programList);
    const [currentPrograms, setPrograms] = useState<ProgramInterface[]>();
    const [selectedProgram, changeSelectedProgram] = useState<Number>();
    
    useEffect(() => {
        changeSelectedProgram(selectedProgramPosition);
        const displayedPrograms = programs.slice(beginning, ending);
        setPrograms(displayedPrograms);
    }, [programs]);

    let navigate = useNavigate();
    const routeChange = (routeId: number) => {
        let path = `${routeId}`;
        navigate(path);
    }

    if (programs.length === 0) {
        return (<h2>Loading :)</h2>)
    }

    const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.key) {
            case "ArrowLeft":
                if (selectedProgramPosition === 0) {
                    if (beginning > 0) {
                        beginning -= maxItems;
                        selectedProgramPosition = maxItems;
                    }
                    if (ending > maxItems)
                        ending -= maxItems;
                    setPrograms(programs.slice(beginning, ending));
                }
                if (selectedProgramPosition !== 0)
                    changeSelectedProgram(selectedProgramPosition -= 1);
                break;
            case "ArrowRight":
                if (selectedProgramPosition === maxItems - 1) {
                    if (beginning < programs.length - maxItems) {
                        beginning += maxItems;
                        selectedProgramPosition = -1;
                    }
                    if (ending < programs.length)
                        ending += maxItems;
                    setPrograms(programs.slice(beginning, ending));
                }
                if (selectedProgramPosition < maxItems - 1)
                    changeSelectedProgram(selectedProgramPosition += 1);
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
    };

    function onLoadSet() {
        const box = document.getElementById('carosuel-container');
        box?.focus();
    }

    return (
        <div id="carosuel-container" className="carosuel-container" onLoad={() => [setPrograms, onLoadSet()]} onKeyDown={keyDownHandler} tabIndex={0}>
            <div className="carosuel-item-container"> {
                currentPrograms && currentPrograms.length > 0 ? (
                    currentPrograms.map((program, index) =>
                        <div className='single-item-container'>
                            <div className="hiddenCheck"> {
                                selectedProgram === index ? (
                                    selectedProgramClass = "selectedProgramImage",
                                    selectedProgramId = program.id
                                ) : (
                                    selectedProgramClass = "notSelectedProgramImage"
                                )}
                            </div>
                            <img key={program.id} className={`${selectedProgramClass}`} src={program.image} alt={program.title} />
                        </div>
                    )
                ) : (
                    <h2>Nothing XD</h2>
                )}
            </div>
        </div>
    );
}