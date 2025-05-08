import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, ThumbsUp, ThumbsDown, SkipForward, Film, VideoIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type Mood = 'happy' | 'sad' | 'anxious' | 'calm' | 'energetic' | 'tired' | null;
type ContentType = 'video' | 'shorts';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  source: 'youtube' | 'vimeo' | 'dailymotion';
  embedUrl: string;
  contentType: ContentType;
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
      contentType: 'video',
    },
    {
      id: '2',
      title: 'Relaxing Waterfall Sounds',
      thumbnail: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
      contentType: 'shorts',
    }
  ],
  sad: [
    {
      id: '3',
      title: 'Cute Puppies Playing',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
      contentType: 'video',
    },
    {
      id: '4',
      title: 'Uplifting Music Playlist',
      thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/BHACKCNDMW8',
      contentType: 'shorts',
    }
  ],
  anxious: [
    {
      id: '5',
      title: 'Guided Meditation for Anxiety',
      thumbnail: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/O-6f5wQXSu8',
      contentType: 'video',
    },
    {
      id: '6',
      title: 'Calming Ocean Waves',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/BHACKCNDMW8',
      contentType: 'shorts',
    }
  ],
  calm: [
    {
      id: '7',
      title: 'Soft Piano Music',
      thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/BHACKCNDMW8',
      contentType: 'video',
    },
    {
      id: '8',
      title: 'Beautiful Sunsets Compilation',
      thumbnail: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
      contentType: 'shorts',
    }
  ],
  energetic: [
    {
      id: '9',
      title: 'Motivational Speech',
      thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/BHACKCNDMW8',
      contentType: 'video',
    },
    {
      id: '10',
      title: 'High Energy Workout Mix',
      thumbnail: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
      contentType: 'shorts',
    }
  ],
  tired: [
    {
      id: '11',
      title: 'Relaxing Sleep Music',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/BHACKCNDMW8',
      contentType: 'video',
    },
    {
      id: '12',
      title: 'Gentle Rain Sounds',
      thumbnail: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      source: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
      contentType: 'shorts',
    }
  ]
};

