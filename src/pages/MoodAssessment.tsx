
import React from 'react';
import PageWrapper from '@/components/PageWrapper';
import MoodAssessmentComponent from '@/components/MoodAssessment';
import { useNavigate } from 'react-router-dom';

type Mood = 'happy' | 'sad' | 'anxious' | 'calm' | 'energetic' | 'tired' | null;

const MoodAssessmentPage = () => {
  const navigate = useNavigate();
  
  const handleMoodSelected = (mood: Mood) => {
    // Navigate to the video feed after mood is selected
    setTimeout(() => {
      navigate('/feed');
    }, 1000);
  };

  return (
    <PageWrapper>
      <div className="w-full max-w-4xl">
        <MoodAssessmentComponent onMoodSelected={handleMoodSelected} />
      </div>
    </PageWrapper>
  );
};

export default MoodAssessmentPage;
