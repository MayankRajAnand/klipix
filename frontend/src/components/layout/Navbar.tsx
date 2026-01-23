import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { useAuth } from "@/context/AuthContext";
import KlipixLogo from "@/assets/Klipix.svg";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";

const NAV_LINKS = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src={KlipixLogo} alt="Klipix" className="w-10 h-10" />
                        <span className="font-bold text-xl text-foreground">
                            Klip<span className="gradient-text">ix</span>
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-2">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-muted-foreground hover:text-foreground hover:bg-hover-highlight transition-colors duration-200 text-sm font-medium px-3 py-2 rounded-md"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <ThemeToggle />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={8}>
                                Toggle theme
                            </TooltipContent>
                        </Tooltip>
                        {loading ? (
                            <div className="w-20 h-9 bg-muted rounded-md animate-pulse" />
                        ) : user ? (
                            <Button variant="gradient" size="sm" onClick={() => navigate('/dashboard')}>
                                Dashboard
                            </Button>
                        ) : (
                            <>
                                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                                    Log in
                                </Button>
                                <Button variant="gradient" size="sm" onClick={() => navigate('/signup')}>
                                    Try for Free
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <ThemeToggle />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={8}>
                                Toggle theme
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(!isOpen)}
                                    aria-label="Toggle menu"
                                >
                                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={8}>
                                {isOpen ? "Close menu" : "Menu"}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden border-t border-border/50">
                        <div className="py-4 space-y-2">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="block text-muted-foreground hover:text-foreground hover:bg-hover-highlight transition-colors duration-200 text-sm font-medium px-3 py-2 rounded-md"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="flex flex-col gap-2 pt-2">
                                {loading ? (
                                    <div className="w-full h-10 bg-muted rounded-md animate-pulse" />
                                ) : user ? (
                                    <Button
                                        variant="gradient"
                                        onClick={() => {
                                            setIsOpen(false);
                                            navigate('/dashboard');
                                        }}
                                    >
                                        Dashboard
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant="ghost"
                                            onClick={() => {
                                                setIsOpen(false);
                                                navigate('/login');
                                            }}
                                        >
                                            Log in
                                        </Button>
                                        <Button
                                            variant="gradient"
                                            onClick={() => {
                                                setIsOpen(false);
                                                navigate('/signup');
                                            }}
                                        >
                                            Try for Free
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
