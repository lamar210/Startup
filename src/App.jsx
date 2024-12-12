import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Journal from './pages/journal';
import JournalEntries from './pages/journal_entries';
import VibeChecker from './pages/vibe_checker';
import Login from './pages/Login';
import Signup from './pages/create_account';
import MainPage from './pages/main_page';
import UserProfile from './pages/user_profile';
import Header from './components/Header';
import { AuthProvider } from './AuthContext';
import { NotificationProvider } from './notification';
import MoodUpdateListener from './MoodUpdateListener'; 
import './styling.css';

const App = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <MoodUpdateListener />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create_account" element={<Signup />} />
              <Route path="/main_page" element={<MainPage />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/journal_entries" element={<JournalEntries />} />
              <Route path="/vibe_checker" element={<VibeChecker />} />
              <Route path="/user_profile" element={<UserProfile />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
