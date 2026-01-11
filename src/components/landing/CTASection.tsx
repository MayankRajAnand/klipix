import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onOpenAuth: (mode: "login" | "signup") => void;
}

const CTASection = ({ onOpenAuth }: CTASectionProps) => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/20 blur-[150px]" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Headline */}
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Your Next <span className="gradient-text">Viral Clip</span>
            <br />
            Is Already in Your Video
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join 10,000+ creators who are saving time and getting more views
            with AI-powered short-form content.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="gradient"
              size="xl"
              onClick={() => onOpenAuth("signup")}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="gradient-outline" size="xl">
              <Calendar className="w-5 h-5" />
              Book a Demo
            </Button>
          </div>

          {/* Trust */}
          <p className="text-sm text-muted-foreground mt-8">
            No credit card required • Free forever plan available
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
