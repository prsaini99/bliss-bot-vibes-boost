
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header />
      <main className="flex-1 flex items-start justify-center py-6 px-4 md:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageWrapper;
