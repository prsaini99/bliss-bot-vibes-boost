
import React, { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Settings, Shield, Bell, Heart, Camera, Mic, 
  Youtube, Search, Trash2, LogOut, CheckCircle,
  User, Eye, RefreshCw, Activity, Watch
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const SettingsPage = () => {
  const { toast } = useToast();
  
  const [privacySettings, setPrivacySettings] = useState({
    storeHealthData: false,
    facialRecognition: true,
    voiceAnalysis: true,
    locationTracking: false,
    shareAnonymousData: true
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    moodReminders: true,
    videoSuggestions: true,
    healthIntegrationAlerts: true,
    newFeatures: false
  });
  
  const [contentSettings, setContentSettings] = useState({
    contentFilter: 80,
    preferShortVideos: true,
    autoplayVideos: true,
    includeMusic: true,
    includeNatureVideos: true,
    includeFunnyVideos: true,
    includeMeditationVideos: true
  });
  
  const [connectedAccounts, setConnectedAccounts] = useState({
    youtube: false,
    vimeo: false,
    dailymotion: false,
    appleHealth: false,
    googleFit: false,
    fitbit: false
  });
  
  const handlePrivacyToggle = (setting: keyof typeof privacySettings) => {
    setPrivacySettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      
      toast({
        title: `${newSettings[setting] ? 'Enabled' : 'Disabled'} ${formatSettingName(setting)}`,
        description: `Your privacy settings have been updated.`,
        duration: 2000,
      });
      
      return newSettings;
    });
  };
  
  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      
      toast({
        title: `${newSettings[setting] ? 'Enabled' : 'Disabled'} ${formatSettingName(setting)}`,
        description: `Your notification preferences have been updated.`,
        duration: 2000,
      });
      
      return newSettings;
    });
  };
  
  const handleContentFilterChange = (value: number[]) => {
    setContentSettings(prev => ({
      ...prev,
      contentFilter: value[0]
    }));
  };
  
  const handleContentToggle = (setting: keyof typeof contentSettings) => {
    if (setting === 'contentFilter') return;
    
    setContentSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const toggleAccount = (account: keyof typeof connectedAccounts) => {
    setConnectedAccounts(prev => {
      const newStatus = !prev[account];
      
      toast({
        title: `${newStatus ? 'Connected to' : 'Disconnected from'} ${formatSettingName(account)}`,
        description: newStatus 
          ? `Your account has been successfully linked.` 
          : `Your account has been unlinked.`,
        duration: 2000,
      });
      
      return { ...prev, [account]: newStatus };
    });
  };
  
  const handleResetPreferences = () => {
    // Reset content settings to default
    setContentSettings({
      contentFilter: 80,
      preferShortVideos: true,
      autoplayVideos: true,
      includeMusic: true,
      includeNatureVideos: true,
      includeFunnyVideos: true,
      includeMeditationVideos: true
    });
    
    toast({
      title: "Preferences Reset",
      description: "Your content preferences have been reset to default settings.",
      duration: 2000,
    });
  };
  
  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "We've sent a confirmation email with further instructions.",
      duration: 3000,
    });
  };
  
  const formatSettingName = (setting: string): string => {
    // Convert camelCase to Title Case with spaces
    const result = setting.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  };
  
  return (
    <PageWrapper>
      <div className="w-full max-w-4xl px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Settings className="h-6 w-6 mr-2 text-bliss-teal" />
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/profile">Back to Profile</Link>
          </Button>
        </div>
        
        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="privacy" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center">
              <Search className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Accounts</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="privacy">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-bliss-teal" />
                Privacy Settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="storeHealthData">Store Health Data</Label>
                      <p className="text-sm text-gray-500">Save health metrics to improve recommendations over time</p>
                    </div>
                    <Switch
                      id="storeHealthData"
                      checked={privacySettings.storeHealthData}
                      onCheckedChange={() => handlePrivacyToggle('storeHealthData')}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <Label htmlFor="facialRecognition">Facial Recognition</Label>
                        <div className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Recommended</div>
                      </div>
                      <p className="text-sm text-gray-500">Detect mood from facial expressions (processed locally)</p>
                    </div>
                    <Switch
                      id="facialRecognition"
                      checked={privacySettings.facialRecognition}
                      onCheckedChange={() => handlePrivacyToggle('facialRecognition')}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <Label htmlFor="voiceAnalysis">Voice Analysis</Label>
                        <div className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Recommended</div>
                      </div>
                      <p className="text-sm text-gray-500">Detect mood from voice tone (processed locally)</p>
                    </div>
                    <Switch
                      id="voiceAnalysis"
                      checked={privacySettings.voiceAnalysis}
                      onCheckedChange={() => handlePrivacyToggle('voiceAnalysis')}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="locationTracking">Location Tracking</Label>
                      <p className="text-sm text-gray-500">Use location data to improve recommendations</p>
                    </div>
                    <Switch
                      id="locationTracking"
                      checked={privacySettings.locationTracking}
                      onCheckedChange={() => handlePrivacyToggle('locationTracking')}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="shareAnonymousData">Share Anonymous Usage Data</Label>
                      <p className="text-sm text-gray-500">Help us improve BlissBot with anonymous usage statistics</p>
                    </div>
                    <Switch
                      id="shareAnonymousData"
                      checked={privacySettings.shareAnonymousData}
                      onCheckedChange={() => handlePrivacyToggle('shareAnonymousData')}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild variant="outline" size="sm">
                  <Link to="/privacy">View Privacy Policy</Link>
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <Bell className="h-4 w-4 mr-2 text-bliss-teal" />
                Notification Preferences
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="moodReminders">Mood Check-in Reminders</Label>
                    <p className="text-sm text-gray-500">Daily reminders to assess your mood</p>
                  </div>
                  <Switch
                    id="moodReminders"
                    checked={notificationSettings.moodReminders}
                    onCheckedChange={() => handleNotificationToggle('moodReminders')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="videoSuggestions">Video Recommendations</Label>
                    <p className="text-sm text-gray-500">Notifications about new recommended videos</p>
                  </div>
                  <Switch
                    id="videoSuggestions"
                    checked={notificationSettings.videoSuggestions}
                    onCheckedChange={() => handleNotificationToggle('videoSuggestions')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="healthIntegrationAlerts">Health Integration Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified about health device connection issues</p>
                  </div>
                  <Switch
                    id="healthIntegrationAlerts"
                    checked={notificationSettings.healthIntegrationAlerts}
                    onCheckedChange={() => handleNotificationToggle('healthIntegrationAlerts')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newFeatures">New Features & Updates</Label>
                    <p className="text-sm text-gray-500">Stay informed about new BlissBot features</p>
                  </div>
                  <Switch
                    id="newFeatures"
                    checked={notificationSettings.newFeatures}
                    onCheckedChange={() => handleNotificationToggle('newFeatures')}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="content">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <Search className="h-4 w-4 mr-2 text-bliss-teal" />
                Content Preferences
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="contentFilter">Content Filter</Label>
                    <span className="text-sm text-gray-500">
                      {contentSettings.contentFilter < 30 ? 'Minimal' : 
                       contentSettings.contentFilter < 70 ? 'Moderate' : 'Strict'}
                    </span>
                  </div>
                  <Slider
                    id="contentFilter"
                    min={0}
                    max={100}
                    step={10}
                    value={[contentSettings.contentFilter]}
                    onValueChange={handleContentFilterChange}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">
                    Adjust how strictly we filter content for you
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="preferShortVideos">Prefer Short Videos</Label>
                    <p className="text-sm text-gray-500">Prioritize videos under 5 minutes</p>
                  </div>
                  <Switch
                    id="preferShortVideos"
                    checked={contentSettings.preferShortVideos}
                    onCheckedChange={() => handleContentToggle('preferShortVideos')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoplayVideos">Autoplay Videos</Label>
                    <p className="text-sm text-gray-500">Automatically play the next recommended video</p>
                  </div>
                  <Switch
                    id="autoplayVideos"
                    checked={contentSettings.autoplayVideos}
                    onCheckedChange={() => handleContentToggle('autoplayVideos')}
                  />
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-md font-medium mb-3">Video Categories</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeMusic">Music Videos</Label>
                      <Switch
                        id="includeMusic"
                        checked={contentSettings.includeMusic}
                        onCheckedChange={() => handleContentToggle('includeMusic')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeNatureVideos">Nature Videos</Label>
                      <Switch
                        id="includeNatureVideos"
                        checked={contentSettings.includeNatureVideos}
                        onCheckedChange={() => handleContentToggle('includeNatureVideos')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeFunnyVideos">Funny Videos</Label>
                      <Switch
                        id="includeFunnyVideos"
                        checked={contentSettings.includeFunnyVideos}
                        onCheckedChange={() => handleContentToggle('includeFunnyVideos')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeMeditationVideos">Meditation Videos</Label>
                      <Switch
                        id="includeMeditationVideos"
                        checked={contentSettings.includeMeditationVideos}
                        onCheckedChange={() => handleContentToggle('includeMeditationVideos')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleResetPreferences}
                    className="flex items-center"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset to Default Preferences
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="accounts">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <User className="h-4 w-4 mr-2 text-bliss-teal" />
                Connected Accounts
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-3">Video Platforms</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:border-bliss-teal/50 hover:bg-bliss-teal/5 transition-colors">
                      <div className="flex items-center">
                        <Youtube className="h-5 w-5 text-red-500 mr-3" />
                        <div>
                          <h4>YouTube</h4>
                          <p className="text-xs text-gray-500">Access ad-free content (requires Premium)</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {connectedAccounts.youtube && (
                          <span className="mr-3 text-xs text-green-600 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />Connected
                          </span>
                        )}
                        <Button 
                          size="sm" 
                          variant={connectedAccounts.youtube ? "outline" : "default"}
                          onClick={() => toggleAccount('youtube')}
                        >
                          {connectedAccounts.youtube ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:border-bliss-teal/50 hover:bg-bliss-teal/5 transition-colors">
                      <div className="flex items-center">
                        <div className="h-5 w-5 flex items-center justify-center text-blue-500 mr-3">V</div>
                        <div>
                          <h4>Vimeo</h4>
                          <p className="text-xs text-gray-500">High-quality ad-free video content</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {connectedAccounts.vimeo && (
                          <span className="mr-3 text-xs text-green-600 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />Connected
                          </span>
                        )}
                        <Button 
                          size="sm" 
                          variant={connectedAccounts.vimeo ? "outline" : "default"}
                          onClick={() => toggleAccount('vimeo')}
                        >
                          {connectedAccounts.vimeo ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:border-bliss-teal/50 hover:bg-bliss-teal/5 transition-colors">
                      <div className="flex items-center">
                        <div className="h-5 w-5 flex items-center justify-center text-blue-600 mr-3">D</div>
                        <div>
                          <h4>Dailymotion</h4>
                          <p className="text-xs text-gray-500">Alternative video platform</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {connectedAccounts.dailymotion && (
                          <span className="mr-3 text-xs text-green-600 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />Connected
                          </span>
                        )}
                        <Button 
                          size="sm" 
                          variant={connectedAccounts.dailymotion ? "outline" : "default"}
                          onClick={() => toggleAccount('dailymotion')}
                        >
                          {connectedAccounts.dailymotion ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-md font-medium mb-3">Health Platforms</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:border-bliss-teal/50 hover:bg-bliss-teal/5 transition-colors">
                      <div className="flex items-center">
                        <Heart className="h-5 w-5 text-red-500 mr-3" />
                        <div>
                          <h4>Apple Health</h4>
                          <p className="text-xs text-gray-500">Access heart rate and stress data</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {connectedAccounts.appleHealth && (
                          <span className="mr-3 text-xs text-green-600 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />Connected
                          </span>
                        )}
                        <Button 
                          size="sm" 
                          variant={connectedAccounts.appleHealth ? "outline" : "default"}
                          onClick={() => toggleAccount('appleHealth')}
                        >
                          {connectedAccounts.appleHealth ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:border-bliss-teal/50 hover:bg-bliss-teal/5 transition-colors">
                      <div className="flex items-center">
                        <Activity className="h-5 w-5 text-blue-500 mr-3" />
                        <div>
                          <h4>Google Fit</h4>
                          <p className="text-xs text-gray-500">Access fitness and heart data</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {connectedAccounts.googleFit && (
                          <span className="mr-3 text-xs text-green-600 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />Connected
                          </span>
                        )}
                        <Button 
                          size="sm" 
                          variant={connectedAccounts.googleFit ? "outline" : "default"}
                          onClick={() => toggleAccount('googleFit')}
                        >
                          {connectedAccounts.googleFit ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:border-bliss-teal/50 hover:bg-bliss-teal/5 transition-colors">
                      <div className="flex items-center">
                        <Watch className="h-5 w-5 text-purple-500 mr-3" />
                        <div>
                          <h4>Fitbit</h4>
                          <p className="text-xs text-gray-500">Access heart rate and sleep data</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {connectedAccounts.fitbit && (
                          <span className="mr-3 text-xs text-green-600 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />Connected
                          </span>
                        )}
                        <Button 
                          size="sm" 
                          variant={connectedAccounts.fitbit ? "outline" : "default"}
                          onClick={() => toggleAccount('fitbit')}
                        >
                          {connectedAccounts.fitbit ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-md font-medium mb-3 text-destructive">Danger Zone</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Download Your Data</h4>
                        <p className="text-xs text-gray-500">Get a copy of all your BlissBot data</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-destructive">Log Out From All Devices</h4>
                        <p className="text-xs text-gray-500">End all active sessions</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <LogOut className="h-4 w-4 mr-2" />
                        Log Out All
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-destructive">Delete Account</h4>
                        <p className="text-xs text-gray-500">Permanently delete your account and all data</p>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={handleDeleteAccount}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageWrapper>
  );
};

export default SettingsPage;
