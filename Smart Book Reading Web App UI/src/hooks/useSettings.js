import { useState, useEffect } from 'react';

export function useSettings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    notifications: true,
    emailUpdates: true,
    autoSave: true,
    readingMode: 'focus'
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('smartbook-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsedSettings }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('smartbook-settings', JSON.stringify(settings));
    
    // Apply theme to document
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px'
    };
    
    document.documentElement.style.fontSize = fontSizeMap[settings.fontSize] || '16px';
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return {
    settings,
    updateSetting
  };
} 