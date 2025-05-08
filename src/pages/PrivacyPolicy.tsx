
import React from 'react';
import PageWrapper from '@/components/PageWrapper';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Heart, FileText, ExternalLink } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <PageWrapper>
      <div className="w-full max-w-4xl px-4 py-6 md:py-8">
        <Card className="p-6 md:p-8">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-10 w-10 text-bliss-teal mr-3" />
            <h1 className="text-3xl font-bold text-bliss-teal">Privacy Policy</h1>
          </div>
          
          <div className="space-y-6 text-left">
            <section>
              <h2 className="text-xl font-semibold mb-2">Data We Collect</h2>
              <p className="text-gray-700">
                BlissBot is committed to protecting your privacy. Our app collects the following data with your explicit consent:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Questionnaire inputs about your mood</li>
                <li>Facial expressions (via camera) for mood detection</li>
                <li>Voice analysis (via microphone) for tone detection</li>
                <li>Heart rate and health data (via connected health devices)</li>
              </ul>
            </section>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-1 flex items-center">
                <Heart className="h-4 w-4 mr-2" /> Important Privacy Guarantee
              </h3>
              <p className="text-blue-700 text-sm">
                All biometric data (images, audio, heart rate) are only analyzed temporarily for emotion markers. 
                We do not store raw biometric data unless you explicitly consent to this.
              </p>
            </div>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">How We Use Your Data</h2>
              <p className="text-gray-700">
                We use your data solely to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Determine your current mood</li>
                <li>Recommend videos based on your mood</li>
                <li>Improve our recommendation algorithm</li>
                <li>Track effectiveness of mood improvement (with your consent)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">Third-Party Integrations</h2>
              <p className="text-gray-700">
                BlissBot integrates with the following third-party services:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>YouTube, Vimeo, and Dailymotion for video content</li>
                <li>Apple HealthKit, Google Fit, and Fitbit for health data</li>
                <li>Cloud services for AI analysis (Google Cloud, Azure, Amazon Rekognition)</li>
              </ul>
              <p className="mt-2 text-gray-700">
                Each of these services has their own privacy policy. We encourage you to review these policies before connecting these services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">Data Security</h2>
              <p className="text-gray-700">
                All data is encrypted in transit and at rest. We implement industry-standard security measures to protect your information.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
              <p className="text-gray-700">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Access your data</li>
                <li>Delete your account and associated data</li>
                <li>Opt out of mood tracking at any time</li>
                <li>Disconnect any third-party integrations</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">Updates to This Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
              </p>
            </section>
            
            <div className="flex items-center justify-center pt-4 border-t border-gray-200">
              <Button asChild variant="outline" className="mr-4">
                <Link to="/signup">
                  <FileText className="h-4 w-4 mr-2" />
                  Accept & Sign Up
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </Card>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Last updated: May 8, 2025</p>
          <div className="flex justify-center mt-2">
            <Link to="#" className="flex items-center text-bliss-teal hover:underline mx-2">
              Terms of Service <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
            <Link to="#" className="flex items-center text-bliss-teal hover:underline mx-2">
              Contact Us <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PrivacyPolicy;
