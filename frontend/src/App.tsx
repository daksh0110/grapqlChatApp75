import './App.css';
import Header from './components/Header/Header';
import Signup from './components/SignupForm/SignUpForm';
import AllChats from './components/AllChats';
import LoginPage from './pages/LoginPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
