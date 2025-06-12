import React from 'react';
import PageLayout from '../layout/PageLayout';
import { Settings, Moon, Sun, Bell, Globe, Palette } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

export default function SettingsPage() {
  const { settings, updateSetting } = useSettings();

  const handleThemeToggle = () => {
    updateSetting('theme', settings.theme === 'light' ? 'dark' : 'light');
  };

  const handleFontSizeChange = (size) => {
    updateSetting('fontSize', size);
  };

  return (
    <PageLayout showFooter={false}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* Appearance Settings */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Appearance</h2>
            </div>

            <div className="space-y-6">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  {settings.theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Sun className="w-5 h-5 text-gray-600" />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">Theme</h3>
                    <p className="text-sm text-gray-600">
                      {settings.theme === 'dark' ? 'Dark mode' : 'Light mode'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleThemeToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Font Size */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Font Size</h3>
                  <p className="text-sm text-gray-600">Adjust text size for better reading</p>
                </div>
                <select 
                  value={settings.fontSize}
                  onChange={(e) => handleFontSizeChange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Push Notifications</h3>
                  <p className="text-sm text-gray-600">Get notified about new features and updates</p>
                </div>
                <button
                  onClick={() => updateSetting('notifications', !settings.notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.notifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Email Updates</h3>
                  <p className="text-sm text-gray-600">Receive email notifications about your reading progress</p>
                </div>
                <button
                  onClick={() => updateSetting('emailUpdates', !settings.emailUpdates)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.emailUpdates ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailUpdates ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Reading Settings */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Reading Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Auto Save</h3>
                  <p className="text-sm text-gray-600">Automatically save your reading progress</p>
                </div>
                <button
                  onClick={() => updateSetting('autoSave', !settings.autoSave)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.autoSave ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Reading Mode</h3>
                  <p className="text-sm text-gray-600">Choose your preferred reading experience</p>
                </div>
                <select 
                  value={settings.readingMode}
                  onChange={(e) => updateSetting('readingMode', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="standard">Standard</option>
                  <option value="focus">Focus Mode</option>
                  <option value="night">Night Reading</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 