import React from 'react';
import { Search, Highlighter, MessageCircle, TrendingUp } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search and Open",
      description: "Search and open your favorite books from our extensive library or upload your own."
    },
    {
      icon: Highlighter,
      title: "Highlight & Save",
      description: "Highlight important concepts and save meanings with intelligent note-taking."
    },
    {
      icon: MessageCircle,
      title: "Ask AI Assistant",
      description: "Ask questions and get book-specific answers instantly from our AI chatbot."
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Resume where you left off and track your reading journey with detailed analytics."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How Smart Reading Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience reading like never before with our AI-powered platform designed to enhance your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 