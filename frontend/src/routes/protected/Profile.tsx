import DashboardLayout from '@/components/layout/DashboardLayout';
import { User } from 'lucide-react';

const Profile = () => {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                        My Profile
                    </h1>
                </div>
                <p className="text-muted-foreground mt-1">
                    Manage your account settings and preferences.
                </p>
            </div>

            {/* Content placeholder */}
            <div className="rounded-2xl border border-border/50 bg-card p-8 text-center">
                <p className="text-muted-foreground">
                    Profile settings coming soon...
                </p>
            </div>
        </DashboardLayout>
    );
};

export default Profile;
