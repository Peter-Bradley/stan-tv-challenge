import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { getPrograms } from './features/programs/programsSlice';
import Carosuel from './features/carosuel/Carosuel'
import Header from './features/header/Header'
import Program from './routes/program/Program'

store.dispatch(getPrograms())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Carosuel />} />
            <Route path=":id" element={<Program />} />
          </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
