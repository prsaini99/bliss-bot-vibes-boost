
import React, { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import MoodAssessmentComponent from '@/components/MoodAssessment';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Activity } from 'lucide-react';

type Mood = 'happy' | 'sad' | 'anxious' | 'calm' | 'energetic' | 'tired' | null;

const MoodAssessmentPage = () => {
  const navigate = useNavigate();
  const [showHealthOption, setShowHealthOption] = useState(true);
  
  const handleMoodSelected = (mood: Mood) => {
    // Navigate to the video feed after mood is selected
    setTimeout(() => {
      navigate('/feed');
    }, 1000);
  };
  
  const handleConnectHealth = () => {
    navigate('/health-connect');
  };
  
  const handleSkipHealth = () => {
    setShowHealthOption(false);
  };

  return (
    <PageWrapper>
      <div className="w-full max-w-4xl mx-auto">
        <MoodAssessmentComponent onMoodSelected={handleMoodSelected} />
        
        {showHealthOption && (
          <div className="bliss-card p-4 mt-6 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Connect health devices</h3>
                <p className="text-sm text-gray-600">For more accurate mood detection</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSkipHealth}
              >
                Skip
              </Button>
              <Button
                className="bg-bliss-teal hover:bg-bliss-teal/90"
                size="sm"
                onClick={handleConnectHealth}
              >
                <Heart className="h-4 w-4 mr-2" />
                Connect Devices
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default MoodAssessmentPage;
