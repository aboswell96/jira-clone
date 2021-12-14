import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App/App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from './client/global-styles';
import Board from './client/Board/Board';
import Settings from './client/Settings/Settings';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
      <Route path="board" element={<Board/>}/>
      <Route path="settings" element={<Settings/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
