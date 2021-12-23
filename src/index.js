import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Project from './client/Project/Project';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardContainer from './client/BoardContainer/BoardContainer';
import Settings from './client/Settings/Settings';

//Temporary Data
var tempName = "Central Park Project";

const App = () => {

  const [projectName,SetProjectName] = useState(tempName);

  const OnUpdateSettingsSubmit = (newName) => {
    SetProjectName(newName);
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
