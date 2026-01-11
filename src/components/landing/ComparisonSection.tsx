import { motion } from "framer-motion";
import { Check, X, Sparkles, TrendingUp, Clock, DollarSign, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    value: "90%", 
    label: "Cheaper than hiring an editor",
    icon: DollarSign,
    delay: 0
  },
  { 
    value: "10x", 
    label: "Faster than manual clipping",
    icon: Zap,
    delay: 0.1
  },
  { 
    value: "5x", 
    label: "Increase in views",
    icon: TrendingUp,
    delay: 0.2
  },
  { 
    value: "100%", 
    label: "No manual tweaks needed",
    icon: Clock,
    delay: 0.3
  },
];

const ComparisonSection = () => {
  return (
    <section id="comparison" className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 section-fade" />
      <motion.div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]"
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
        className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[150px]"
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
          className="text-center mb-8"
        >
          <motion.span 
            className="inline-block text-primary text-sm font-medium uppercase tracking-wider"
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
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Why Creators <span className="gradient-text">Choose KlipIx</span>
          </h2>
        </motion.div>

        {/* Animated Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-24">
          {stats.map((stat, index) => (
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
              className="glass-card p-6 text-center group cursor-default"
            >
              <motion.div
                className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <motion.div 
                className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: stat.delay + 0.3 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
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
          className="text-center mb-12"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            KlipIx vs <span className="gradient-text">Other Tools</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
          <div className="glass-card overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-4 md:p-6 border-b border-border bg-secondary/30">
              <div className="text-sm font-medium text-muted-foreground">
                Features
              </div>
              <div className="text-center">
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full btn-gradient"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                  <span className="font-bold text-primary-foreground">KlipIx</span>
                </motion.div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
                  <span className="font-medium text-muted-foreground text-sm">Other Tools</span>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border">
              {comparisonData.map((row, index) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.3)" }}
                  className={`grid grid-cols-3 gap-4 p-4 md:p-6 transition-colors duration-300 ${
                    index % 2 === 0 ? "bg-transparent" : "bg-secondary/10"
                  }`}
                >
                  <div className="text-sm text-foreground font-medium flex items-center">
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
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="gradient" size="xl">
              Start Creating for Free
            </Button>
          </motion.div>
          <motion.p 
            className="text-sm text-muted-foreground mt-4"
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
        className={`w-8 h-8 rounded-full flex items-center justify-center ${isKlipix ? "bg-primary/20" : "bg-secondary"}`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        <Check className={`w-5 h-5 ${isKlipix ? "text-primary" : "text-muted-foreground"}`} />
      </motion.div>
    ) : (
      <motion.div 
        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        <X className="w-5 h-5 text-muted-foreground/50" />
      </motion.div>
    );
  }
  return (
    <motion.span 
      className={`text-xs md:text-sm font-medium px-3 py-1 rounded-full ${
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
