import React from 'react';

export default function QuickActionCard({ icon: Icon, title, description, color, onClick }) {
  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-900',
    green: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-900',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-purple-900'
  };

  const iconColorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500'
  };

  const textColorClasses = {
    blue: 'text-blue-700',
    green: 'text-green-700',
    purple: 'text-purple-700'
  };

  return (
    <div 
      className={`group ${colorClasses[color]} p-6 rounded-xl border hover:shadow-lg transition-all duration-300 cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 ${iconColorClasses[color]} rounded-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className={`font-semibold text-lg`}>{title}</h3>
      </div>
      <p className={`text-sm ${textColorClasses[color]}`}>{description}</p>
    </div>
  );
} 