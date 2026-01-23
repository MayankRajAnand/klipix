import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import DashboardSidebar, { SidebarContent } from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import KlipixLogo from '@/assets/Klipix.svg';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            {/* Desktop Sidebar - hidden on mobile */}
            <DashboardSidebar />

            {/* Mobile Sidebar - Sheet */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent side="left" className="p-0 w-64 flex flex-col">
                    {/* Header with Logo and Close Button */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
                        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                            <img src={KlipixLogo} alt="Klipix" className="w-9 h-9" />
                            <span className="font-bold text-xl text-foreground">
                                Klip<span className="gradient-text">ix</span>
                            </span>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full -mr-2"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close"
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                    {/* Navigation Content */}
                    <SidebarContent onNavigate={() => setMobileMenuOpen(false)} hideLogo={true} />
                </SheetContent>
            </Sheet>

            {/* Main Content Area */}
            <div className="lg:ml-64">
                {/* Top Navbar */}
                <DashboardNavbar onMenuToggle={() => setMobileMenuOpen(true)} />

                {/* Page Content */}
                <main className="pt-20 pb-8 px-4 sm:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
