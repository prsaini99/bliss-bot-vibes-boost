
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageWrapperProps {
  children: React.ReactNode;
  hideFooter?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ 
  children, 
  hideFooter = false, 
  fullWidth = false,
  className = ""
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header />
      <main className={`flex-1 flex items-start justify-center py-6 px-4 md:px-6 ${className}`}>
        <div className={`w-full ${fullWidth ? '' : 'max-w-7xl mx-auto'}`}>
          {children}
        </div>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default PageWrapper;
