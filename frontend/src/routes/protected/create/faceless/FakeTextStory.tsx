import DashboardLayout from '@/components/layout/DashboardLayout';
import { MessageSquare } from 'lucide-react';

const FakeTextStory = () => {
    return (
        <DashboardLayout>
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">
                    Fake Text Story
                </h1>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card p-12 text-center">
                <p className="text-muted-foreground">
                    Fake Text Story workflow coming soon...
                </p>
            </div>
        </DashboardLayout>
    );
};

export default FakeTextStory;
