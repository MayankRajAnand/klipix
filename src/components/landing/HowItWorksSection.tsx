import { motion } from "framer-motion";
import { Upload, Sparkles, Scissors, Share2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload or Paste Link",
    description: "Drop your video file or paste a YouTube URL to get started.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "AI Analyzes Content",
    description: "Our AI scans for the most engaging moments, hooks, and highlights.",
  },
  {
    icon: Scissors,
    number: "03",
    title: "Select or Auto-Generate",
    description: "Choose from AI suggestions or let us auto-generate the best clips.",
  },
  {
    icon: Share2,
    number: "04",
    title: "Publish Everywhere",
    description: "Export or post directly to YouTube, TikTok, Instagram, and more.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px]" />

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
            How <span className="gradient-text">KlipIx</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From long video to viral shorts in four simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-[2px] bg-gradient-to-r from-primary/50 to-accent/50" />
                )}

                {/* Step Card */}
                <div className="relative">
                  <div className="w-20 h-20 mx-auto rounded-2xl glass-card flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full btn-gradient flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
