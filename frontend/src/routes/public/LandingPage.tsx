import Navbar from "@/components/layout/Navbar";
import { HeroSection } from "@/components/LandingPageComponents/HeroSection";

const LandingPage = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <HeroSection />
        </div>
    );
};

export default LandingPage;
