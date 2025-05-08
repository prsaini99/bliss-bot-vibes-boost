
import React from 'react';
import PageWrapper from '@/components/PageWrapper';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowRight, Lock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const NonPremium = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleUpgrade = () => {
    toast({
      title: "Redirecting to premium plans",
      description: "Let's find the right plan for you!",
      duration: 2000,
    });
    navigate('/premium');
  };
  
  return (
    <PageWrapper>
      <div className="w-full max-w-4xl px-4 animate-fade-in">
        <Card className="p-6 mb-8">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium text-amber-800">Feature limited</p>
              <p className="text-sm text-amber-700">You're currently on the free plan. Upgrade to access premium features.</p>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Your Free Plan</h1>
          
          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-lg font-medium mb-3 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Available Features
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Basic mood assessment (once per day)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Up to 5 video recommendations per day</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Limited video categories</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Basic mood tracking</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-3 flex items-center">
                <Lock className="h-5 w-5 text-gray-400 mr-2" />
                Premium Features (Locked)
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 opacity-80">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-gray-600">Unlimited mood assessments</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-gray-600">Unlimited video recommendations</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-gray-600">Advanced personalization algorithm</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-gray-600">Ad-free experience</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-gray-600">Detailed mood analytics and trends</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-gray-600">Custom video playlists</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-bliss-teal/10 to-bliss-blue/10 rounded-lg p-6 border border-bliss-teal/20 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold text-center mb-3">Ready to unlock all features?</h3>
            <p className="text-center text-gray-600 mb-6">Get unlimited access to all BlissBot premium features</p>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleUpgrade}
                className="bg-bliss-teal hover:bg-bliss-teal/90 flex items-center gap-2"
              >
                Upgrade to Premium
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
        
        <div className="text-center">
          <h2 className="font-medium text-lg mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4 text-left">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium">What's the difference between free and premium plans?</h3>
              <p className="text-gray-600 text-sm mt-1">Premium plans offer unlimited video recommendations, personalized content, and advanced mood tracking features.</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium">Can I cancel my premium subscription anytime?</h3>
              <p className="text-gray-600 text-sm mt-1">Yes, you can cancel your premium subscription at any time from your account settings.</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium">Will I lose my data if I switch between plans?</h3>
              <p className="text-gray-600 text-sm mt-1">No, all your mood history and preferences will be preserved regardless of your plan.</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NonPremium;
