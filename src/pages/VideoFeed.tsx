import React, { useState, useEffect, useRef, useCallback } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Heart, ThumbsUp, ThumbsDown, SkipForward, Film, Shorts } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  source: 'youtube' | 'vimeo' | 'dailymotion';
  embedUrl: string;
  tags: string[];
  mood: string;
  contentType: 'video' | 'shorts';
}

// Sample video database
const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'Beautiful Nature Scenes',
    thumbnail: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    source: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/BHACKCNDMW8',
    tags: ['nature', 'relaxing', 'calming'],
    mood: 'calm',
    contentType: 'video'
  },
  {
    id: '2',
    title: 'Funny Cat Compilation',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
    source: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
    tags: ['funny', 'animals', 'cats'],
    mood: 'happy',
    contentType: 'shorts'
  },
  {
    id: '3',
    title: 'Guided Meditation for Anxiety',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    source: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/O-6f5wQXSu8',
    tags: ['meditation', 'mindfulness', 'anxiety'],
    mood: 'anxious',
    contentType: 'video'
  },
  {
    id: '4',
    title: 'Motivational Speech',
    thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5',
    source: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/BHACKCNDMW8',
    tags: ['motivation', 'inspirational', 'success'],
    mood: 'energetic',
    contentType: 'shorts'
  },
  {
    id: '5',
    title: 'Relaxing Piano Music',
    thumbnail: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0',
    source: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
    tags: ['music', 'piano', 'relaxing'],
    mood: 'tired',
    contentType: 'video'
  },
  {
    id: '6',
    title: 'Cute Puppies Playing',
    thumbnail: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a',
    source: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/BHACKCNDMW8',
    tags: ['animals', 'puppies', 'cute'],
    mood: 'sad',
    contentType: 'shorts'
  }
];

const VideoFeed = () => {
  const [feedVideos, setFeedVideos] = useState<Video[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userResponses, setUserResponses] = useState<{videoId: string, response: 'like' | 'dislike' | 'neutral' | 'skip'}[]>([]);
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState<'video' | 'shorts'>('video');
  
  const { toast } = useToast();
  const observer = useRef<IntersectionObserver | null>(null);
  const endOfFeedRef = useRef<HTMLDivElement>(null);
  
  // Initialize feed with videos filtered by content type
  useEffect(() => {
    const filteredVideos = sampleVideos.filter(v => v.contentType === contentType).slice(0, 3);
    setFeedVideos(filteredVideos);
    setCurrentVideoIndex(0);
    setIsPlaying(false);
  }, [contentType]);
  
  // Function to fetch more videos based on previous responses and content type
  const fetchMoreVideos = useCallback(() => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, this would be an API call using the user's previous responses
      // to get personalized recommendations
      const lastResponse = userResponses[userResponses.length - 1];
      let newVideos: Video[] = [];
      
      if (lastResponse) {
        if (lastResponse.response === 'like') {
          // Get videos with similar tags to the liked video
          const likedVideo = feedVideos.find(v => v.id === lastResponse.videoId);
          if (likedVideo) {
            newVideos = sampleVideos.filter(v => 
              v.contentType === contentType &&
              v.tags.some(tag => likedVideo.tags.includes(tag)) && 
              !feedVideos.some(fv => fv.id === v.id)
            ).slice(0, 2);
          }
        } else {
          // Get different types of videos
          newVideos = sampleVideos.filter(v => 
            v.contentType === contentType &&
            !feedVideos.some(fv => fv.id === v.id)
          ).slice(0, 2);
        }
      } else {
        // Default recommendations if no responses yet
        newVideos = sampleVideos.filter(v => 
          v.contentType === contentType &&
          !feedVideos.some(fv => fv.id === v.id)
        ).slice(0, 2);
      }
      
      // If we couldn't find enough new videos, cycle through the existing ones with new IDs
      if (newVideos.length < 2) {
        const additionalVideos = sampleVideos
          .filter(v => v.contentType === contentType)
          .map((v, idx) => ({ ...v, id: `${v.id}-new-${idx}` }))
          .slice(0, 2 - newVideos.length);
        
        newVideos = [...newVideos, ...additionalVideos];
      }
      
      // Add new videos to feed
      setFeedVideos(prev => [...prev, ...newVideos]);
      setLoading(false);
    }, 1500);
  }, [feedVideos, userResponses, contentType]);
  
  // Setup intersection observer for infinite scroll
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading && feedVideos.length < 20) {
        fetchMoreVideos();
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
  }, [fetchMoreVideos, loading, feedVideos.length]);
  
  const handleVideoResponse = (response: 'like' | 'dislike' | 'neutral' | 'skip') => {
    const currentVideo = feedVideos[currentVideoIndex];
    
    // Save user response
    setUserResponses(prev => [...prev, {
      videoId: currentVideo.id,
      response: response
    }]);
    
    // Show feedback
    if (response === 'like') {
      toast({
        title: "Video liked!",
        description: "We'll recommend more videos like this.",
        duration: 2000,
      });
    }
    
    // Move to next video
    setIsPlaying(false);
    setTimeout(() => {
      if (currentVideoIndex < feedVideos.length - 1) {
        setCurrentVideoIndex(prev => prev + 1);
      } else {
        // Reached the end of current feed, show a message
        toast({
          title: "Loading more videos...",
          description: "Finding more videos you'll enjoy.",
          duration: 2000,
        });
        // This will trigger the infinite scroll to load more
      }
      setIsPlaying(true);
    }, 300);
  };
  
  const handleContentTypeChange = (value: string) => {
    if (value === 'video' || value === 'shorts') {
      setContentType(value);
    }
  };
  
  const currentVideo = feedVideos[currentVideoIndex];

  return (
    <PageWrapper>
      <div className="w-full max-w-4xl px-4">
        <h1 className="text-2xl font-bold text-center mb-6 text-bliss-teal">Your Personal Video Feed</h1>
        
        <div className="flex justify-center mb-6">
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
              <Shorts className="h-4 w-4" />
              <span>Shorts</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-8 pb-8">
            {feedVideos.map((video, index) => (
              <Card 
                key={video.id} 
                className={`p-6 ${index === currentVideoIndex ? 'ring-2 ring-bliss-teal' : 'opacity-70'}`}
              >
                <h2 className="text-xl font-semibold mb-4">{video.title}</h2>
                
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
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={() => handleVideoResponse('like')}
                      className="flex-1 flex items-center justify-center gap-2 bg-bliss-teal hover:bg-bliss-teal/90"
                    >
                      <ThumbsUp className="h-5 w-5" />
                      Like
                    </Button>
                    
                    <Button 
                      onClick={() => handleVideoResponse('dislike')}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                      <ThumbsDown className="h-5 w-5" />
                      Dislike
                    </Button>
                    
                    <Button 
                      onClick={() => handleVideoResponse('skip')}
                      className="flex-1 flex items-center justify-center gap-2 bg-bliss-blue hover:bg-bliss-blue/90"
                    >
                      <SkipForward className="h-5 w-5" />
                      Next
                    </Button>
                  </div>
                )}
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {video.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-xs rounded-full">#{tag}</span>
                  ))}
                </div>
              </Card>
            ))}
            
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
      </div>
    </PageWrapper>
  );
};

export default VideoFeed;
