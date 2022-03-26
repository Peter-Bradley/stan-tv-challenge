import './Carosuel.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from "../../app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ProgramInterface } from "../programs/programInterface"
import SkeletonElement from "../../skeletons/SkeletonElement"

let beginning: number = 0;
let maxItems: number = 6;
let ending: number = maxItems;
let selectedProgramPosition: number = 0;
let selectedProgramClass: string = "selected"
let selectedProgramId: number = 0;

export function Carosuel() {
    let programsValues: {programList: ProgramInterface[]; status: String} = useSelector((state: RootState) => state.programs);
    let [currentPrograms, setPrograms] = useState<ProgramInterface[]>();
    let [selectedProgram, changeSelectedProgram] = useState<Number>();

    useEffect(() => {
        changeSelectedProgram(selectedProgramPosition);
        let displayedPrograms = programsValues.programList.slice(beginning, ending);
        setPrograms(displayedPrograms);
    }, [programsValues]);

    let navigate: NavigateFunction = useNavigate();
    let routeChange = (routeId: number) => {
        let path = `${routeId}`;
        navigate(path);
    }

    function setSkeletonItems() {
        let skeletonItems: any[] = [];
        for (var i = 0; i < maxItems; i++) {
            skeletonItems.push(<div className='single-item-container'> <SkeletonElement {...{ type: "program" } as any} /> </div>)
        }
        return skeletonItems;
    }

    function onLoadSetFocus() {
        let box: HTMLElement | null = document.getElementById('carosuel-container');
        box?.focus();
    }

    let keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.key) {
            case "ArrowLeft":
                if (selectedProgramPosition === 0) {
                    if (beginning > 0) {
                        beginning -= maxItems;
                        selectedProgramPosition = maxItems;
                    }
                    if (ending > maxItems)
                        ending -= maxItems;
                    setPrograms(programsValues.programList.slice(beginning, ending));
                }
                if (selectedProgramPosition !== 0)
                    changeSelectedProgram(selectedProgramPosition -= 1);
                break;
            case "ArrowRight":
                if (selectedProgramPosition === maxItems - 1) {
                    if (beginning < programsValues.programList.length - maxItems) {
                        beginning += maxItems;
                        selectedProgramPosition = -1;
                    }
                    if (ending < programsValues.programList.length)
                        ending += maxItems;
                    setPrograms(programsValues.programList.slice(beginning, ending));
                }
                if (selectedProgramPosition < maxItems - 1)
                    changeSelectedProgram(selectedProgramPosition += 1);
                break;
            case "ArrowUp":
                if (beginning < programsValues.programList.length - maxItems)
                    beginning += maxItems;
                if (ending < programsValues.programList.length)
                    ending += maxItems;
                setPrograms(programsValues.programList.slice(beginning, ending));
                break;
            case "ArrowDown":
                if (beginning > 0)
                    beginning -= maxItems;
                if (ending > maxItems)
                    ending -= maxItems;
                setPrograms(programsValues.programList.slice(beginning, ending));
                break;
            case "Enter":
                routeChange(selectedProgramId);
                break;
        }
    };

     function error(): boolean {
        if(programsValues.status === "rejected")
        {
            return true;
        }
        return false;
    }

    return (
        <div id="carosuel-container" className='carosuel-container' onLoad={() => [setPrograms, onLoadSetFocus()]} onKeyDown={keyDownHandler} tabIndex={0}>
            {
                !error() ? (
                    <div className='carosuel-item-container'> {
                        currentPrograms && currentPrograms.length > 0 ? (
                            currentPrograms.map((program, index) =>
                                <div className='single-item-container'>
                                    <div className='hiddenCheck'> {
                                        selectedProgram === index ? (
                                            selectedProgramClass = "programImage selected",
                                            selectedProgramId = program.id
                                        ) : (
                                            selectedProgramClass = "programImage notselected"
                                        )}
                                    </div>
                                    <img key={program.id} className={`${selectedProgramClass}`} src={program.image} alt={program.title} />
                                </div>
                            )
                        ) : (
                            <> {
                                setSkeletonItems()
                            } </>
                        )}
                    </div>
                ) : (
                    <h1>An unknown error occured :(. Please try again later.</h1>
                )
            }
        </div>
    );
}