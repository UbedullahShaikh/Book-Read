import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
// Import other pages here...

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
