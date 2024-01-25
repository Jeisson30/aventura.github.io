import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/auth/Login';
import Galery from './components/views/Galery';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/Galery' element={<Galery />} />
        </Routes>
      </div>
    </Router>  
    
  );
}

export default App;
