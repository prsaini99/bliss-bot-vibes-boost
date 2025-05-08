
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageWrapper;
