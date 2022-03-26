import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from "../../app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ProgramInterface } from "../programs/programInterface"
import SkeletonElement from "../../skeletons/SkeletonElement"
import styled from 'styled-components';
import "@fontsource/open-sans";

let NotSelectedProgram = styled.img`
    height: 100%;
    width: 100%;
    max-width: 400px;
    max-height: 600px;
    align-self: center;`

let SelectedProgram = styled(NotSelectedProgram)`
border: 5px solid rgb(48, 150, 234);`

let CarosuelContainer = styled.div`
align-self: center;
display: flex;
align-items: center;
overflow: visible;
margin: auto;
position:absolute;
top:0px;
right:0px;
bottom:0px;
left:0px;`

let CarosuelItemContainer = styled.div`
display: flex;
overflow: visible;
justify-content: center;
margin: auto;
padding-left: 3%;
padding-right: 3%;`

let SingleItemContainer = styled.div`
padding-left: 10px;
padding-right: 10px;`

let ErrorMessage = styled.h1`
font-family: "Open Sans", sans-serif;
color: rgb(96, 96, 96);
position: absolute;
top: 25%;
left: 3%;`

let beginning: number = 0;
let maxItems: number = 6;
let ending: number = maxItems;
let selectedProgramPosition: number = 0;
let selectedProgramId: number = 0;

export function Carosuel() {
    let programsValues: { programList: ProgramInterface[]; status: String } = useSelector((state: RootState) => state.programs);
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

    function error(): boolean {
        if (programsValues.status === "rejected") {
            return true;
        }
        return false;
    }

    function onLoadSetFocus() {
        let box: HTMLElement | null = document.getElementById('carosuel-container');
        box?.focus();
    }

    function setSkeletonItems() {
        let skeletonItems: any[] = [];
        for (var i = 0; i < maxItems; i++) {
            skeletonItems.push(<SingleItemContainer> <SkeletonElement {...{ type: "program" } as any} /> </SingleItemContainer>)
        }
        return skeletonItems;
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

    return (
        <CarosuelContainer id="carosuel-container" onLoad={() => [setPrograms, onLoadSetFocus()]} onKeyDown={keyDownHandler} tabIndex={0}> {
            !error() ? (
                <CarosuelItemContainer> {
                    currentPrograms && currentPrograms.length > 0 ? (
                        currentPrograms.map((program, index) =>
                            <SingleItemContainer> {
                                selectedProgram === index ? (
                                    <><SelectedProgram key={program.id} src={program.image} alt={program.title} /> {selectedProgramId = program.id}</>
                                ) : (
                                    <NotSelectedProgram key={program.id} src={program.image} alt={program.title} />
                                )}
                            </SingleItemContainer>
                        )
                    ) : (
                        <> {
                            setSkeletonItems()
                        } </>
                    )}
                </CarosuelItemContainer>
            ) : (
                <ErrorMessage>An unknown error occured :(. Please try again later.</ErrorMessage>
            )
        }
        </CarosuelContainer>
    );
}