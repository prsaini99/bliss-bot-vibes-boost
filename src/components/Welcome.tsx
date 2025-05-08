
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface WelcomeProps {
  onGetStarted: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onGetStarted }) => {
  return (
    <Card className="bliss-card p-8 max-w-md mx-auto text-center animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-bliss-teal to-bliss-blue flex items-center justify-center">
            <span className="text-4xl">💭</span>
          </div>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-bliss-teal to-bliss-blue bg-clip-text text-transparent">
        Welcome to BlissBot
      </h1>
      
      <p className="text-gray-600 mb-6">
        Your personal mood-enhancing companion. We recommend uplifting videos based on how you're feeling.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="bg-bliss-yellow/20 p-2 rounded-full mr-3">
            <span className="text-xl">😊</span>
          </div>
          <p className="text-left text-sm">Tell us how you're feeling</p>
        </div>
        
        <div className="flex items-center">
          <div className="bg-bliss-peach/20 p-2 rounded-full mr-3">
            <span className="text-xl">🎬</span>
          </div>
          <p className="text-left text-sm">Get personalized video recommendations</p>
        </div>
        
        <div className="flex items-center">
          <div className="bg-bliss-mint/20 p-2 rounded-full mr-3">
            <span className="text-xl">✨</span>
          </div>
          <p className="text-left text-sm">Improve your mood and mental wellbeing</p>
        </div>
      </div>
      
      <Button 
        onClick={onGetStarted}
        className="w-full mt-6 bg-bliss-teal hover:bg-bliss-teal/90 text-white"
      >
        Get Started
      </Button>
    </Card>
  );
};

export default Welcome;
