
import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="w-full py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6 text-bliss-peach animate-pulse" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-bliss-teal to-bliss-blue bg-clip-text text-transparent">
          BlissBot
        </h1>
      </div>
      <div>
        <button className="text-sm px-4 py-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80 transition-all duration-300">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Header;
