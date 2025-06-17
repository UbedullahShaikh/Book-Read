import React from 'react';
import { CheckCircle } from 'lucide-react';

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className={`flex items-center ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= step.id ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
              </div>
              <span className="ml-2 text-sm font-medium">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 ${currentStep >= steps[index + 1].id ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator; 