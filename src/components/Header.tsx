
import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <div className="w-full py-4 px-6 flex items-center justify-between relative">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6 text-bliss-peach animate-pulse" />
        <Link to="/">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-bliss-teal to-bliss-blue bg-clip-text text-transparent">
            BlissBot
          </h1>
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        <Link 
          to="/feed" 
          className={`text-sm px-3 py-2 rounded-md transition-colors ${
            location.pathname === '/feed' 
              ? 'bg-bliss-teal/10 text-bliss-teal font-medium' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          Video Feed
        </Link>
        
        <Link 
          to="/assessment" 
          className={`text-sm px-3 py-2 rounded-md transition-colors ${
            location.pathname === '/assessment' 
              ? 'bg-bliss-teal/10 text-bliss-teal font-medium' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          Mood Check
        </Link>
        
        <Link 
          to="/premium" 
          className={`text-sm px-3 py-2 rounded-md transition-colors ${
            location.pathname === '/premium' || location.pathname === '/free-plan'
              ? 'bg-bliss-teal/10 text-bliss-teal font-medium' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          Premium
        </Link>
        
        <Link 
          to="/profile" 
          className={`text-sm px-3 py-2 rounded-md transition-colors ${
            location.pathname === '/profile' 
              ? 'bg-bliss-teal/10 text-bliss-teal font-medium' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          Profile
        </Link>
      </div>
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="p-1">
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>
      
      {/* User profile or auth buttons */}
      <div className="hidden md:block">
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
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 py-4 px-6 md:hidden animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/feed" 
              className={`text-sm py-2 ${location.pathname === '/feed' ? 'text-bliss-teal font-medium' : 'text-gray-600'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Video Feed
            </Link>
            
            <Link 
              to="/assessment" 
              className={`text-sm py-2 ${location.pathname === '/assessment' ? 'text-bliss-teal font-medium' : 'text-gray-600'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Mood Check
            </Link>
            
            <Link 
              to="/premium" 
              className={`text-sm py-2 ${location.pathname === '/premium' ? 'text-bliss-teal font-medium' : 'text-gray-600'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Premium
            </Link>
            
            <Link 
              to="/profile" 
              className={`text-sm py-2 ${location.pathname === '/profile' ? 'text-bliss-teal font-medium' : 'text-gray-600'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
            
            <div className="pt-4 border-t border-gray-200">
              {location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup' ? (
                <div className="flex flex-col space-y-2">
                  {location.pathname !== '/login' && location.pathname !== '/signup' && (
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="text-sm w-full">
                        Log In
                      </Button>
                    </Link>
                  )}
                  {location.pathname !== '/signup' && (
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="text-sm w-full bg-bliss-teal hover:bg-bliss-teal/90">
                        Sign Up
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-bliss-teal rounded-full flex items-center justify-center text-white font-medium">
                      A
                    </div>
                    <span>Profile</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
