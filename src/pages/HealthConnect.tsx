
import React, { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Heart, Activity, Watch, SmartphoneNfc, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

interface HealthPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  description: string;
}

const HealthConnect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [healthPlatforms, setHealthPlatforms] = useState<HealthPlatform[]>([
    {
      id: 'apple-health',
      name: 'Apple HealthKit',
      icon: <Heart className="h-5 w-5 text-red-500" />,
      connected: false,
      description: 'Connect to access heart rate and stress data from Apple Health.'
    },
    {
      id: 'google-fit',
      name: 'Google Fit',
      icon: <Activity className="h-5 w-5 text-blue-500" />,
      connected: false,
      description: 'Connect to access fitness and heart data from Google Fit.'
    },
    {
      id: 'fitbit',
      name: 'Fitbit',
      icon: <Watch className="h-5 w-5 text-purple-500" />,
      connected: false,
      description: 'Connect to access heart rate, sleep, and stress data from Fitbit.'
    },
    {
      id: 'samsung-health',
      name: 'Samsung Health',
      icon: <SmartphoneNfc className="h-5 w-5 text-teal-500" />,
      connected: false,
      description: 'Connect to access health metrics from Samsung Health.'
    }
  ]);
  
  const [dataPermissions, setDataPermissions] = useState({
    heartRate: true,
    stressLevels: true,
    sleep: false,
    activity: false
  });
  
  const toggleConnection = (id: string) => {
    setHealthPlatforms(platforms => 
      platforms.map(platform => 
        platform.id === id 
          ? { ...platform, connected: !platform.connected } 
          : platform
      )
    );
    
    const platform = healthPlatforms.find(p => p.id === id);
    
    if (platform) {
      if (!platform.connected) {
        // Simulate connection
        toast({
          title: "Connecting to " + platform.name,
          description: "Please authorize access via the popup window.",
          duration: 2000,
        });
        
        // Simulate successful connection after delay
        setTimeout(() => {
          setHealthPlatforms(platforms => 
            platforms.map(p => 
              p.id === id ? { ...p, connected: true } : p
            )
          );
          
          toast({
            title: "Successfully connected!",
            description: `${platform.name} has been linked to your account.`,
            duration: 3000,
          });
        }, 2000);
      } else {
        toast({
          title: "Disconnected from " + platform.name,
          description: "Health data will no longer be used for mood detection.",
          duration: 2000,
        });
      }
    }
  };
  
  const handlePermissionToggle = (permission: keyof typeof dataPermissions) => {
    setDataPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };
  
  const handleContinue = () => {
    const anyConnected = healthPlatforms.some(platform => platform.connected);
    
    if (anyConnected) {
      toast({
        title: "Health data integration complete",
        description: "BlissBot will now use health data to enhance mood detection.",
        duration: 2000,
      });
    } else {
      toast({
        title: "No health platforms connected",
        description: "You can still use BlissBot without health data. You can connect later.",
        duration: 2000,
      });
    }
    
    navigate('/assessment');
  };
  
  return (
    <PageWrapper>
      <div className="w-full max-w-4xl px-4 py-6">
        <Card className="p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="bg-bliss-teal/10 inline-flex rounded-full p-3 mb-3">
              <Heart className="h-8 w-8 text-bliss-teal" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-bliss-teal">Connect Health Devices</h1>
            <p className="text-gray-600 mt-2">
              Enhance mood detection accuracy by connecting to your health platforms
            </p>
          </div>
          
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-amber-800">Privacy Note</h3>
                <p className="text-sm text-amber-700">
                  We only use health data for mood detection. Your data is never stored permanently unless you explicitly allow it in settings.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            {healthPlatforms.map((platform) => (
              <div key={platform.id} className="flex items-center justify-between p-4 rounded-lg border hover:border-bliss-teal/50 hover:bg-bliss-teal/5 transition-colors">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-full shadow-sm mr-4">
                    {platform.icon}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{platform.name}</h3>
                      {platform.connected && (
                        <span className="ml-2 inline-flex items-center text-xs font-medium text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" /> Connected
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{platform.description}</p>
                  </div>
                </div>
                <Button 
                  variant={platform.connected ? "outline" : "default"}
                  className={platform.connected ? "border-green-400 text-green-700" : ""}
                  onClick={() => toggleConnection(platform.id)}
                >
                  {platform.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
          
          <Separator className="my-6" />
          
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Data Access Permissions</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="heart-rate" className="cursor-pointer">Heart Rate</Label>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Recommended</div>
                </div>
                <Switch 
                  id="heart-rate" 
                  checked={dataPermissions.heartRate}
                  onCheckedChange={() => handlePermissionToggle('heartRate')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="stress" className="cursor-pointer">Stress Levels</Label>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Recommended</div>
                </div>
                <Switch 
                  id="stress" 
                  checked={dataPermissions.stressLevels}
                  onCheckedChange={() => handlePermissionToggle('stressLevels')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="sleep" className="cursor-pointer">Sleep Data</Label>
                <Switch 
                  id="sleep" 
                  checked={dataPermissions.sleep}
                  onCheckedChange={() => handlePermissionToggle('sleep')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="activity" className="cursor-pointer">Activity & Exercise</Label>
                <Switch 
                  id="activity" 
                  checked={dataPermissions.activity}
                  onCheckedChange={() => handlePermissionToggle('activity')}
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
            >
              Skip for now
            </Button>
            <Button 
              onClick={handleContinue}
              className="bg-bliss-teal hover:bg-bliss-teal/90 flex items-center"
            >
              Continue to Mood Assessment
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default HealthConnect;
