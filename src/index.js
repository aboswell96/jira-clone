import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Project from './nav/Project';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardContainer from './board/BoardContainer';
import Settings from './settings/Settings';

import {
  setupFirebaseInitialData,
  readFromDB,
  writeToDB,
} from '../src/firebase/firebase';

const SETUP_INITIAL_FIREBASE_DATA = false;

const App = () => {
  const [projectName, SetProjectName] = useState('loading...');

  const OnUpdateSettingsSubmit = (newName, newDescription) => {
    writeToDB('title', newName, () => {
      readFromDB('title', SetProjectName);
    });
    writeToDB('projectDescription', newDescription);
  };

  //send network requests after mount
  useEffect(() => {
    readFromDB('title', SetProjectName);
  }, []);

  if (SETUP_INITIAL_FIREBASE_DATA) {
    setupFirebaseInitialData();
  }

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Project projectName={projectName} />}>
            <Route
              path="/"
              element={<BoardContainer projectName={projectName} />}
            />
            <Route
              path="board"
              element={<BoardContainer projectName={projectName} />}
            />
            <Route
              path="settings"
              element={
                <Settings
                  projectName={projectName}
                  onClick={OnUpdateSettingsSubmit}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
