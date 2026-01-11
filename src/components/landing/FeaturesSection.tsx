import { motion } from "framer-motion";
import { Sparkles, Type, Layout, Globe, Zap, BarChart3, Wand2, Video } from "lucide-react";
import { useState } from "react";

const features = [
  {
    id: "ai-clipping",
    icon: Sparkles,
    number: "01",
    title: "AI Clipping",
    subtitle: "Let AI find highlights and reframe for TikTok, Reels and Shorts",
    description:
      "KlipIx automatically identifies engaging moments, cuts them with one click, and centers key subjects in vertical format — no manual resizing needed.",
    gradient: "from-primary to-accent",
  },
  {
    id: "ai-captions",
    icon: Type,
    number: "02",
    title: "AI Captions + Emoji",
    subtitle: "Add viral-style captions with animated text and contextual emojis",
    description:
      "Burned-in captions with word-by-word highlights, emoji emphasis, and multiple caption styles that keep viewers hooked till the end.",
    gradient: "from-accent to-primary",
  },
  {
    id: "ai-broll",
    icon: Video,
    number: "03",
    title: "AI B-Roll",
    subtitle: "Automatically insert relevant stock footage and visuals",
    description:
      "KlipIx analyzes your content and suggests matching B-roll footage to make your clips more engaging and professional.",
    gradient: "from-primary via-accent to-primary",
  },
  {
    id: "social-ready",
    icon: Layout,
    number: "04",
    title: "Social-Ready Export",
    subtitle: "One-click export for every platform with optimized formats",
    description:
      "Export in 9:16 for TikTok & Reels, 1:1 for Instagram, or 16:9 for YouTube — with auto-generated captions and hashtags.",
    gradient: "from-accent to-primary",
  },
];

const additionalFeatures = [
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Transcribe and translate in 100+ languages to reach global audiences.",
  },
  {
    icon: Zap,
    title: "One-Click Publishing",
    description: "Post directly to TikTok, YouTube, and Instagram from KlipIx.",
  },
  {
    icon: BarChart3,
    title: "Virality Score",
    description: "AI predicts which clips will perform best before you post.",
  },
  {
    icon: Wand2,
    title: "Brand Templates",
    description: "Save custom templates with your fonts, colors, and logo.",
  },
];

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-fade" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="container relative z-10 px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            What makes KlipIx different?
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            AI Features That <span className="gradient-text">Actually Work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful AI tools that transform your long-form content into attention-grabbing short clips.
          </p>
        </motion.div>

        {/* Main Features - Interactive Tabs */}
        <div className="max-w-6xl mx-auto mb-20">
          {/* Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(index)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFeature === index
                    ? "btn-gradient text-primary-foreground shadow-lg"
                    : "glass-card hover:border-primary/50 text-foreground"
                }`}
              >
                <feature.icon className="w-4 h-4" />
                {feature.title}
              </button>
            ))}
          </div>

          {/* Active Feature Display */}
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`text-6xl font-display font-bold bg-gradient-to-r ${features[activeFeature].gradient} bg-clip-text text-transparent opacity-50`}>
                    {features[activeFeature].number}
                  </span>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${features[activeFeature].gradient} flex items-center justify-center`}>
                    {(() => {
                      const IconComponent = features[activeFeature].icon;
                      return <IconComponent className="w-7 h-7 text-primary-foreground" />;
                    })()}
                  </div>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {features[activeFeature].title}
                </h3>
                <p className="text-lg text-primary font-medium mb-4">
                  {features[activeFeature].subtitle}
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {features[activeFeature].description}
                </p>
              </div>

              {/* Visual Placeholder */}
              <div className="order-1 md:order-2">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary border border-border">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${features[activeFeature].gradient} opacity-20 blur-3xl`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      {(() => {
                        const IconComponent = features[activeFeature].icon;
                        return <IconComponent className="w-16 h-16 text-primary" />;
                      })()}
                      <span className="text-muted-foreground text-sm">Feature Preview</span>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Plus, Everything Else You Need
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 text-center hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-muted-foreground">
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
