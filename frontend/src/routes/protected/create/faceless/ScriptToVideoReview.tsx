import { useState } from 'react';
import { ArrowLeft, RefreshCw, Image as ImageIcon, ChevronRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';

// Mock data for the review screen
const MOCK_SCRIPT_SEGMENTS = [
    { id: 1, text: "It was a stormy night when Mia heard a soft whisper.", duration: "3s" },
    { id: 2, text: "Curiosity piqued, she stepped outside, her heart racing.", duration: "4s" },
    { id: 3, text: "The whisper grew louder, beckoning her deeper into the woods.", duration: "5s" },
    { id: 4, text: "Suddenly, she stumbled upon an ancient, crumbling shrine.", duration: "4s" },
    { id: 5, text: "A cold wind brushed past her, carrying a warning she couldn't ignore.", duration: "5s" },
    { id: 6, text: "She turned to run, but the path behind her had vanished.", duration: "3s" },
];

const MOCK_SCENES = [
    { id: 1, src: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&auto=format&fit=crop&q=60", alt: "Stormy night" },
    { id: 2, src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60", alt: "Girl looking curious" },
    { id: 3, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=60", alt: "Dark woods" },
    { id: 4, src: "https://images.unsplash.com/photo-1544084944-152696a63f72?w=800&auto=format&fit=crop&q=60", alt: "Ancient shrine" },
    { id: 5, src: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=800&auto=format&fit=crop&q=60", alt: "Wind blowing" },
    { id: 6, src: "https://images.unsplash.com/photo-1623348109619-75f8f94a24f0?w=800&auto=format&fit=crop&q=60", alt: "Vanishing path" },
];

const ScriptToVideoReview = () => {
    const navigate = useNavigate();
    const [hoveredScene, setHoveredScene] = useState<number | null>(null);

    return (
        <DashboardLayout>
            <div className="h-[calc(100vh-6rem)] flex flex-col">
                {/* Header Actions */}
                <div className="flex items-center justify-between mb-6 px-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Edit
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded border border-primary/20">Draft Saved</span>
                    </div>
                </div>

                <div className="flex-1 flex gap-6 min-h-0">
                    {/* Left: Script Timeline (60%) */}
                    <div className="w-[60%] flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-border/50 flex justify-between items-center bg-muted/20">
                            <h3 className="font-semibold flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                Script Timeline
                            </h3>
                            <span className="text-xs text-muted-foreground">Total Duration: ~24s</span>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                            <div className="space-y-4">
                                {MOCK_SCRIPT_SEGMENTS.map((segment) => (
                                    <div
                                        key={segment.id}
                                        className={`relative group p-4 rounded-xl border transition-all duration-200 ${hoveredScene === segment.id
                                                ? 'bg-primary/5 border-primary shadow-sm ring-1 ring-primary/20'
                                                : 'bg-background border-border hover:border-primary/30'
                                            }`}
                                        onMouseEnter={() => setHoveredScene(segment.id)}
                                        onMouseLeave={() => setHoveredScene(null)}
                                    >
                                        <div className="flex gap-4">
                                            <div className="flex flex-col items-center gap-1 pt-1">
                                                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                                                    {segment.id}
                                                </div>
                                                <div className="w-px h-full bg-border/50 my-1"></div>
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <textarea
                                                    className="w-full bg-transparent text-sm resize-none focus:outline-none focus:placeholder-transparent"
                                                    defaultValue={segment.text}
                                                    rows={2}
                                                />
                                                <div className="flex items-center justify-between pt-2">
                                                    <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground flex items-center gap-1">
                                                        <Play className="w-2 h-2" /> {segment.duration}
                                                    </span>
                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary" title="Regenerate Segment">
                                                            <RefreshCw className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm z-10">
                            <Button className="w-full btn-gradient font-bold h-11 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40">
                                Render Final Video <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </div>

                    {/* Right: Scene Gallery (40%) */}
                    <div className="w-[40%] flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-border/50 bg-muted/20">
                            <h3 className="font-semibold">Scene Gallery</h3>
                            <p className="text-xs text-muted-foreground mt-1">Hover over an image to modify or regenerate.</p>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-2 gap-3">
                                {MOCK_SCENES.map((scene) => (
                                    <div
                                        key={scene.id}
                                        className={`group relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${hoveredScene === scene.id ? 'ring-2 ring-primary scale-[1.02] shadow-xl z-10' : 'hover:ring-1 hover:ring-white/20'
                                            }`}
                                        onMouseEnter={() => setHoveredScene(scene.id)}
                                        onMouseLeave={() => setHoveredScene(null)}
                                    >
                                        <img
                                            src={scene.src}
                                            alt={scene.alt}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                            <Button size="sm" variant="secondary" className="h-8 text-xs backdrop-blur-md bg-white/10 hover:bg-white/20 border-white/10 text-white">
                                                <RefreshCw className="w-3 h-3 mr-1" /> Regenerate
                                            </Button>
                                        </div>
                                        <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur rounded text-[10px] text-white font-mono">
                                            #{scene.id}
                                        </div>
                                    </div>
                                ))}
                                {/* Add new scene placeholder */}
                                <div className="aspect-[9/16] rounded-lg border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                                    <ImageIcon className="w-6 h-6" />
                                    <span className="text-xs font-medium">Add Scene</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ScriptToVideoReview;
