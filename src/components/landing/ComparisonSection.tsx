import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const competitors = [
  { name: "Opus Clip", logo: "🎬" },
  { name: "Vizard", logo: "✂️" },
  { name: "Descript", logo: "📝" },
];

const comparisonData = [
  {
    feature: "AI Moment Detection",
    klipix: true,
    others: [true, true, false],
  },
  {
    feature: "Viral Score Prediction",
    klipix: true,
    others: [true, false, false],
  },
  {
    feature: "Auto B-Roll Insertion",
    klipix: true,
    others: [false, false, true],
  },
  {
    feature: "Multi-Language Captions",
    klipix: "100+ languages",
    others: ["29 languages", "40 languages", "23 languages"],
  },
  {
    feature: "One-Click Social Publishing",
    klipix: true,
    others: [false, true, false],
  },
  {
    feature: "Brand Kit & Templates",
    klipix: true,
    others: [false, true, true],
  },
  {
    feature: "Long-Form Video Support",
    klipix: "Up to 4 hours",
    others: ["2 hours", "3 hours", "Unlimited"],
  },
  {
    feature: "Free Plan",
    klipix: "30 clips/month",
    others: ["60 mins/month", "10 mins", "1 hour"],
  },
  {
    feature: "Starting Price",
    klipix: "$19/month",
    others: ["$19/month", "$24/month", "$12/month"],
  },
  {
    feature: "API Access",
    klipix: true,
    others: [false, true, true],
  },
  {
    feature: "Team Collaboration",
    klipix: true,
    others: [false, true, true],
  },
  {
    feature: "Priority Processing",
    klipix: true,
    others: ["Paid only", true, "Paid only"],
  },
];

const stats = [
  { value: "90%", label: "Cheaper than hiring an editor" },
  { value: "10x", label: "Faster than manual clipping" },
  { value: "5x", label: "Increase in views" },
  { value: "100%", label: "No manual tweaks needed" },
];

const ComparisonSection = () => {
  return (
    <section id="comparison" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-fade" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="container relative z-10 px-4">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Faster, Cheaper, Better
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
            Why Creators <span className="gradient-text">Choose KlipIx</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
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
            See How KlipIx <span className="gradient-text">Compares</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've built KlipIx to be the most powerful, affordable, and easy-to-use video clipping tool on the market.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="glass-card overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 p-4 md:p-6 border-b border-border bg-secondary/30">
              <div className="col-span-1 text-sm font-medium text-muted-foreground">
                Features
              </div>
              <div className="col-span-1 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full btn-gradient">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                  <span className="font-bold text-primary-foreground">KlipIx</span>
                </div>
              </div>
              {competitors.map((competitor) => (
                <div key={competitor.name} className="col-span-1 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
                    <span>{competitor.logo}</span>
                    <span className="font-medium text-foreground text-sm hidden sm:inline">{competitor.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border">
              {comparisonData.map((row, index) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-5 gap-4 p-4 md:p-6 ${
                    index % 2 === 0 ? "bg-transparent" : "bg-secondary/10"
                  }`}
                >
                  <div className="col-span-1 text-sm text-foreground font-medium flex items-center">
                    {row.feature}
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    {renderValue(row.klipix, true)}
                  </div>
                  {row.others.map((value, idx) => (
                    <div key={idx} className="col-span-1 flex items-center justify-center">
                      {renderValue(value, false)}
                    </div>
                  ))}
                </div>
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
          <Button variant="gradient" size="xl">
            Start Creating for Free
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • 30 free clips per month
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const renderValue = (value: boolean | string, isKlipix: boolean) => {
  if (typeof value === "boolean") {
    return value ? (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isKlipix ? "bg-primary/20" : "bg-secondary"}`}>
        <Check className={`w-5 h-5 ${isKlipix ? "text-primary" : "text-muted-foreground"}`} />
      </div>
    ) : (
      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
        <X className="w-5 h-5 text-muted-foreground/50" />
      </div>
    );
  }
  return (
    <span className={`text-xs md:text-sm font-medium ${isKlipix ? "text-primary" : "text-muted-foreground"}`}>
      {value}
    </span>
  );
};

export default ComparisonSection;
