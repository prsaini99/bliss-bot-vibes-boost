
import React from 'react';
import PageWrapper from '@/components/PageWrapper';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

// Demo user data
const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  joinedDate: "May 2023",
  preferences: {
    videoSources: ["youtube", "vimeo"],
    contentTypes: ["inspirational", "nature", "funny"],
    recommendationFrequency: "daily"
  },
  stats: {
    videosWatched: 42,
    moodImprovements: 28,
    favoriteCategories: ["funny", "nature"]
  }
};

// Mood history for chart
const moodHistory = [
  { date: "May 1", mood: "sad", improved: true },
  { date: "May 3", mood: "anxious", improved: true },
  { date: "May 5", mood: "happy", improved: false },
  { date: "May 7", mood: "tired", improved: true },
  { date: "May 10", mood: "energetic", improved: false },
];

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
      duration: 2000,
    });
    
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  
  const handleSavePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your video preferences have been updated",
      duration: 2000,
    });
  };
  
  return (
    <PageWrapper>
      <div className="w-full max-w-4xl px-4">
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-bliss-teal rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userData.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-gray-500">{userData.email}</p>
              <p className="text-sm text-gray-400">Member since {userData.joinedDate}</p>
            </div>
            <div className="ml-auto">
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-red-300 text-red-500 hover:bg-red-50"
              >
                Log Out
              </Button>
            </div>
          </div>
        </Card>
        
        <Tabs defaultValue="preferences" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="history">Mood History</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preferences">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Video Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Video Sources</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="youtube" defaultChecked />
                      <label htmlFor="youtube">YouTube</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="vimeo" defaultChecked />
                      <label htmlFor="vimeo">Vimeo</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dailymotion" />
                      <label htmlFor="dailymotion">Dailymotion</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Content Types</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="inspirational" defaultChecked />
                      <label htmlFor="inspirational">Inspirational</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="funny" defaultChecked />
                      <label htmlFor="funny">Funny</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="nature" defaultChecked />
                      <label htmlFor="nature">Nature</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="music" />
                      <label htmlFor="music">Music</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="educational" />
                      <label htmlFor="educational">Educational</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Recommendation Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notifications" defaultChecked />
                      <label htmlFor="notifications">Enable mood check notifications</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="autoplay" defaultChecked />
                      <label htmlFor="autoplay">Autoplay videos</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="related" defaultChecked />
                      <label htmlFor="related">Show related video recommendations</label>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSavePreferences}
                  className="bg-bliss-teal hover:bg-bliss-teal/90"
                >
                  Save Preferences
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Mood History</h2>
              
              <div className="space-y-4">
                {moodHistory.map((entry, index) => (
                  <div key={index} className="flex items-center border-b pb-3">
                    <div className="w-24 font-medium">{entry.date}</div>
                    <div className="flex-1 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        entry.mood === 'happy' || entry.mood === 'energetic' 
                          ? 'bg-green-100 text-green-800' 
                          : entry.mood === 'sad' || entry.mood === 'anxious' 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {entry.mood}
                      </span>
                    </div>
                    <div>
                      {entry.improved ? (
                        <span className="text-sm text-green-600">Mood improved ↑</span>
                      ) : (
                        <span className="text-sm text-gray-500">No change</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline">
                  View Complete Mood History
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Your BlissBot Stats</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-bliss-teal">{userData.stats.videosWatched}</div>
                  <div className="text-gray-500">Videos Watched</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-bliss-peach">{userData.stats.moodImprovements}</div>
                  <div className="text-gray-500">Mood Improvements</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-bliss-blue">67%</div>
                  <div className="text-gray-500">Improvement Rate</div>
                </div>
              </div>
              
              <h3 className="font-medium mb-3">Favorite Video Categories</h3>
              <div className="flex gap-2 mb-6">
                {userData.stats.favoriteCategories.map((category, index) => (
                  <div key={index} className="px-3 py-1 bg-bliss-teal/20 text-bliss-teal rounded-full text-sm">
                    {category}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline">
                  Download Your Data
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageWrapper>
  );
};

export default Profile;
