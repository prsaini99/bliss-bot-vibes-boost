
import React from 'react';
import { Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="w-full py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6 text-bliss-peach animate-pulse" />
        <Link to="/">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-bliss-teal to-bliss-blue bg-clip-text text-transparent">
            BlissBot
          </h1>
        </Link>
      </div>
      
      <div className="hidden md:flex items-center gap-4">
        <Link 
          to="/feed" 
          className={`text-sm px-3 py-2 ${
            location.pathname === '/feed' 
              ? 'text-bliss-teal font-medium' 
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Video Feed
        </Link>
        
        <Link 
          to="/assessment" 
          className={`text-sm px-3 py-2 ${
            location.pathname === '/assessment' 
              ? 'text-bliss-teal font-medium' 
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Mood Check
        </Link>
        
        <Link 
          to="/profile" 
          className={`text-sm px-3 py-2 ${
            location.pathname === '/profile' 
              ? 'text-bliss-teal font-medium' 
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Profile
        </Link>
      </div>
      
      <div>
        {location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup' ? (
          <>
            {location.pathname !== '/login' && location.pathname !== '/signup' && (
              <Link to="/login">
                <Button variant="outline" className="text-sm mr-2">
                  Log In
                </Button>
              </Link>
            )}
            {location.pathname !== '/signup' && (
              <Link to="/signup">
                <Button className="text-sm bg-bliss-teal hover:bg-bliss-teal/90">
                  Sign Up
                </Button>
              </Link>
            )}
          </>
        ) : (
          <Link to="/profile">
            <div className="w-8 h-8 bg-bliss-teal rounded-full flex items-center justify-center text-white font-medium">
              A
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
