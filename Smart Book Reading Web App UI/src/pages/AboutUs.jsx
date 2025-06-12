import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Users, Target, Award, Heart } from 'lucide-react';

export default function AboutUs() {
  const stats = [
    { icon: Users, number: "10K+", label: "Active Readers" },
    { icon: Target, number: "50K+", label: "Books Read" },
    { icon: Award, number: "4.8", label: "User Rating" },
    { icon: Heart, number: "95%", label: "Satisfaction" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Passionate about making reading accessible and enjoyable for everyone.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Expert in AI and machine learning, building the smart features that power SmartBook.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      bio: "Creating beautiful and intuitive user experiences that make reading a joy.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            About SmartBook
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to revolutionize the way people read and learn. 
            SmartBook combines the power of AI with the joy of reading to create 
            an unparalleled learning experience.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To make reading more accessible, engaging, and insightful for everyone. 
              We believe that every book has the power to transform lives, and we're 
              here to amplify that power through intelligent technology.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
              <p className="text-gray-700 leading-relaxed mb-6">
                SmartBook was born from a simple observation: while technology has transformed 
                many aspects of our lives, the way we read and interact with books has remained 
                largely unchanged. We saw an opportunity to bridge this gap.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Founded in 2023, our team of book lovers and tech enthusiasts came together 
                with a shared vision: to create a reading platform that not only makes books 
                more accessible but also enhances the reading experience through intelligent 
                features and AI-powered insights.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, SmartBook serves thousands of readers worldwide, helping them discover 
                new books, understand complex concepts, and build meaningful connections with 
                the stories they read.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Have questions or want to learn more about SmartBook? We'd love to hear from you!
            </p>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-lg font-medium">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 