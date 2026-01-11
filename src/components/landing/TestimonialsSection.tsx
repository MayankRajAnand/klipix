import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "1M+ YouTube Views",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    quote: "KlipIx is the BEST way to generate 100 great shorts per month that actually get views.",
    badge: "Top Creator",
  },
  {
    name: "Alex Chen",
    role: "500K+ Shorts Views",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "It does things that you would have to pay thousands to freelancers to do or spend countless hours.",
  },
  {
    name: "Maya Johnson",
    role: "Professional Video Editor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    quote: "In just 2-3 minutes it does what I do in 2-3 hours. Speed, quality, price - 10/10.",
  },
  {
    name: "James Wilson",
    role: "215K YouTube Subs",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "After seeing dozens of AI tools, I can safely say KlipIx is the ultimate tool for automating YouTube Shorts!",
  },
  {
    name: "Emma Davis",
    role: "Podcast Host",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    quote: "It's actually incredible! Transformed my 1-hour podcasts into 15 viral shorts effortlessly.",
    badge: "Verified",
  },
  {
    name: "David Kim",
    role: "Content Agency Owner",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    quote: "We've cut our video editing costs by 80%. KlipIx is a game-changer for agencies.",
  },
  {
    name: "Lisa Anderson",
    role: "1M+ Instagram Followers",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    quote: "I am not spending a single penny anymore on expensive video editors. It's so simple to use, loved it!",
  },
  {
    name: "Mike Thompson",
    role: "Gaming YouTuber",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    quote: "KlipIx finds the best gaming moments automatically. My Shorts channel exploded!",
  },
];

// Duplicate for infinite scroll
const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-fade" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 px-4"
        >
          {/* Trust Badge - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary" />
              ))}
              <span className="ml-2 text-foreground font-semibold text-sm sm:text-base">4.8</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-muted-foreground hidden sm:inline">|</span>
              <span className="text-muted-foreground text-xs sm:text-sm">500+ reviews</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground text-xs sm:text-sm">
                <span className="text-foreground font-semibold">10K+</span> creators
              </span>
            </div>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-2">
            Don't Just Take Our <span className="gradient-text">Word For It</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Here's what our users say
          </p>
        </motion.div>

        {/* Infinite Marquee - Row 1 (left to right) */}
        <div className="relative mb-4 sm:mb-6 overflow-hidden">
          <div className="flex">
            <div className="flex animate-marquee">
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
              ))}
            </div>
            <div className="flex animate-marquee" aria-hidden="true">
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`row1-dup-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
          {/* Gradient Fade Edges - Smaller on mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>

        {/* Infinite Marquee - Row 2 (right to left) - Hidden on small mobile */}
        <div className="relative overflow-hidden hidden sm:block">
          <div className="flex">
            <div className="flex animate-marquee-reverse">
              {duplicatedTestimonials.slice().reverse().map((testimonial, index) => (
                <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
              ))}
            </div>
            <div className="flex animate-marquee-reverse" aria-hidden="true">
              {duplicatedTestimonials.slice().reverse().map((testimonial, index) => (
                <TestimonialCard key={`row2-dup-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
          {/* Gradient Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: {
    name: string;
    role: string;
    avatar: string;
    quote: string;
    badge?: string;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <div className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] mx-2 sm:mx-3">
    <div className="glass-card p-4 sm:p-5 md:p-6 h-full relative">
      {testimonial.badge && (
        <div className="absolute -top-2 sm:-top-3 left-4 sm:left-6">
          <span className="btn-gradient px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-primary-foreground">
            {testimonial.badge}
          </span>
        </div>
      )}
      <div className="flex items-start gap-3 sm:gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-primary/30"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-semibold text-foreground text-sm sm:text-base truncate">
            {testimonial.name}
          </h4>
          <p className="text-xs sm:text-sm text-primary font-medium truncate">
            {testimonial.role}
          </p>
        </div>
      </div>
      <blockquote className="mt-3 sm:mt-4 text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3">
        "{testimonial.quote}"
      </blockquote>
    </div>
  </div>
);

export default TestimonialsSection;
