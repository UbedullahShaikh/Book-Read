import React from 'react';

export default function Footer() {
  return (
    <footer className="text-center text-sm py-8 text-gray-500 dark:text-gray-400 bg-white/50">
      © {new Date().getFullYear()} SmartBook | Made for Students & Book Lovers
    </footer>
  );
} 