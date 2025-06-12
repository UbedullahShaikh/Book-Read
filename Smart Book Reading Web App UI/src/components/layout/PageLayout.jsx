import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

export default function PageLayout({ children, showNavbar = true, showFooter = true, className = "" }) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${className}`}>
      {showNavbar && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </div>
  );
} 