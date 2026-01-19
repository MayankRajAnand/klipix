import DashboardLayout from '@/components/layout/DashboardLayout';
import { Share2 } from 'lucide-react';

const SocialAccounts = () => {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Share2 className="w-5 h-5 text-primary" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                        Social Accounts
                    </h1>
                </div>
                <p className="text-muted-foreground mt-1">
                    Connect and manage your social media accounts.
                </p>
            </div>

            {/* Content placeholder */}
            <div className="rounded-2xl border border-border/50 bg-card p-8 text-center">
                <p className="text-muted-foreground">
                    Social accounts management coming soon...
                </p>
            </div>
        </DashboardLayout>
    );
};

export default SocialAccounts;