const VideoRecommendation: React.FC<VideoRecommendationProps> = ({ mood, onRestart }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState<ContentType>('video');
  const { toast } = useToast();
  
  const endOfFeedRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // Initialize with videos for the current mood and content type
  const moodVideos = mood ? videoDatabase[mood] || videoDatabase.happy : videoDatabase.happy;
  
  // Initialize displayed videos on first load or when mood/content type changes
  useEffect(() => {
    const filteredVideos = moodVideos.filter(video => video.contentType === contentType);
    setDisplayedVideos(filteredVideos.length > 0 ? filteredVideos.slice(0, 2) : []);
    setCurrentVideoIndex(0);
    setIsPlaying(false);
  }, [mood, contentType]);
  
  // Setup intersection observer for infinite scroll
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        loadMoreVideos();
      }
    });
    
    if (endOfFeedRef.current) {
      observer.current.observe(endOfFeedRef.current);
    }
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, displayedVideos.length]);
  
  const loadMoreVideos = () => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, this would fetch more videos from an API
      const filteredVideos = moodVideos.filter(video => video.contentType === contentType);
      
      if (filteredVideos.length === 0) {
        setLoading(false);
        return;
      }
      
      // For now, we'll just cycle through the same videos again with different IDs
      const currentLength = displayedVideos.length;
      const newVideos = filteredVideos.map((video, idx) => ({
        ...video,
        id: `${video.id}-${currentLength + idx}`, // Ensure unique IDs
      })).slice(0, 2);
      
      setDisplayedVideos(prev => [...prev, ...newVideos]);
      setLoading(false);
    }, 1000);
  };
  
  const handleLike = (videoId: string) => {
    if (!likedVideos.includes(videoId)) {
      setLikedVideos([...likedVideos, videoId]);
      toast({
        title: "Video liked!",
        description: "We'll recommend more like this in the future.",
        duration: 2000,
      });
    }
  };
  
  const handleResponse = (videoId: string, response: 'like' | 'dislike' | 'skip') => {
    if (response === 'like') {
      handleLike(videoId);
    }
    
    // Move to next video
    setIsPlaying(false);
    setTimeout(() => {
      if (currentVideoIndex < displayedVideos.length - 1) {
        setCurrentVideoIndex(prev => prev + 1);
      } else {
        // Reached the end of current feed, show a message
        toast({
          title: "Loading more videos...",
          description: "Finding more videos for you.",
          duration: 2000,
        });
        // This will trigger the infinite scroll to load more
      }
      setIsPlaying(true);
    }, 300);
  };
  
  const handleFeelingBetter = () => {
    toast({
      title: "Great!",
      description: "We're glad you're feeling better!",
      duration: 2000,
    });
    setTimeout(onRestart, 2000);
  };
  
  const handleContentTypeChange = (value: string) => {
    if (value === 'video' || value === 'shorts') {
      setContentType(value);
    }
  };
  
  return (
    <Card className="bliss-card p-6 animate-fade-in w-full max-w-4xl">
      <h2 className="text-xl font-semibold text-center mb-4 text-bliss-teal">
        {mood ? `Based on your ${mood} mood, we recommend:` : 'Video recommendation'}
      </h2>
      
      <div className="flex justify-center mb-4">
        <ToggleGroup 
          type="single" 
          value={contentType}
          onValueChange={handleContentTypeChange}
          className="border rounded-lg"
        >
          <ToggleGroupItem value="video" aria-label="Toggle videos" className="flex gap-2 items-center">
            <Film className="h-4 w-4" />
            <span>Videos</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="shorts" aria-label="Toggle shorts" className="flex gap-2 items-center">
            <VideoIcon className="h-4 w-4" />
            <span>Shorts</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="space-y-8 pb-8">
          {displayedVideos.length > 0 ? (
            displayedVideos.map((video, index) => (
              <Card 
                key={video.id} 
                className={`p-4 ${index === currentVideoIndex ? 'ring-2 ring-bliss-teal' : 'opacity-70'}`}
              >
                <h3 className="text-lg font-medium mb-2">{video.title}</h3>
                
                <div className={`mb-4 overflow-hidden rounded-lg bg-black ${video.contentType === 'shorts' ? 'aspect-[9/16]' : 'aspect-video'}`}>
                  {(index === currentVideoIndex && isPlaying) ? (
                    <iframe 
                      className="w-full h-full"
                      src={video.embedUrl} 
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div 
                      className="w-full h-full bg-cover bg-center flex items-center justify-center cursor-pointer"
                      style={{ backgroundImage: `url(${video.thumbnail})` }}
                      onClick={() => {
                        setCurrentVideoIndex(index);
                        setIsPlaying(true);
                      }}
                    >
                      <div className="bg-black bg-opacity-50 rounded-full p-4">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"></path>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                
                {index === currentVideoIndex && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button 
                      onClick={() => handleResponse(video.id, 'like')}
                      className="flex-1 flex items-center justify-center gap-2 bg-bliss-teal hover:bg-bliss-teal/90"
                    >
                      <ThumbsUp className="h-5 w-5" />
                      Like
                    </Button>
                    
                    <Button 
                      onClick={() => handleResponse(video.id, 'dislike')}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                      <ThumbsDown className="h-5 w-5" />
                      Dislike
                    </Button>
                    
                    <Button 
                      onClick={() => handleResponse(video.id, 'skip')}
                      className="flex-1 flex items-center justify-center gap-2 bg-bliss-blue hover:bg-bliss-blue/90"
                    >
                      <SkipForward className="h-5 w-5" />
                      Next
                    </Button>
                  </div>
                )}
                
                {index === currentVideoIndex && likedVideos.includes(video.id) && (
                  <div className="flex items-center gap-2 text-bliss-teal mb-4">
                    <Heart className="h-4 w-4 fill-bliss-teal" />
                    <span className="text-sm">You liked this video</span>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No {contentType} available for this mood. Try another content type.</p>
            </div>
          )}
          
          {/* Loading indicator */}
          {loading && (
            <div className="text-center py-4">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-bliss-teal border-r-transparent"></div>
              <p className="mt-2 text-gray-500">Finding more videos for you...</p>
            </div>
          )}
          
          {/* Intersection observer target */}
          <div ref={endOfFeedRef} className="h-4" />
        </div>
      </ScrollArea>
      
      <div className="border-t border-gray-200 pt-4 text-center mt-6">
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
