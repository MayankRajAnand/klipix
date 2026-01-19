import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <div className="ml-64">
                {/* Top Navbar */}
                <DashboardNavbar />

                {/* Page Content */}
                <main className="pt-20 pb-8 px-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
