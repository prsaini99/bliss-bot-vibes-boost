
import React from 'react';
import PageWrapper from '@/components/PageWrapper';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckIcon, XIcon, StarIcon, BadgeCheckIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const PremiumPlans = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelectPlan = (plan: string) => {
    if (plan === 'free') {
      navigate('/free-plan');
      return;
    }
    
    toast({
      title: `${plan} plan selected`,
      description: "In a real app, this would open payment processing.",
      duration: 3000,
    });
    
    // Simulate subscription process
    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  return (
    <PageWrapper>
      <div className="w-full max-w-6xl px-4 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Choose Your BlissBot Plan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upgrade your experience with premium features and get personalized content tailored to your mood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className="p-6 border-2 border-gray-200 flex flex-col hover:shadow-md transition-all">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">Free</h2>
              <div className="text-3xl font-bold mb-1">$0</div>
              <p className="text-sm text-gray-500">Forever free</p>
            </div>

            <div className="flex-grow space-y-4 mb-6">
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Daily mood check</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Basic video recommendations</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>5 videos per day</span>
              </div>
              <div className="flex items-start">
                <XIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-400">Personalized algorithm</span>
              </div>
              <div className="flex items-start">
                <XIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-400">Ad-free experience</span>
              </div>
            </div>
            
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => handleSelectPlan('free')}
            >
              View Details
            </Button>
          </Card>

          {/* Premium Plan */}
          <Card className="p-6 border-2 border-bliss-teal relative flex flex-col hover:shadow-lg transition-all transform scale-[1.02]">
            <div className="absolute top-0 right-0 bg-bliss-teal text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-md">
              Popular
            </div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">Premium</h2>
              <div className="text-3xl font-bold mb-1">$7.99<span className="text-base font-normal">/month</span></div>
              <p className="text-sm text-gray-500">Billed monthly</p>
            </div>

            <div className="flex-grow space-y-4 mb-6">
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Unlimited mood checks</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Advanced video recommendations</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Unlimited videos</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Personalized algorithm</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Ad-free experience</span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-bliss-teal hover:bg-bliss-teal/90"
              onClick={() => handleSelectPlan('premium')}
            >
              Select Premium
            </Button>
          </Card>

          {/* Enterprise Plan */}
          <Card className="p-6 border-2 border-gray-200 flex flex-col hover:shadow-md transition-all">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">Enterprise</h2>
              <div className="text-3xl font-bold mb-1">$19.99<span className="text-base font-normal">/month</span></div>
              <p className="text-sm text-gray-500">Billed monthly</p>
            </div>

            <div className="flex-grow space-y-4 mb-6">
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Everything in Premium</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Team member accounts</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Admin dashboard</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Analytics and reporting</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Priority support</span>
              </div>
            </div>
            
            <Button 
              variant="outline"
              className="w-full border-bliss-blue text-bliss-blue hover:bg-bliss-blue/10"
              onClick={() => handleSelectPlan('enterprise')}
            >
              Contact Sales
            </Button>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-6">All plans include:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-4">
              <div className="bg-bliss-teal/10 p-3 rounded-full mb-3">
                <BadgeCheckIcon className="h-6 w-6 text-bliss-teal" />
              </div>
              <h4 className="font-medium mb-1">Mood Tracking</h4>
              <p className="text-gray-600 text-sm text-center">Track your mood changes over time</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-bliss-blue/10 p-3 rounded-full mb-3">
                <StarIcon className="h-6 w-6 text-bliss-blue" />
              </div>
              <h4 className="font-medium mb-1">Video Content</h4>
              <p className="text-gray-600 text-sm text-center">Access to curated video content</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-bliss-peach/10 p-3 rounded-full mb-3">
                <StarIcon className="h-6 w-6 text-bliss-peach" />
              </div>
              <h4 className="font-medium mb-1">Support</h4>
              <p className="text-gray-600 text-sm text-center">Help when you need it</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PremiumPlans;
