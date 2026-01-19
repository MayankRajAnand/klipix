import { useNavigate } from 'react-router-dom';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';

interface CreateCardProps {
    icon: React.ElementType;
    title: string;
    tagline: string;
    bullets: string[];
    href: string;
    badge?: string;
    gradient: string;
}

const CreateCard = ({ icon: Icon, title, tagline, bullets, href, badge, gradient }: CreateCardProps) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(href)}
            className="group relative flex flex-col h-full p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/50 transition-all duration-300 text-left overflow-hidden"
        >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${gradient}`} />

            {/* Badge */}
            {badge && (
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500 z-10">
                    {badge}
                </span>
            )}

            {/* Content */}
            <div className="relative z-10 flex-1">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{tagline}</p>

                {/* Bullets */}
                <ul className="space-y-2.5">
                    {bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer */}
            <div className="relative z-10 pt-4 mt-6 border-t border-border/50 flex items-center justify-end">
                <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Start creating <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </button>
    );
};

const createOptions: Omit<CreateCardProps, 'gradient'>[] = [
    {
        icon: Sparkles,
        title: 'Faceless Shorts',
        tagline: 'AI-powered videos that go viral without showing your face',
        bullets: [
            'Generate scripts with AI or write your own',
            'Choose visual styles: Anime, Gameplay, Satisfying videos, Fake texts',
            'Customize captions, voice, and effects',
        ],
        href: '/create/faceless',
    },
    {
        icon: Layers,
        title: 'Series Shorts',
        tagline: 'Build a loyal audience with episodic content',
        bullets: [
            'Consistent characters and story continuity',
            'Auto-scheduled releases (daily, weekly)',
            'Episode management and tracking',
        ],
        href: '/create/series',
    },
];

const gradients = [
    'bg-gradient-to-br from-purple-500/5 to-pink-500/5',
    'bg-gradient-to-br from-blue-500/5 to-cyan-500/5',
];

const CreateHero = () => {
    return (
        <div className="mb-8">
            {/* Section Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                    Transform your ideas into viral shorts
                </h2>
                <p className="text-muted-foreground">
                    We handle the heavy lifting—script generation, voiceovers, visuals, and effects. You just bring the idea.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {createOptions.map((option, index) => (
                    <CreateCard
                        key={option.title}
                        {...option}
                        gradient={gradients[index % gradients.length]}
                    />
                ))}
            </div>
        </div>
    );
};

export default CreateHero;
