import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVisual from "@/assets/hero-visual.png";
import { useState, useEffect } from "react";

const taglines = [
  "Create Viral Shorts from Long Videos",
  "Generate AI-Powered Faceless Videos",
  "Auto-Create Scroll-Stopping Clips",
  "Transform Podcasts into Viral Reels",
  "Generate Viral Scripts in Seconds",
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const platforms = [
    { name: "YouTube", icon: "📺" },
    { name: "TikTok", icon: "🎵" },
    { name: "Instagram", icon: "📸" },
    { name: "Twitter", icon: "🐦" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[150px] animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[150px] animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), 
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Used by 10,000+ creators worldwide
            </span>
          </motion.div>

          {/* Headline with Typing Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight min-h-[1.2em] md:min-h-[2.4em]"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTaglineIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="block"
              >
                <span className="gradient-text">
                  {taglines[currentTaglineIndex]}
                </span>
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            AI-powered video editor that finds viral moments, adds captions, and
            formats for every platform. Turn hours of content into
            scroll-stopping clips.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              variant="gradient"
              size="xl"
              onClick={() => navigate("/auth")}
              className="w-full sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="gradient-outline"
              size="xl"
              className="w-full sm:w-auto"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <span className="text-sm text-muted-foreground">Works with:</span>
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <span className="text-xl">{platform.icon}</span>
                <span className="text-sm font-medium">{platform.name}</span>
              </div>
            ))}
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="glass-card p-2 rounded-2xl glow-effect">
              <img
                src={heroVisual}
                alt="KlipIx AI Video Editor Interface"
                className="w-full rounded-xl"
              />
            </div>
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -left-8 glass-card p-4 rounded-xl hidden lg:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-xl">✓</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">
                  Auto Captions
                </p>
                <p className="text-xs text-muted-foreground">
                  Added successfully
                </p>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -right-6 glass-card p-4 rounded-xl hidden lg:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-xl">🎬</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">
                  12 Clips Created
                </p>
                <p className="text-xs text-muted-foreground">Ready to export</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
