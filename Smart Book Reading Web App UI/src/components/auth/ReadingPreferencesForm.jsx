import React from 'react';
import { Field, ErrorMessage } from 'formik';

const ReadingPreferencesForm = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Reading Preferences</h3>
        <p className="text-sm text-gray-600 mb-6">
          Customize your reading experience to match your preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Theme */}
        <div>
          <label htmlFor="readingPreferences.theme" className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <Field
            as="select"
            name="readingPreferences.theme"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select a theme</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="sepia">Sepia</option>
          </Field>
          <ErrorMessage name="readingPreferences.theme" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        {/* Font Size */}
        <div>
          <label htmlFor="readingPreferences.fontSize" className="block text-sm font-medium text-gray-700 mb-2">
            Font Size
          </label>
          <Field
            as="select"
            name="readingPreferences.fontSize"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select font size</option>
            <option value="12">Small (12px)</option>
            <option value="16">Medium (16px)</option>
            <option value="20">Large (20px)</option>
            <option value="24">Extra Large (24px)</option>
          </Field>
          <ErrorMessage name="readingPreferences.fontSize" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        {/* Font Family */}
        <div>
          <label htmlFor="readingPreferences.fontFamily" className="block text-sm font-medium text-gray-700 mb-2">
            Font Family
          </label>
          <Field
            as="select"
            name="readingPreferences.fontFamily"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select font family</option>
            <option value="serif">Serif</option>
            <option value="sans-serif">Sans Serif</option>
            <option value="monospace">Monospace</option>
          </Field>
          <ErrorMessage name="readingPreferences.fontFamily" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        {/* Reading Mode */}
        <div>
          <label htmlFor="readingPreferences.readingMode" className="block text-sm font-medium text-gray-700 mb-2">
            Reading Mode
          </label>
          <Field
            as="select"
            name="readingPreferences.readingMode"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select reading mode</option>
            <option value="continuous">Continuous Scroll</option>
            <option value="page">Page by Page</option>
            <option value="focus">Focus Mode</option>
          </Field>
          <ErrorMessage name="readingPreferences.readingMode" component="div" className="mt-1 text-sm text-red-600" />
        </div>
      </div>
    </div>
  );
};

export default ReadingPreferencesForm; 