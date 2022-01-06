import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Project from './client/components/Project';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardContainer from './client/components/BoardContainer';
import Settings from './client/components/Settings';

import {setupFirebaseInitialData, readFromDB,writeToDB} from '../src/firebase/firebase';

const SETUP_INITIAL_FIREBASE_DATA = true;

const App = () => {

  const [projectName,SetProjectName] = useState("loading...");

  const OnUpdateSettingsSubmit = (newName) => {
    writeToDB('title', newName, () => {readFromDB('title',SetProjectName)});
  }

  //send network requests after mount
  useEffect(() => {
    readFromDB('title',SetProjectName);
  },[])

  if (SETUP_INITIAL_FIREBASE_DATA) {
    setupFirebaseInitialData();
  }

  return(
    <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Project
        projectName={projectName}
      />}>
      <Route path="board" element={<BoardContainer
        projectName={projectName}
      />}/>
      <Route path="settings" element={<Settings
        projectName={projectName}
        onClick={OnUpdateSettingsSubmit}
      />}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
  );
}

ReactDOM.render(<App/>,
  document.getElementById('root')
);
