import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ message, className = "" }) => {
  if (!message) return null;
  
  return (
    <div className={`p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
      <div className="flex items-center space-x-2 text-red-600">
        <AlertCircle className="h-4 w-4" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorAlert; 