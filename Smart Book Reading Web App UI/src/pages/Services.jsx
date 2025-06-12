import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { BookOpen, Search, MessageCircle, Brain, Upload, Download } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: BookOpen,
      title: "Smart Reading",
      description: "Read books with AI-powered features like smart highlighting, note-taking, and progress tracking.",
      status: "Coming Soon"
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Find exactly what you're looking for with our intelligent search capabilities.",
      status: "Coming Soon"
    },
    {
      icon: MessageCircle,
      title: "AI Book Assistant",
      description: "Chat with your books using our advanced AI assistant for deeper understanding.",
      status: "Coming Soon"
    },
    {
      icon: Brain,
      title: "Learning Analytics",
      description: "Track your reading habits and get insights to improve your learning journey.",
      status: "Coming Soon"
    },
    {
      icon: Upload,
      title: "Book Upload",
      description: "Upload your own books and documents to read with our smart features.",
      status: "Coming Soon"
    },
    {
      icon: Download,
      title: "Offline Reading",
      description: "Download books for offline reading with all smart features intact.",
      status: "Coming Soon"
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the powerful features that make SmartBook your ultimate reading companion. 
            From AI-powered insights to seamless reading experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  {service.status}
                </span>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Smart Reading Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of readers who are already using SmartBook to enhance their reading experience.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-lg font-medium"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 