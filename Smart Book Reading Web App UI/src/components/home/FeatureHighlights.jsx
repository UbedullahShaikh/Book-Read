import React from 'react';
import { Brain, BookOpen, Target, FileText, MessageSquare, Zap } from 'lucide-react';

export default function FeatureHighlights() {
  const features = [
    {
      icon: Brain,
      title: "Contextual Chatbot",
      description: "Ask anything about the book and get accurate AI responses that understand the context and meaning.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: BookOpen,
      title: "Instant Dictionary",
      description: "Just highlight a word to see its meaning instantly, with multiple definitions and usage examples.",
      color: "from-green-500 to-blue-600"
    },
    {
      icon: Target,
      title: "Resume Reading",
      description: "Auto-save your progress and highlights so you can pick up exactly where you left off.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: FileText,
      title: "Multi-format Support",
      description: "Read both PDF and EPUB files with smooth experience and consistent formatting.",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: MessageSquare,
      title: "Smart Notes",
      description: "Create intelligent notes that link to specific passages and concepts in your books.",
      color: "from-teal-500 to-cyan-600"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing fast search and AI responses that make reading more efficient.",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why You'll Love SmartBook Reader
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the features that make SmartBook the ultimate reading companion for curious minds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 