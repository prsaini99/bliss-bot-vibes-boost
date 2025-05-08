
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type Mood = 'happy' | 'sad' | 'anxious' | 'calm' | 'energetic' | 'tired' | null;

interface MoodOption {
  value: Mood;
  label: string;
  emoji: string;
  color: string;
}

const moodOptions: MoodOption[] = [
  { value: 'happy', label: 'Happy', emoji: '😊', color: 'bg-bliss-yellow' },
  { value: 'sad', label: 'Sad', emoji: '😔', color: 'bg-bliss-blue' },
  { value: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-bliss-teal' },
  { value: 'calm', label: 'Calm', emoji: '😌', color: 'bg-bliss-mint' },
  { value: 'energetic', label: 'Energetic', emoji: '🤩', color: 'bg-bliss-peach' },
  { value: 'tired', label: 'Tired', emoji: '😴', color: 'bg-bliss-soft-blue' }
];

interface MoodAssessmentProps {
  onMoodSelected: (mood: Mood) => void;
}

const MoodAssessment: React.FC<MoodAssessmentProps> = ({ onMoodSelected }) => {
  const [selectedMood, setSelectedMood] = useState<Mood>(null);
  const { toast } = useToast();

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    
    toast({
      title: "Mood selected",
      description: `You're feeling ${mood}. Finding videos to boost your mood!`,
      duration: 2000,
    });
    
    setTimeout(() => {
      onMoodSelected(mood);
    }, 1000);
  };

  return (
    <Card className="bliss-card p-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-6 text-bliss-teal">How are you feeling today?</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {moodOptions.map((mood) => (
          <Button
            key={mood.value}
            onClick={() => handleMoodSelect(mood.value)}
            className={`h-24 ${mood.color} hover:opacity-90 text-white flex flex-col items-center justify-center rounded-xl transition-transform transform hover:scale-105 ${
              selectedMood === mood.value ? 'ring-4 ring-bliss-teal ring-opacity-50' : ''
            }`}
          >
            <span className="text-3xl mb-1">{mood.emoji}</span>
            <span className="text-sm">{mood.label}</span>
          </Button>
        ))}
      </div>
      
      <p className="mt-6 text-center text-sm text-gray-500">
        Select your current mood and we'll recommend videos to help you feel better!
      </p>
    </Card>
  );
};

export default MoodAssessment;
