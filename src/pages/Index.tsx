
import React, { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import Welcome from '@/components/Welcome';
import MoodAssessment from '@/components/MoodAssessment';
import VideoRecommendation from '@/components/VideoRecommendation';

type AppState = 'welcome' | 'assessment' | 'recommendation';
type Mood = 'happy' | 'sad' | 'anxious' | 'calm' | 'energetic' | 'tired' | null;

const Index = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [selectedMood, setSelectedMood] = useState<Mood>(null);
  
  const handleGetStarted = () => {
    setAppState('assessment');
  };
  
  const handleMoodSelected = (mood: Mood) => {
    setSelectedMood(mood);
    setAppState('recommendation');
  };
  
  const handleRestart = () => {
    setAppState('assessment');
    setSelectedMood(null);
  };
  
  return (
    <PageWrapper>
      <div className="w-full max-w-4xl">
        {appState === 'welcome' && <Welcome onGetStarted={handleGetStarted} />}
        
        {appState === 'assessment' && <MoodAssessment onMoodSelected={handleMoodSelected} />}
        
        {appState === 'recommendation' && (
          <VideoRecommendation mood={selectedMood} onRestart={handleRestart} />
        )}
      </div>
    </PageWrapper>
  );
};

export default Index;
