import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Get visible testimonials (3 at a time on desktop, 1 on mobile)
  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      items.push({ ...testimonials[index], originalIndex: index });
    }
    return items;
  };

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

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="glass"
            size="icon"
            onClick={() => {
              prevSlide();
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 5000);
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="glass"
            size="icon"
            onClick={() => {
              nextSlide();
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 5000);
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Testimonials Carousel */}
          <div className="overflow-hidden px-4">
            <motion.div
              className="flex gap-6"
              initial={false}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Mobile: Single Card */}
              <div className="md:hidden w-full">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                      {testimonials[currentIndex].avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Desktop: Three Cards */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 w-full">
                {getVisibleTestimonials().map((testimonial, idx) => (
                  <motion.div
                    key={`${testimonial.originalIndex}-${currentIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-500 text-yellow-500"
                        />
                      ))}
                    </div>
                    <p className="text-foreground mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
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
            </motion.div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
