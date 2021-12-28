import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Project from './client/Project/Project';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardContainer from './client/BoardContainer/BoardContainer';
import Settings from './client/Settings/Settings';

import {setupFirebaseInitialData, readFromDB} from '../src/firebase/firebase';

const bSetupFirebaseData = false;

const App = () => {

  const [projectName,SetProjectName] = useState("loading...");

  const OnUpdateSettingsSubmit = (newName) => {
    SetProjectName(newName);
  }

  //send network requests after mount
  useEffect(() => {
    readFromDB('title',SetProjectName);
  },[])

  if (bSetupFirebaseData) {
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
