
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Mood = 'happy' | 'sad' | 'anxious' | 'calm' | 'energetic' | 'tired' | null;

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  source: 'youtube' | 'vimeo' | 'dailymotion';
  embedUrl: string;
}

interface VideoRecommendationProps {
  mood: Mood;
  onRestart: () => void;
}

// Mock video database mapped by mood
const videoDatabase: Record<string, Video[]> = {
  happy: [
    {
      id: '1',
      title: 'Beautiful Nature Scenes',
      thumbnail: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/BHACKCNDMW8',
    },
    {
      id: '2',
      title: 'Relaxing Waterfall Sounds',
      thumbnail: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
    }
  ],
  sad: [
    {
      id: '3',
      title: 'Cute Puppies Playing',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
    },
    {
      id: '4',
      title: 'Uplifting Music Playlist',
      thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/BHACKCNDMW8',
    }
  ],
  anxious: [
    {
      id: '5',
      title: 'Guided Meditation for Anxiety',
      thumbnail: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/O-6f5wQXSu8',
    },
    {
      id: '6',
      title: 'Calming Ocean Waves',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/BHACKCNDMW8',
    }
  ],
  calm: [
    {
      id: '7',
      title: 'Soft Piano Music',
      thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/BHACKCNDMW8',
    },
    {
      id: '8',
      title: 'Beautiful Sunsets Compilation',
      thumbnail: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
    }
  ],
  energetic: [
    {
      id: '9',
      title: 'Motivational Speech',
      thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/BHACKCNDMW8',
    },
    {
      id: '10',
      title: 'High Energy Workout Mix',
      thumbnail: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
    }
  ],
  tired: [
    {
      id: '11',
      title: 'Relaxing Sleep Music',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/BHACKCNDMW8',
    },
    {
      id: '12',
      title: 'Gentle Rain Sounds',
      thumbnail: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
    }
  ]
};

const VideoRecommendation: React.FC<VideoRecommendationProps> = ({ mood, onRestart }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  const { toast } = useToast();
  
  const videos = mood ? videoDatabase[mood] || videoDatabase.happy : videoDatabase.happy;
  const currentVideo = videos[currentVideoIndex % videos.length];
  
  const handleNextVideo = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      setIsPlaying(true);
    }, 300);
  };
  
  const handleLike = () => {
    if (!likedVideos.includes(currentVideo.id)) {
      setLikedVideos([...likedVideos, currentVideo.id]);
      toast({
        title: "Video liked!",
        description: "We'll recommend more like this in the future.",
        duration: 2000,
      });
    }
  };
  
  const handleFeelingBetter = () => {
    toast({
      title: "Great!",
      description: "We're glad you're feeling better!",
      duration: 2000,
    });
    setTimeout(onRestart, 2000);
  };
  
  return (
    <Card className="bliss-card p-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-center mb-4 text-bliss-teal">
        {mood ? `Based on your ${mood} mood, we recommend:` : 'Video recommendation'}
      </h2>
      
      <div className="mb-4 overflow-hidden rounded-lg aspect-video bg-black">
        {isPlaying ? (
          <iframe 
            className="w-full h-full"
            src={currentVideo.embedUrl} 
            title={currentVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center flex items-center justify-center cursor-pointer"
            style={{ backgroundImage: `url(${currentVideo.thumbnail})` }}
            onClick={() => setIsPlaying(true)}
          >
            <div className="bg-black bg-opacity-50 rounded-full p-4">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"></path>
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-medium mb-4">{currentVideo.title}</h3>
      
      <div className="flex gap-2 mb-6">
        <Button 
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 bg-bliss-teal hover:bg-bliss-teal/90`}
        >
          <Heart className={`h-5 w-5 ${likedVideos.includes(currentVideo.id) ? 'fill-white' : ''}`} />
          {likedVideos.includes(currentVideo.id) ? 'Liked' : 'Like'}
        </Button>
        
        <Button 
          onClick={handleNextVideo}
          className="flex-1 bg-bliss-blue hover:bg-bliss-blue/90"
        >
          Next Video
        </Button>
      </div>
      
      <div className="border-t border-gray-200 pt-4 text-center">
        <p className="mb-3 text-gray-600">How are you feeling now?</p>
        <Button 
          onClick={handleFeelingBetter}
          className="w-full bg-bliss-peach hover:bg-bliss-peach/90"
        >
          I'm feeling better!
        </Button>
      </div>
    </Card>
  );
};

export default VideoRecommendation;
