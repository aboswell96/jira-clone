import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Project from './client/Project/Project';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardContainer from './client/BoardContainer/BoardContainer';
import Settings from './client/Settings/Settings';

import {setupFirebaseInitialData, readFromDB,writeToDB, saveComment} from '../src/firebase/firebase';

const SETUP_INITIAL_FIREBASE_DATA = false;

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

  // saveComment();

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
