
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Heart, MessageSquare, Mic, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

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
  const [textInput, setTextInput] = useState('');
  const [activeTab, setActiveTab] = useState('emoji');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
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
  
  const handleTextSubmit = () => {
    if (!textInput.trim()) {
      toast({
        title: "No text entered",
        description: "Please enter how you're feeling or select an emoji.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate mood detection from text
    setTimeout(() => {
      setIsProcessing(false);
      
      // Simple mood detection based on keywords
      const lowerText = textInput.toLowerCase();
      let detectedMood: Mood = null;
      
      if (lowerText.includes('happy') || lowerText.includes('great') || lowerText.includes('joy') || lowerText.includes('good')) {
        detectedMood = 'happy';
      } else if (lowerText.includes('sad') || lowerText.includes('down') || lowerText.includes('depressed') || lowerText.includes('unhappy')) {
        detectedMood = 'sad';
      } else if (lowerText.includes('anxious') || lowerText.includes('worry') || lowerText.includes('stress') || lowerText.includes('nervous')) {
        detectedMood = 'anxious';
      } else if (lowerText.includes('calm') || lowerText.includes('relax') || lowerText.includes('peaceful') || lowerText.includes('tranquil')) {
        detectedMood = 'calm';
      } else if (lowerText.includes('energetic') || lowerText.includes('excited') || lowerText.includes('active') || lowerText.includes('energized')) {
        detectedMood = 'energetic';
      } else if (lowerText.includes('tired') || lowerText.includes('sleepy') || lowerText.includes('exhausted') || lowerText.includes('fatigue')) {
        detectedMood = 'tired';
      } else {
        // Default to calm if no keywords match
        detectedMood = 'calm';
      }
      
      toast({
        title: "Mood detected",
        description: `Based on your text, you seem to be feeling ${detectedMood}.`,
        duration: 2000,
      });
      
      setSelectedMood(detectedMood);
      setTimeout(() => {
        onMoodSelected(detectedMood);
      }, 1500);
    }, 2000);
  };
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        
        // Simulate facial analysis after 3 seconds
        setTimeout(analyzeFacialExpression, 3000);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera access error",
        description: "Unable to access your camera. Please check permissions.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };
  
  const analyzeFacialExpression = () => {
    if (!cameraActive) return;
    
    setIsProcessing(true);
    
    // Simulate facial expression analysis
    setTimeout(() => {
      setIsProcessing(false);
      
      // Random mood for demo purposes
      const moods: Mood[] = ['happy', 'sad', 'anxious', 'calm', 'energetic', 'tired'];
      const detectedMood = moods[Math.floor(Math.random() * moods.length)];
      
      toast({
        title: "Facial analysis complete",
        description: `Based on your expression, you seem to be feeling ${detectedMood}.`,
        duration: 2000,
      });
      
      stopCamera();
      setSelectedMood(detectedMood);
      
      setTimeout(() => {
        onMoodSelected(detectedMood);
      }, 1500);
    }, 2000);
  };
  
  const startVoiceAnalysis = () => {
    setVoiceActive(true);
    setIsProcessing(true);
    
    // Simulate voice analysis
    setTimeout(() => {
      setIsProcessing(false);
      setVoiceActive(false);
      
      // Random mood for demo purposes
      const moods: Mood[] = ['happy', 'sad', 'anxious', 'calm', 'energetic', 'tired'];
      const detectedMood = moods[Math.floor(Math.random() * moods.length)];
      
      toast({
        title: "Voice analysis complete",
        description: `Based on your voice tone, you seem to be feeling ${detectedMood}.`,
        duration: 2000,
      });
      
      setSelectedMood(detectedMood);
      
      setTimeout(() => {
        onMoodSelected(detectedMood);
      }, 1500);
    }, 3000);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Clean up previous tab if needed
    if (value !== 'camera' && cameraActive) {
      stopCamera();
    }
    
    if (value !== 'voice' && voiceActive) {
      setVoiceActive(false);
    }
  };

  return (
    <Card className="bliss-card p-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-6 text-bliss-teal">How are you feeling today?</h2>
      
      <Tabs 
        defaultValue="emoji" 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="emoji" className="flex items-center gap-2">
            <span>😊</span>
            <span className="hidden sm:inline">Emoji</span>
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Text</span>
          </TabsTrigger>
          <TabsTrigger value="camera" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span className="hidden sm:inline">Camera</span>
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            <span className="hidden sm:inline">Voice</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="emoji">
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
        </TabsContent>
        
        <TabsContent value="text">
          <div className="space-y-4">
            <Textarea
              placeholder="Tell us how you're feeling today..."
              className="min-h-[100px]"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <Button 
              onClick={handleTextSubmit}
              className="w-full bg-bliss-teal hover:bg-bliss-teal/90"
              disabled={!textInput.trim() || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="camera">
          <div className="space-y-4 flex flex-col items-center">
            {cameraActive ? (
              <>
                <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden bg-black">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                        <p>Analyzing your expression...</p>
                      </div>
                    </div>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  onClick={stopCamera}
                  className="bg-white"
                >
                  Stop Camera
                </Button>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center w-full max-w-md aspect-square rounded-lg bg-gray-100 border border-gray-200">
                  <Camera className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-gray-500">Camera access required for facial analysis</p>
                </div>
                <Button 
                  onClick={startCamera}
                  className="bg-bliss-teal hover:bg-bliss-teal/90"
                >
                  Start Camera
                </Button>
              </>
            )}
            <p className="text-xs text-gray-500 text-center max-w-md">
              Your camera image is only used for mood detection and is not stored.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="voice">
          <div className="space-y-4 flex flex-col items-center">
            <div className="flex flex-col items-center justify-center w-full max-w-md aspect-square rounded-lg bg-gray-100 border border-gray-200">
              {voiceActive ? (
                <div className="text-center">
                  <div className="flex justify-center space-x-1 mb-3">
                    <div className="w-1 h-12 bg-bliss-teal rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                    <div className="w-1 h-16 bg-bliss-teal rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-20 bg-bliss-teal rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    <div className="w-1 h-14 bg-bliss-teal rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                    <div className="w-1 h-10 bg-bliss-teal rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                  </div>
                  <p className="text-gray-600">Listening...</p>
                  <p className="text-sm text-gray-500 mt-2">Speak clearly and describe how you're feeling</p>
                </div>
              ) : (
                <>
                  <Mic className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-gray-500">Click below to start voice analysis</p>
                </>
              )}
            </div>
            <Button 
              onClick={startVoiceAnalysis}
              className="bg-bliss-teal hover:bg-bliss-teal/90"
              disabled={voiceActive || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Start Voice Analysis'
              )}
            </Button>
            <p className="text-xs text-gray-500 text-center max-w-md">
              Your voice recording is only used for mood detection and is not stored.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex items-center justify-center mt-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onMoodSelected(null)}
          className="text-sm text-gray-500"
        >
          <Heart className="h-4 w-4 mr-1" />
          Skip assessment
        </Button>
      </div>
      
      <p className="mt-6 text-center text-sm text-gray-500">
        Select your current mood and we'll recommend videos to help you feel better!
      </p>
    </Card>
  );
};

export default MoodAssessment;
