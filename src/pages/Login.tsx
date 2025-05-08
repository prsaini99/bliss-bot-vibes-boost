
import React, { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogin = (e: React.FormEvent) => {
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
    
    // In a real app, you would authenticate against your backend
    
    toast({
      title: "Welcome back!",
      description: "Successfully logged in",
      duration: 2000,
    });
    
    // Navigate to mood assessment
    setTimeout(() => {
      navigate('/assessment');
    }, 1000);
  };

  return (
    <PageWrapper>
      <Card className="bliss-card p-6 animate-fade-in max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6 text-bliss-teal">Log in to BlissBot</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-bliss-teal hover:bg-bliss-teal/90"
          >
            Log In
          </Button>
          
          <div className="flex items-center justify-between mt-4">
            <a href="#" className="text-sm text-bliss-blue hover:underline">Forgot password?</a>
            <a href="/signup" className="text-sm text-bliss-blue hover:underline">Create account</a>
          </div>
        </form>
      </Card>
    </PageWrapper>
  );
};

export default Login;
