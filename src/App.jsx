import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Journal from './pages/journal';
import VibeChecker from './pages/vibe_checker';
import Login from './pages/Login';
import Signup from './pages/create_account';
import Header from './components/Header';
import './styling.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create_account" element={<Signup />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/vibe_checker" element={<VibeChecker />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
