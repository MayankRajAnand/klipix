import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Gaming YouTuber",
    avatar: "🎮",
    quote:
      "KlipIx saved me 10+ hours a week. My Shorts views went from 1K to 50K average!",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Podcast Host",
    avatar: "🎙️",
    quote:
      "I turn my 2-hour podcasts into 15 viral clips automatically. Game changer for content repurposing.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Education Creator",
    avatar: "📚",
    quote:
      "The AI captions are incredibly accurate. My students love the short-form content for revision.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Social Media Manager",
    avatar: "📱",
    quote:
      "Managing 5 clients became so much easier. KlipIx does in minutes what took me hours.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Fitness Coach",
    avatar: "💪",
    quote:
      "My workout tutorials now get 10x more engagement on Reels. The platform formatting is perfect.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Travel Vlogger",
    avatar: "✈️",
    quote:
      "I capture hours of footage traveling. KlipIx finds the best moments I would have missed.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-fade" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[150px]" />

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
            Loved by <span className="gradient-text">10,000+ Creators</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See why content creators around the world trust KlipIx.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
