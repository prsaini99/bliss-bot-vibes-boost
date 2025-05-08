
import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="w-full py-4 px-6 text-center text-sm text-gray-500">
      <p>BlissBot &copy; 2025 - Mood-based video recommendations</p>
      <div className="flex justify-center mt-2 gap-4">
        <a href="#" className="hover:text-bliss-teal transition-colors">Privacy</a>
        <a href="#" className="hover:text-bliss-teal transition-colors">Terms</a>
        <a href="#" className="hover:text-bliss-teal transition-colors">Contact</a>
      </div>
    </div>
  );
};

export default Footer;
