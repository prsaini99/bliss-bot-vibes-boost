
import React, { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

// Define the psycometric test questions
const psycometricQuestions = [
  {
    id: 'q1',
    question: 'I enjoy social gatherings and being around people.',
    options: [
      { value: 'strongly_agree', label: 'Strongly Agree' },
      { value: 'agree', label: 'Agree' },
      { value: 'neutral', label: 'Neutral' },
      { value: 'disagree', label: 'Disagree' },
      { value: 'strongly_disagree', label: 'Strongly Disagree' },
    ]
  },
  {
    id: 'q2',
    question: 'I prefer having a structured plan rather than spontaneity.',
    options: [
      { value: 'strongly_agree', label: 'Strongly Agree' },
      { value: 'agree', label: 'Agree' },
      { value: 'neutral', label: 'Neutral' },
      { value: 'disagree', label: 'Disagree' },
      { value: 'strongly_disagree', label: 'Strongly Disagree' },
    ]
  },
  {
    id: 'q3',
    question: 'I find it easy to stay relaxed even when there is pressure.',
    options: [
      { value: 'strongly_agree', label: 'Strongly Agree' },
      { value: 'agree', label: 'Agree' },
      { value: 'neutral', label: 'Neutral' },
      { value: 'disagree', label: 'Disagree' },
      { value: 'strongly_disagree', label: 'Strongly Disagree' },
    ]
  },
  {
    id: 'q4',
    question: 'I am more of a practical person than an imaginative one.',
    options: [
      { value: 'strongly_agree', label: 'Strongly Agree' },
      { value: 'agree', label: 'Agree' },
      { value: 'neutral', label: 'Neutral' },
      { value: 'disagree', label: 'Disagree' },
      { value: 'strongly_disagree', label: 'Strongly Disagree' },
    ]
  },
  {
    id: 'q5',
    question: 'I enjoy abstract or theoretical conversations.',
    options: [
      { value: 'strongly_agree', label: 'Strongly Agree' },
      { value: 'agree', label: 'Agree' },
      { value: 'neutral', label: 'Neutral' },
      { value: 'disagree', label: 'Disagree' },
      { value: 'strongly_disagree', label: 'Strongly Disagree' },
    ]
  }
];

// Define the type for the form values to ensure type safety
type FormValues = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
};

const Signup = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Setup form for psycometric test with proper typing
  const form = useForm<FormValues>({
    defaultValues: {
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: ''
    }
  });

  const handleInitialSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        duration: 3000,
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        duration: 3000,
      });
      return;
    }
    
    // Move to psycometric test
    setStep(2);
    
    toast({
      title: "Great!",
      description: "Now let's learn about your personality.",
      duration: 2000,
    });
  };
  
  const onPsycometricSubmit = (data: FormValues) => {
    // Process psycometric data
    console.log("Psycometric test results:", data);
    
    // In a real app, you would send this data to your backend
    
    toast({
      title: "Account created!",
      description: "Welcome to BlissBot. Now let's find videos for you!",
      duration: 3000,
    });
    
    // Navigate to mood assessment
    setTimeout(() => {
      navigate('/assessment');
    }, 2000);
  };

  return (
    <PageWrapper>
      <Card className="bliss-card p-6 animate-fade-in max-w-md w-full">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6 text-bliss-teal">Create your BlissBot account</h2>
            
            <form onSubmit={handleInitialSignup} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input
                  id="email"
                  type="email"
                  className="w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                <Input
                  id="password"
                  type="password"
                  className="w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-bliss-teal hover:bg-bliss-teal/90"
              >
                Continue
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account? <a href="/login" className="text-bliss-blue hover:underline">Log in</a>
              </p>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6 text-bliss-teal">Personality Assessment</h2>
            <p className="text-gray-600 text-sm mb-6">This helps us recommend videos that match your personality and preferences.</p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onPsycometricSubmit)} className="space-y-6">
                {psycometricQuestions.map((q) => (
                  <FormField
                    key={q.id}
                    control={form.control}
                    name={q.id as keyof FormValues}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>{q.question}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {q.options.map((option) => (
                              <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={option.value} />
                                </FormControl>
                                <FormLabel className="font-normal">{option.label}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
                
                <Button 
                  type="submit"
                  className="w-full bg-bliss-teal hover:bg-bliss-teal/90"
                >
                  Complete Signup
                </Button>
              </form>
            </Form>
          </>
        )}
      </Card>
    </PageWrapper>
  );
};

export default Signup;
