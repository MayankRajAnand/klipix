import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import DemoSection from "@/components/landing/DemoSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import AuthModal from "@/components/landing/AuthModal";

const Index = () => {
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: "login" | "signup";
  }>({
    isOpen: false,
    mode: "signup",
  });

  const openAuth = (mode: "login" | "signup") => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuth = () => {
    setAuthModal({ ...authModal, isOpen: false });
  };

  const switchAuthMode = () => {
    setAuthModal({
      ...authModal,
      mode: authModal.mode === "login" ? "signup" : "login",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuth={openAuth} />
      <HeroSection onOpenAuth={openAuth} />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoSection />
      <TestimonialsSection />
      <ComparisonSection />
      <PricingSection />
      <CTASection onOpenAuth={openAuth} />
      <Footer />
      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={closeAuth}
        onModeSwitch={switchAuthMode}
      />
    </div>
  );
};

export default Index;
