import { useState, useEffect } from "react";
import { Play, ArrowRight, Sparkles, Flame, Film, Check } from "lucide-react";
import { FaYoutube, FaTiktok, FaInstagram, FaXTwitter } from "react-icons/fa6";
import heroSection from "@/assets/hero-section.png";
import { Button } from "@/components/ui/button";

const TAGLINES = [
    "Create Viral Shorts from Long Videos",
    "Generate AI-Powered Faceless Videos",
    "Auto-Create Scroll-Stopping Clips",
    "Transform Podcasts into Viral Reels",
    "Generate Viral Scripts in Seconds",
];

const PLATFORMS = [
    { name: "YouTube", Icon: FaYoutube, color: "#FF0000" },
    { name: "TikTok", Icon: FaTiktok, color: "#000000" },
    { name: "Instagram", Icon: FaInstagram, color: "#E4405F" },
    { name: "Twitter", Icon: FaXTwitter, color: "#000000" },
];

export function HeroSection() {
    const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
                setIsVisible(true);
            }, 700);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[150px] animate-pulse-slow [animation-delay:1.5s]" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none hero-grid" />

            <div className="container relative z-10 px-4 py-16 md:py-24">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm text-muted-foreground">
                            Used by 10,000+ creators worldwide
                        </span>
                    </div>

                    {/* Headline with Rotating Taglines */}
                    <div className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight min-h-[2.4em] md:min-h-[2.4em] flex items-center justify-center">
                        <span
                            className="gradient-text block transition-all duration-700 ease-out"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
                            }}
                        >
                            {TAGLINES[currentTaglineIndex]}
                        </span>
                    </div>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in [animation-delay:0.2s] pt-2">
                        Create viral shorts from long videos, generate faceless AI content,
                        transform podcasts into reels, and auto-generate scroll-stopping clips—all
                        powered by AI that writes scripts and adds captions for you.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in [animation-delay:0.3s]">
                        <Button
                            variant="gradient"
                            size="xl"
                            className="w-full sm:w-auto gap-2"
                        >
                            Try for Free
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="gradient-outline"
                            size="xl"
                            className="w-full sm:w-auto gap-2"
                        >
                            <Play className="w-5 h-5" />
                            Watch Demo
                        </Button>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in [animation-delay:0.4s]">
                        <span className="text-sm text-muted-foreground">Works with:</span>
                        {PLATFORMS.map((platform) => {
                            const { Icon } = platform;
                            return (
                                <div
                                    key={platform.name}
                                    className="flex items-center gap-2 group"
                                >
                                    <Icon
                                        className="w-5 h-5 transition-colors dark:text-muted-foreground"
                                        style={{ color: `light-dark(${platform.color}, hsl(var(--muted-foreground)))` }}
                                    />
                                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                        {platform.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Hero Visual */}
                    <div className="mt-16 relative animate-fade-in [animation-delay:0.5s]">
                        <div className="glass-card p-2 rounded-2xl glow-effect">
                            <img
                                src={heroSection}
                                alt="Klipix AI Video Editor Interface"
                                className="w-full rounded-xl"
                            />
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-8 -left-8 glass-card p-4 rounded-xl hidden lg:flex items-center gap-3 animate-float">
                            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-semibold text-foreground">
                                    Auto Captions
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Added successfully
                                </p>
                            </div>
                        </div>

                        {/* Top Right - AI Script */}
                        <div className="absolute -top-8 -right-8 glass-card p-4 rounded-xl hidden lg:flex items-center gap-3 animate-float [animation-delay:0.5s]">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-semibold text-foreground">
                                    Personalised Hooking Script
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Generated in 2s
                                </p>
                            </div>
                        </div>

                        {/* Bottom Left - Viral Moments */}
                        <div className="absolute -bottom-6 -left-8 glass-card p-4 rounded-xl hidden lg:flex items-center gap-3 animate-float [animation-delay:1.5s]">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                                <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-semibold text-foreground">
                                    Viral Moments
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    8 clips detected
                                </p>
                            </div>
                        </div>

                        {/* Bottom Right - 12 Clips Created */}
                        <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-xl hidden lg:flex items-center gap-3 animate-float [animation-delay:1s]">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                <Film className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-semibold text-foreground">
                                    12 Clips Created
                                </p>
                                <p className="text-xs text-muted-foreground">Ready to export</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
