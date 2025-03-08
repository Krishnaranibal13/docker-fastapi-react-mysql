import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';

const App = () => {
  const [user, setUser] = useState(null);

  // updated user data from User Profile
  const handleDataFromChild = (data) => {
    setUser(data);
  };


  return (
    <Router>
      <div>
        <div className="app">
          <Navbar userData={user} />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-profile" element={<UserProfile userData={user} sendDataToParent={handleDataFromChild} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
