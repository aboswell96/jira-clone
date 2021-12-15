import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Project from './client/Project/Project';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from './client/global-styles';
import Board from './client/Board/Board';
import Settings from './client/Settings/Settings';

//Temporary Data
var tempName = "Test Name";

const App = () => {

  const [projectName,SetProjectName] = useState(tempName);

  const OnUpdateSettingsSubmit = (newName) => {
    SetProjectName(newName);
  }

  return(
    <React.StrictMode>
    <GlobalStyle/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Project
        projectName={projectName}
      />}>
      <Route path="board" element={<Board
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
