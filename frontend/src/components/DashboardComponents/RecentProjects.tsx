import { useState } from 'react';
import { FolderOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Project {
    id: string;
    title: string;
    type: 'faceless' | 'series' | 'text-story';
    status: 'ready' | 'processing' | 'scheduled' | 'posted';
    thumbnail?: string;
    createdAt: string;
}

type StatusFilter = 'all' | 'ready' | 'scheduled' | 'processing';

// Mock data - will be replaced with real data
const mockProjects: Project[] = [];

const statusConfig = {
    posted: { label: 'Posted', class: 'bg-green-500/20 text-green-500' },
    processing: { label: 'Processing', class: 'bg-amber-500/20 text-amber-500' },
    scheduled: { label: 'Scheduled', class: 'bg-blue-500/20 text-blue-500' },
    ready: { label: 'Ready', class: 'bg-primary/20 text-primary' },
};

const typeConfig = {
    faceless: { label: 'Faceless', class: 'bg-purple-500/15 text-purple-400' },
    series: { label: 'Series', class: 'bg-blue-500/15 text-blue-400' },
    'text-story': { label: 'Text Story', class: 'bg-emerald-500/15 text-emerald-400' },
};

const statusTabs: { label: string; value: StatusFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Ready', value: 'ready' },
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'Processing', value: 'processing' },
];

const RecentProjects = () => {
    const [activeFilter, setActiveFilter] = useState<StatusFilter>('all');
    const navigate = useNavigate();

    const filteredProjects = activeFilter === 'all'
        ? mockProjects
        : mockProjects.filter(p => p.status === activeFilter);

    // Empty state
    if (mockProjects.length === 0) {
        return (
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Your Projects</h2>
                <div className="rounded-2xl border border-border/50 bg-card p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <FolderOpen className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No projects yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        Your created videos will appear here. Start by choosing a format above to create your first short-form video.
                    </p>
                    <Button
                        onClick={() => navigate('/create/faceless')}
                        className="btn-gradient text-primary-foreground"
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Create Your First Video
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Your Projects</h2>
            <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
                {/* Tabs */}
                <div className="flex gap-1 p-2 border-b border-border/50 bg-muted/30">
                    {statusTabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveFilter(tab.value)}
                            className={`
                                px-4 py-2 rounded-lg text-sm font-medium transition-all
                                ${activeFilter === tab.value
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover-standard'
                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Projects List */}
                <div className="divide-y divide-border/50">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                {/* Thumbnail */}
                                <div className="w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center overflow-hidden">
                                    {project.thumbnail ? (
                                        <img src={project.thumbnail} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <FolderOpen className="w-5 h-5 text-muted-foreground" />
                                    )}
                                </div>

                                {/* Info */}
                                <div>
                                    <p className="font-medium text-foreground">{project.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeConfig[project.type].class}`}>
                                            {typeConfig[project.type].label}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{project.createdAt}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig[project.status].class}`}>
                                {statusConfig[project.status].label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentProjects;
