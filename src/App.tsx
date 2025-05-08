
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VideoFeed from "./pages/VideoFeed";
import Profile from "./pages/Profile";
import MoodAssessmentPage from "./pages/MoodAssessment";
import PremiumPlans from "./pages/PremiumPlans";
import NonPremium from "./pages/NonPremium";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HealthConnect from "./pages/HealthConnect";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          
          {/* App Core Routes */}
          <Route path="/feed" element={<VideoFeed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/assessment" element={<MoodAssessmentPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Health Integration Routes */}
          <Route path="/health-connect" element={<HealthConnect />} />
          
          {/* Plan Routes */}
          <Route path="/premium" element={<PremiumPlans />} />
          <Route path="/free-plan" element={<NonPremium />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
