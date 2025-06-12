import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Explore from "../pages/Explore";
import Services from "../pages/Services";
import AboutUs from "../pages/AboutUs";
import ProfilePage from "../components/profile/ProfilePage";
import SettingsPage from "../components/settings/SettingsPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const AppRoutes = memo(() => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
});

AppRoutes.displayName = 'AppRoutes';

export default AppRoutes;
