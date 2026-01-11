import { motion } from "framer-motion";
import { Target, Type, Layout, Globe, Zap, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "AI Moment Detection",
    description:
      "Automatically finds the most engaging parts of your video using advanced AI analysis.",
  },
  {
    icon: Type,
    title: "Auto Captions & Subtitles",
    description:
      "Burned-in captions with emoji & emphasis that keep viewers hooked.",
  },
  {
    icon: Layout,
    title: "Multi-Platform Formats",
    description:
      "9:16, 1:1, 16:9 — optimized for Shorts, Reels, TikTok, and more.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description:
      "English, Hindi, Spanish, and more. Reach a global audience effortlessly.",
  },
  {
    icon: Zap,
    title: "One-Click Export",
    description:
      "Download instantly or post directly to your favorite platforms.",
  },
  {
    icon: BarChart3,
    title: "Performance Insights",
    description:
      "Predict viral potential with AI-powered analytics before you post.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-fade" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="container relative z-10 px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to Go <span className="gradient-text">Viral</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful AI tools that transform your long-form content into
            attention-grabbing short clips.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-card p-8 hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl btn-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
