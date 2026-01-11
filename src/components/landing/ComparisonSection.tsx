import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Check, X, Sparkles, TrendingUp, Clock, DollarSign, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const comparisonData = [
  {
    feature: "AI Moment Detection",
    klipix: true,
    others: "Limited",
  },
  {
    feature: "Viral Score Prediction",
    klipix: true,
    others: false,
  },
  {
    feature: "Auto B-Roll Insertion",
    klipix: true,
    others: false,
  },
  {
    feature: "Multi-Language Captions",
    klipix: "100+ Languages",
    others: "20-40 Languages",
  },
  {
    feature: "One-Click Social Publishing",
    klipix: true,
    others: "Limited",
  },
  {
    feature: "Brand Kit & Templates",
    klipix: true,
    others: "Paid Only",
  },
  {
    feature: "Long-Form Video Support",
    klipix: "Up to 4 Hours",
    others: "1-2 Hours",
  },
  {
    feature: "Free Plan Included",
    klipix: "30 Clips/Month",
    others: "Very Limited",
  },
  {
    feature: "Priority Processing",
    klipix: true,
    others: "Paid Only",
  },
  {
    feature: "API Access",
    klipix: true,
    others: "Enterprise Only",
  },
  {
    feature: "Team Collaboration",
    klipix: true,
    others: "Paid Only",
  },
  {
    feature: "24/7 Support",
    klipix: true,
    others: false,
  },
];

const stats = [
  { 
    numericValue: 90,
    suffix: "%",
    label: "Cheaper than hiring an editor",
    icon: DollarSign,
    delay: 0
  },
  { 
    numericValue: 10,
    suffix: "x",
    label: "Faster than manual clipping",
    icon: Zap,
    delay: 0.1
  },
  { 
    numericValue: 5,
    suffix: "x",
    label: "Increase in views",
    icon: TrendingUp,
    delay: 0.2
  },
  { 
    numericValue: 100,
    suffix: "%",
    label: "No manual tweaks needed",
    icon: Clock,
    delay: 0.3
  },
];

// Animated Counter Component
interface AnimatedCounterProps {
  value: number;
  suffix: string;
  delay?: number;
}

const AnimatedCounter = ({ value, suffix, delay = 0 }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, motionValue, value, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest) + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const ComparisonSection = () => {
  return (
    <section id="comparison" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 section-fade" />
      <motion.div 
        className="absolute top-1/4 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-primary/5 blur-[100px] md:blur-[150px]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-accent/5 blur-[100px] md:blur-[150px]"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container relative z-10 px-4">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <motion.span 
            className="inline-block text-primary text-xs sm:text-sm font-medium uppercase tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Faster, Cheaper, Better
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 px-2">
            Why Creators <span className="gradient-text">Choose KlipIx</span>
          </h2>
        </motion.div>

        {/* Animated Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto mb-16 sm:mb-24">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: stat.delay,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="glass-card p-4 sm:p-5 md:p-6 text-center group cursor-default"
            >
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl btn-gradient flex items-center justify-center mx-auto mb-3 sm:mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </motion.div>
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-1 sm:mb-2">
                <AnimatedCounter 
                  value={stat.numericValue} 
                  suffix={stat.suffix} 
                  delay={stat.delay}
                />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            KlipIx vs <span className="gradient-text">Other Tools</span>
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            See why KlipIx is the most powerful, affordable, and easy-to-use video clipping tool on the market.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card overflow-hidden overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 md:p-6 border-b border-border bg-secondary/30 min-w-[320px]">
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                Features
              </div>
              <div className="text-center">
                <motion.div 
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full btn-gradient"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                  <span className="font-bold text-primary-foreground text-xs sm:text-sm">KlipIx</span>
                </motion.div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-secondary">
                  <span className="font-medium text-muted-foreground text-xs sm:text-sm">Others</span>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border min-w-[320px]">
              {comparisonData.map((row, index) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.3)" }}
                  className={`grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 md:p-6 transition-colors duration-300 ${
                    index % 2 === 0 ? "bg-transparent" : "bg-secondary/10"
                  }`}
                >
                  <div className="text-xs sm:text-sm text-foreground font-medium flex items-center">
                    {row.feature}
                  </div>
                  <div className="flex items-center justify-center">
                    <RenderValue value={row.klipix} isKlipix={true} />
                  </div>
                  <div className="flex items-center justify-center">
                    <RenderValue value={row.others} isKlipix={false} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 sm:mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="gradient" size="lg" className="sm:text-base">
              Start Creating for Free
            </Button>
          </motion.div>
          <motion.p 
            className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            No credit card required • 30 free clips per month
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

interface RenderValueProps {
  value: boolean | string;
  isKlipix: boolean;
}

const RenderValue = ({ value, isKlipix }: RenderValueProps) => {
  if (typeof value === "boolean") {
    return value ? (
      <motion.div 
        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${isKlipix ? "bg-primary/20" : "bg-secondary"}`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        <Check className={`w-3 h-3 sm:w-5 sm:h-5 ${isKlipix ? "text-primary" : "text-muted-foreground"}`} />
      </motion.div>
    ) : (
      <motion.div 
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-secondary flex items-center justify-center"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        <X className="w-3 h-3 sm:w-5 sm:h-5 text-muted-foreground/50" />
      </motion.div>
    );
  }
  return (
    <motion.span 
      className={`text-[10px] sm:text-xs md:text-sm font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-center ${
        isKlipix 
          ? "text-primary bg-primary/10" 
          : "text-muted-foreground bg-secondary"
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {value}
    </motion.span>
  );
};

export default ComparisonSection;
