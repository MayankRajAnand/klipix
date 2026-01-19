import { Loader2, CheckCircle2, Clock } from 'lucide-react';

interface FunnelStats {
    generating: number;
    awaitingReview: number;
    scheduled: number;
}

interface PipelineStatusProps {
    stats?: FunnelStats | null;
}

const PipelineStatus = ({ stats = null }: PipelineStatusProps) => {
    const hasAnyActivity = stats && (stats.generating > 0 || stats.awaitingReview > 0 || stats.scheduled > 0);

    // Don't render anything if there's no activity
    if (!hasAnyActivity) {
        return null;
    }

    const funnelItems = [
        {
            label: 'Generating',
            count: stats?.generating || 0,
            icon: Loader2,
            iconClass: 'text-amber-500 animate-spin',
            bgClass: 'bg-amber-500/10',
            borderClass: 'border-amber-500/20',
        },
        {
            label: 'Ready for Review',
            count: stats?.awaitingReview || 0,
            icon: CheckCircle2,
            iconClass: 'text-blue-500',
            bgClass: 'bg-blue-500/10',
            borderClass: 'border-blue-500/20',
        },
        {
            label: 'Scheduled',
            count: stats?.scheduled || 0,
            icon: Clock,
            iconClass: 'text-green-500',
            bgClass: 'bg-green-500/10',
            borderClass: 'border-green-500/20',
        }
    ].filter(item => item.count > 0);

    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">In Progress</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {funnelItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.label}
                            className={`flex items-center gap-4 p-4 rounded-xl border ${item.borderClass} ${item.bgClass} hover:opacity-80 transition-opacity cursor-pointer text-left`}
                            onClick={() => console.log(`Navigate to ${item.label} projects`)}
                        >
                            <div className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center">
                                <Icon className={`w-5 h-5 ${item.iconClass}`} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{item.count}</p>
                                <p className="text-sm text-muted-foreground">{item.label}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PipelineStatus;
