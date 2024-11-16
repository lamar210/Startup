import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Journal from './pages/Journal';
import VibeChecker from './pages/VibeChecker';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/vibe-checker" element={<VibeChecker />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
