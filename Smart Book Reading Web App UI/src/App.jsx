import './App.css'

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AppRoutes from './routes/AppRoutes';
// Import other pages here...

function App() {
  return (
    <Router>
    <AppRoutes />
  </Router>
  );
}

export default App;
