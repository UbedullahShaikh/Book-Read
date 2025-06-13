import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock,
  Eye,
  EyeOff,
  BookOpen, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schemas
const Step1Schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Step2Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  bio: Yup.string()
    .max(200, 'Bio must be less than 200 characters'),
  readingPreferences: Yup.object().shape({
    theme: Yup.string().required('Theme is required'),
    fontSize: Yup.number().required('Font size is required'),
    fontFamily: Yup.string().required('Font family is required'),
    readingMode: Yup.string().required('Reading mode is required'),
  }),
});

const SignupPage = () => {
  const navigate = useNavigate();
  const { signUpWithEmail, loading, error } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleStep1Submit = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Proceed to step 2
      setCurrentStep(2);
    } catch (err) {
      setFieldError('email', err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStep2Submit = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Create user profile data
      const userProfile = {
        name: values.name,
        bio: values.bio,
        readingPreferences: values.readingPreferences
      };

      // Get auth data from step 1 (we'll need to store this temporarily)
      const authData = JSON.parse(localStorage.getItem('temp_auth_data') || '{}');
      
      // Use simple authentication to create account
      await signUpWithEmail(authData.email, authData.password, userProfile);
      
      // Clean up temporary data
      localStorage.removeItem('temp_auth_data');
      
    } catch (err) {
      setFieldError('name', err.message || 'Signup failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStep1Complete = (values) => {
    // Store auth data temporarily for step 2
    localStorage.setItem('temp_auth_data', JSON.stringify({
      email: values.email,
      password: values.password
    }));
  };

  const goBackToStep1 = () => {
    setCurrentStep(1);
  };

  const displayError = error;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Join SmartReader</h2>
          <p className="mt-2 text-sm text-gray-600">
            {currentStep === 1 
              ? 'Create your account' 
              : 'Complete your profile'
            }
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
                }`}>
                  {currentStep > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
                </div>
                <span className="ml-2 text-sm font-medium">Account Details</span>
              </div>
              
              <div className={`w-8 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              
              <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
                }`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Profile</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {displayError && (
            <div className="mb-6 flex items-center space-x-2 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{displayError}</span>
            </div>
          )}

          {/* Step 1: Account Details */}
          {currentStep === 1 && (
            <Formik
              initialValues={{
                email: '',
                password: '',
                confirmPassword: ''
              }}
              validationSchema={Step1Schema}
              onSubmit={handleStep1Submit}
            >
              {({ isSubmitting, values }) => (
                <Form className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your email"
                        disabled={loading}
                      />
                    </div>
                    <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Create a password"
                        disabled={loading}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-600"
                          disabled={loading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Confirm your password"
                        disabled={loading}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="text-gray-400 hover:text-gray-600"
                          disabled={loading}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={loading || isSubmitting}
                      onClick={() => handleStep1Complete(values)}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading || isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Continue</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {/* Step 2: Profile Details */}
          {currentStep === 2 && (
            <Formik
              initialValues={{
                name: '',
                bio: '',
                readingPreferences: {
                  theme: 'auto',
                  fontSize: 16,
                  fontFamily: 'serif',
                  readingMode: 'continuous'
                }
              }}
              validationSchema={Step2Schema}
              onSubmit={handleStep2Submit}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your full name"
                        disabled={loading}
                      />
                    </div>
                    <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Bio Field */}
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio (Optional)
                    </label>
                    <div className="mt-1">
                      <Field
                        as="textarea"
                        id="bio"
                        name="bio"
                        rows={3}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Tell us about yourself..."
                        disabled={loading}
                      />
                    </div>
                    <ErrorMessage name="bio" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Reading Preferences */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Reading Preferences
                    </h3>

                    {/* Theme Preference */}
                    <div>
                      <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                        Theme
                      </label>
                      <div className="mt-1">
                        <Field
                          as="select"
                          id="theme"
                          name="readingPreferences.theme"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          disabled={loading}
                        >
                          <option value="auto">Auto (System)</option>
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                        </Field>
                      </div>
                      <ErrorMessage name="readingPreferences.theme" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    {/* Font Size */}
                    <div>
                      <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">
                        Font Size
                      </label>
                      <div className="mt-1">
                        <Field
                          as="select"
                          id="fontSize"
                          name="readingPreferences.fontSize"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          disabled={loading}
                        >
                          <option value={14}>Small (14px)</option>
                          <option value={16}>Medium (16px)</option>
                          <option value={18}>Large (18px)</option>
                          <option value={20}>Extra Large (20px)</option>
                        </Field>
                      </div>
                      <ErrorMessage name="readingPreferences.fontSize" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    {/* Font Family */}
                    <div>
                      <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700">
                        Font Family
                      </label>
                      <div className="mt-1">
                        <Field
                          as="select"
                          id="fontFamily"
                          name="readingPreferences.fontFamily"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          disabled={loading}
                        >
                          <option value="serif">Serif</option>
                          <option value="sans-serif">Sans Serif</option>
                          <option value="monospace">Monospace</option>
                        </Field>
                      </div>
                      <ErrorMessage name="readingPreferences.fontFamily" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    {/* Reading Mode */}
                    <div>
                      <label htmlFor="readingMode" className="block text-sm font-medium text-gray-700">
                        Reading Mode
                      </label>
                      <div className="mt-1">
                        <Field
                          as="select"
                          id="readingMode"
                          name="readingPreferences.readingMode"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          disabled={loading}
                        >
                          <option value="continuous">Continuous</option>
                          <option value="page-by-page">Page by Page</option>
                          <option value="focus">Focus Mode</option>
                        </Field>
                      </div>
                      <ErrorMessage name="readingPreferences.readingMode" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={goBackToStep1}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading || isSubmitting}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading || isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Creating Account...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Create Account</span>
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 