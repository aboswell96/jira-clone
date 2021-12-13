import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App/App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from './client/global-styles';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
      <Route path="board" element={<div> board </div>}/>
      <Route path="settings" element={<div> settings </div>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
