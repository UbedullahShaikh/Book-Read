import React from 'react';
import Footer from '../common/Footer';

export default function PageLayout({ children, showFooter = true, className = "" }) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${className}`}>
      {children}
      {showFooter && <Footer />}
    </div>
  );
} 