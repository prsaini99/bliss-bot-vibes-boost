
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageWrapper>
      <div className="bliss-card p-8 max-w-md w-full text-center">
        <div className="text-6xl text-bliss-peach mb-4">404</div>
        <h1 className="text-2xl font-bold mb-4 text-bliss-teal">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button
          className="bg-bliss-teal hover:bg-bliss-teal/90"
          asChild
        >
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
