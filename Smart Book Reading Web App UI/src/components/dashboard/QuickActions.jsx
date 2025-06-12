import React from 'react';
import { Upload, Search, MessageCircle } from 'lucide-react';
import QuickActionCard from './QuickActionCard';

export default function QuickActions() {
  const actions = [
    {
      icon: Upload,
      title: 'Upload Book',
      description: 'Add your first book to start reading',
      color: 'blue',
      onClick: () => alert('Upload feature coming soon!')
    },
    {
      icon: Search,
      title: 'Explore Library',
      description: 'Discover new books and authors',
      color: 'green',
      onClick: () => window.location.href = '/explore'
    },
    {
      icon: MessageCircle,
      title: 'AI Assistant',
      description: 'Chat with your books using AI',
      color: 'purple',
      onClick: () => alert('AI Assistant feature coming soon!')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {actions.map((action, index) => (
        <QuickActionCard
          key={index}
          icon={action.icon}
          title={action.title}
          description={action.description}
          color={action.color}
          onClick={action.onClick}
        />
      ))}
    </div>
  );
} 