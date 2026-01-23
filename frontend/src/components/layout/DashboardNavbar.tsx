import { useNavigate } from 'react-router-dom';
import { User, LogOut, CreditCard, Activity, Gift, ArrowLeft, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { useAuth } from '@/context/AuthContext';
import { useUserStore } from '@/stores/userStore';
import CommissionImage from '@/assets/25-percent-commission.png';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from '@/components/ui/tooltip';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover';

interface DashboardNavbarProps {
    onMenuToggle: () => void; // Handler to open mobile menu
}

const DashboardNavbar = ({ onMenuToggle }: DashboardNavbarProps) => {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const credits = useUserStore((state) => state.credits);

    const getDisplayName = () => {
        return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
    };

    const getAvatarUrl = () => {
        return user?.user_metadata?.avatar_url;
    };

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <nav className="fixed top-0 left-0 lg:left-64 right-0 z-40 h-16 bg-background/80 backdrop-blur-sm border-b border-border/50">
            <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-3">
                {/* Left side - Hamburger and Back Button */}
                <div className="flex items-center gap-2">
                    {/* Hamburger Menu - Mobile Only */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden h-9 w-9"
                        onClick={onMenuToggle}
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    {/* Back Button */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 gap-1.5"
                                onClick={() => navigate(-1)}
                                aria-label="Go back"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span className="hidden sm:inline">Go back</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" sideOffset={8}>
                            Go back
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* Right side - Theme, Gift, Credits, Profile */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
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

                    {/* Gift Icon with Referral Popup */}
                    <Popover>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-9 w-9"
                                        aria-label="Gift and Earn"
                                    >
                                        <Gift className="h-[1.4rem] w-[1.4rem]" />
                                    </Button>
                                </PopoverTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={8}>
                                Gift and Earn
                            </TooltipContent>
                        </Tooltip>
                        <PopoverContent
                            className="w-80 p-0 overflow-hidden rounded-2xl border border-border/40 bg-card shadow-xl dark:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                            align="center"
                            sideOffset={12}
                        >
                            <img
                                src={CommissionImage}
                                alt="25% Commission"
                                className="w-full h-auto"
                            />
                            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    Refer friend & Earn rewards!
                                </h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Invite a friend and earn a <span className="font-semibold text-foreground">25% commission</span> on their first purchase!
                                </p>
                                <Button variant="gradient" className="w-full font-semibold py-5 rounded-xl">
                                    Refer and Earn
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Credits Display */}
                    {credits !== null && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border/50">
                            <Activity className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">
                                {credits} credits
                            </span>
                        </div>
                    )}

                    {/* User Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 p-0">
                                {getAvatarUrl() ? (
                                    <img
                                        src={getAvatarUrl()!}
                                        alt="User avatar"
                                        className="w-10 h-10 rounded-full border-2 border-border hover:border-primary transition-colors"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full btn-gradient flex items-center justify-center hover:opacity-90 transition-opacity">
                                        <User className="w-5 h-5 text-primary-foreground" />
                                    </div>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="px-2 py-2">
                                <p className="text-sm font-medium text-foreground">{getDisplayName()}</p>
                                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                                <User className="w-4 h-4 mr-2" />
                                My Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/billing')}>
                                <CreditCard className="w-4 h-4 mr-2" />
                                Billing & Subscription
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                variant="destructive"
                                className="cursor-pointer"
                                onClick={handleSignOut}
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
