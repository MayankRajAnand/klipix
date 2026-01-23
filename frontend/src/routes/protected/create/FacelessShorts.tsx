import DashboardLayout from '@/components/layout/DashboardLayout';
import { BookOpen, Scissors, MessageSquare, PlayCircle, ArrowRight, Upload, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const FacelessShorts = () => {
    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            AI CREATION SUITE
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
                            Choose Your Workflow
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            Select a generative mode to start creating faceless content.
                            Automate the boring stuff, focus on the strategy.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                        <PlayCircle className="w-4 h-4" />
                        Watch Tutorial
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Script to Video */}
                    <Link
                        to="/create/faceless/script-to-video"
                        className="group relative glass-card p-8 rounded-3xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <BookOpen className="w-7 h-7 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>

                        <h3 className="text-xl font-bold mb-3 text-foreground">Script to Video</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 h-20">
                            Turn any text prompt or article into viral AI narrated reels. Auto-selects stock footage and generates voiceovers.
                        </p>

                        <div className="w-full py-3 rounded-xl bg-secondary/50 border border-white/5 text-center text-sm font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2">
                            Start Creation <ArrowRight className="w-4 h-4" />
                        </div>
                    </Link>

                    {/* Card 2: Split Video */}
                    <Link
                        to="/create/faceless/split-video"
                        className="group relative glass-card p-8 rounded-3xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Scissors className="w-7 h-7 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>

                        <h3 className="text-xl font-bold mb-3 text-foreground">Split Video</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 h-20">
                            Repurpose long-form YouTube videos into vertical shorts. AI detects the most engaging clips automatically.
                        </p>

                        <div className="w-full py-3 rounded-xl bg-secondary/50 border border-white/5 text-center text-sm font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2">
                            Upload Video <Upload className="w-4 h-4" />
                        </div>
                    </Link>

                    {/* Card 3: Fake Text Story */}
                    <Link
                        to="/create/faceless/fake-text"
                        className="group relative glass-card p-8 rounded-3xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                    >
                        <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider">
                            New
                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <MessageSquare className="w-7 h-7 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>

                        <h3 className="text-xl font-bold mb-3 text-foreground">Fake Text Story</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 h-20">
                            Generate viral chat message conversations instantly. Create drama, horror, or comedy threads in seconds.
                        </p>

                        <div className="w-full py-3 rounded-xl bg-secondary/50 border border-white/5 text-center text-sm font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2">
                            Create Story <Sparkles className="w-4 h-4" />
                        </div>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FacelessShorts;
