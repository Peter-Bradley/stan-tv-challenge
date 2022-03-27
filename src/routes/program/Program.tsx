import React from 'react';
import { Params, useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import SkeletonElement from '../../skeletons/SkeletonElement';
import { selectProgramById } from '../../features/programs/programsSlice'
import styled from 'styled-components';
import "@fontsource/open-sans";

let ProgramContainer = styled.div`
    min-height: 100%;
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

let ProgramDetails = styled.div`
  display:flex;
  gap: 20px;
  align-items:center;
  justify-content:center;
  width: 100%;`

let Image = styled.img`
  height: 100%;
  width: 100%;
  max-width: 400px;
  max-height: 600px;
  flex-grow: 1;`

let ImageColumn = styled.div`
  padding-left: 4%;
  justify-content:center;
  flex-basis: 20%;`

let TextColumn = styled.div`
  display:block;
  justify-content: center;
  align-self: flex-start;
  flex-grow: 1;`

let Title = styled.h1`
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  font-size: 200%;
  color: white;`

let Details = styled.h2`
  font-family: "Open Sans", sans-serif;
  font-size: 100%;
  color: white;`

let Description = styled.p`
  font-family: "Open Sans", sans-serif;
  color: white;`

let ErrorMessage = styled.h1`
font-family: "Open Sans", sans-serif;
color: rgb(96, 96, 96);
position: absolute;
top: 25%;
left: 3%;`

export default function Program() {
  let params: Readonly<Params<string>> = useParams();
  let program = useSelector((state: RootState) => selectProgramById(state, Number(params.id)));
  let status = useSelector((state: RootState) => state.programs.status)

  let navigate = useNavigate();
  let routeChange = () => {
    let path = "/";
    navigate(path);
  }

  function error(): boolean {
    if (status === "rejected") {
      return true;
    }
    return false;
  }

  function onLoadSetFocus() {
    let box = document.getElementById('ProgramContainer');
    box?.focus();
  }

  let keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "Backspace":
        routeChange()
        break;
    }
  };

  return (
    <div>
      {
        !error() ? (
          <ProgramContainer id="ProgramContainer" tabIndex={0} onLoad={() => [onLoadSetFocus()]} onKeyDown={keyDownHandler}>{
            program ? (
              <ProgramDetails>
                <ImageColumn>
                  <Image key={program.id} src={program.image} alt={program.title} />
                </ImageColumn>
                <TextColumn>
                  <Title>{program.title}</Title>
                  <Details>{program.rating} | {program.year} | {program.genre} | {program.language}</Details>
                  <Description>{program.description}</Description>
                </TextColumn>
              </ProgramDetails>
            ) : (
              <ProgramDetails>
                <ImageColumn>
                  <SkeletonElement {...{ type: "program" } as any} />
                </ImageColumn>
                <TextColumn>
                  <SkeletonElement {...{ type: "title" } as any} />
                  <SkeletonElement {...{ type: "information" } as any} />
                  <SkeletonElement {...{ type: "description" } as any} />
                </TextColumn>
              </ProgramDetails>
            )}
          </ProgramContainer>
        ) : (
          <ErrorMessage>An unknown error occured :(. Please try again later.</ErrorMessage>
        )}
    </div>
  );
}