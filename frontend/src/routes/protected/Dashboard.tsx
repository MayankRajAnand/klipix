import DashboardLayout from '@/components/layout/DashboardLayout';
import CreateHero from '@/components/DashboardComponents/CreateHero';
import PipelineStatus from '@/components/DashboardComponents/PipelineStatus';
import RecentProjects from '@/components/DashboardComponents/RecentProjects';
import { useAuth } from '@/context/AuthContext';
import { useUserCredits } from '@/hooks/useUserCredits';
import { PageLoader } from '@/components/common/Loader';

const Dashboard = () => {
    const { user } = useAuth();
    const { isLoading } = useUserCredits(user?.id);

    const getDisplayName = () => {
        const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there';
        return name.split(' ')[0];
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <PageLoader text="Loading..." />
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    Hey {getDisplayName()}, ready to go viral?
                </h1>
                <p className="text-muted-foreground mt-1">
                    Pick a format below and watch us create scroll-stopping content for you.
                </p>
            </div>

            {/* Create Cards - Main CTA */}
            <CreateHero />

            {/* Pipeline Status - Only show if there's activity */}
            <PipelineStatus stats={null} />

            {/* Recent Projects */}
            <RecentProjects />
        </DashboardLayout>
    );
};

export default Dashboard;
