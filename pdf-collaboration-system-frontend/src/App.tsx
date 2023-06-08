import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Register} from './pages/Register';
import {Login} from './pages/Login';
import { UploadPdf } from './pages/Upload';


function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/register' element = {<Register/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/upload' element = {<UploadPdf/>} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
