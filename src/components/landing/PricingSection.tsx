import { motion } from "framer-motion";
import { Check, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    badge: "LIMITED OFFER",
    tagline: "For Beginners",
    description: "Perfect for getting started with AI shorts.",
    originalPrice: "$49",
    price: "$19",
    period: "Per Month",
    billedText: "Billed today: $19",
    highlight: "30 Short Clips / month",
    accessTo: ["AI Shorts"],
    features: [
      "30 Short Videos per Month",
      "720p Export Quality",
      "Basic AI Captions",
      "YouTube Shorts Optimized",
      "Instagram Reels Compatible",
      "TikTok Ready",
      "5 AI Voices",
      "Email Support",
    ],
    cta: "Subscribe",
    highlighted: false,
    bestValue: true,
  },
  {
    name: "Plus",
    badge: "POPULAR",
    tagline: "For Growing Creators",
    description: "Best for creators making Shorts, Reels & TikToks.",
    originalPrice: "$99",
    price: "$49",
    period: "Per Month",
    billedText: "Billed today: $49",
    highlight: "100 Short Clips / month",
    accessTo: ["AI Shorts", "Advanced Captions"],
    features: [
      "100 Short Videos per Month",
      "1080p Export Quality",
      "Advanced AI Captions with Emoji",
      "Multi-Language Support",
      "Priority Processing",
      "No Watermark",
      "20+ AI Voices",
      "Direct Platform Posting",
      "Priority Support",
    ],
    cta: "Subscribe",
    highlighted: true,
    bestValue: false,
  },
  {
    name: "Pro",
    badge: "BEST FOR TEAMS",
    tagline: "For All Video Creators",
    description: "Unlock unlimited clips and long-form support.",
    originalPrice: "$199",
    price: "$99",
    period: "Per Month",
    billedText: "Billed today: $99",
    highlight: "Unlimited Clips / month",
    secondaryHighlight: "Long-form video support",
    accessTo: ["Long-form Videos", "AI Shorts", "API Access"],
    features: [
      "Unlimited Short Videos",
      "4K Export Quality",
      "Long-Form Video Support (up to 2hrs)",
      "Brand Kit & Templates",
      "5 Team Members",
      "API Access",
      "Bulk Processing",
      "Analytics Dashboard",
      "Dedicated Account Manager",
      "Custom Integrations",
    ],
    cta: "Subscribe",
    highlighted: false,
    bestValue: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-fade" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="container relative z-10 px-4">
        {/* Limited Time Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium">
            <Zap className="w-4 h-4" />
            Limited Time Offer - Slots Filling Fast
          </span>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators who are already making viral content with KlipIx. Pick the plan that fits your workflow!
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.highlighted
                  ? "bg-gradient-to-b from-primary/20 via-background to-background border-2 border-primary/50 scale-105"
                  : "glass-card"
              }`}
            >
              {/* Best Value Badge */}
              {plan.bestValue && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-accent text-center py-1">
                  <span className="text-xs font-bold text-primary-foreground tracking-wider">BEST VALUE</span>
                </div>
              )}

              <div className={`p-8 ${plan.bestValue ? "pt-10" : ""}`}>
                {/* Plan Badge */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {plan.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    plan.highlighted 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground"
                  }`}>
                    {plan.badge}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-primary font-medium text-sm mb-1">{plan.tagline}</p>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-muted-foreground line-through text-lg">{plan.originalPrice}</span>
                    <span className="font-display text-5xl font-bold text-foreground">{plan.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-muted-foreground text-sm">USD</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.billedText}</p>
                </div>

                {/* CTA */}
                <Button
                  variant={plan.highlighted ? "gradient" : "gradient-outline"}
                  className="w-full mb-6"
                  size="lg"
                >
                  {plan.cta}
                </Button>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <Sparkles className="w-4 h-4 text-primary" />
                    {plan.highlight}
                  </div>
                  {plan.secondaryHighlight && (
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                      <Sparkles className="w-4 h-4 text-primary" />
                      {plan.secondaryHighlight}
                    </div>
                  )}
                </div>

                {/* Access To */}
                <div className="mb-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Get access to</p>
                  <div className="flex flex-wrap gap-2">
                    {plan.accessTo.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">What's included:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
