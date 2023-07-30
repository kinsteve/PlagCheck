import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './styles/style.css';
import Home from './views/home';
import File from './views/file';
import NewScan from './views/new-scan';
import FreeText from './views/free-text';
import Url from './views/url';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/new-scan/file" element={<File/>} />
        <Route exact path="/new-scan" element={<NewScan/>} />
        <Route exact path="/new-scan/free-text" element={<FreeText/>} />
        <Route exact path="/new-scan/url" element={<Url/>} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));