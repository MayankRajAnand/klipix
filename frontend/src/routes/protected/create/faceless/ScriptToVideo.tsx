import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { BookOpen, Sparkles, Play, Mic, Clock, Palette, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const NARRATORS = [
    { id: 'adam', name: 'Adam', gender: 'Male', description: 'Deep, Authoritative' },
    { id: 'bella', name: 'Bella', gender: 'Female', description: 'Energetic, Viral' },
    { id: 'clyde', name: 'Clyde', gender: 'Male', description: 'Narrative, Story' },
];

const DURATIONS = [
    { id: 'short', label: 'Short (<30s)' },
    { id: 'standard', label: 'Standard (30s-60s)' },
    { id: 'long', label: 'Long (>60s)' },
];

const ART_STYLES = [
    { id: 'cyberpunk', label: 'Cyberpunk', color: 'from-pink-500 to-violet-600' },
    { id: 'realistic', label: 'Realistic', color: 'from-amber-200 to-yellow-500' },
    { id: 'anime', label: 'Anime', color: 'from-blue-400 to-emerald-400' },
    { id: '3d-render', label: '3D Render', color: 'from-orange-400 to-rose-400' },
];

const ScriptToVideo = () => {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [selectedNarrator, setSelectedNarrator] = useState('adam');
    const [selectedDuration, setSelectedDuration] = useState('standard');
    const [selectedStyle, setSelectedStyle] = useState('cyberpunk');

    const handleGenerate = () => {
        // In real app, we would validate inputs here
        navigate('/create/faceless/script-to-video/review');
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto pb-20">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Script to Video</h1>
                        <p className="text-muted-foreground text-sm">Turn your ideas into viral shorts instantly.</p>
                    </div>
                </div>

                <div className="space-y-8 animate-fade-in">
                    {/* Input Section */}
                    <Tabs defaultValue="prompt" className="w-full">
                        <TabsList className="w-full sm:w-auto grid grid-cols-2 mb-4 bg-muted/50">
                            <TabsTrigger value="prompt">Write Prompt</TabsTrigger>
                            <TabsTrigger value="script">Enter Script</TabsTrigger>
                        </TabsList>

                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                            <div className="relative bg-card border border-border/50 rounded-2xl p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Script Prompt</span>
                                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                                        <Sparkles className="w-3 h-3" /> AI Enhanced
                                    </span>
                                </div>
                                <TabsContent value="prompt" className="mt-0">
                                    <textarea
                                        className="w-full bg-transparent border-none focus:ring-0 resize-none h-32 placeholder:text-muted-foreground/50 text-base"
                                        placeholder="Describe the video you want to create... (e.g., A cyberpunk history of the internet in 45 seconds, dark aesthetic, fast paced)"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                    />
                                </TabsContent>
                                <TabsContent value="script" className="mt-0">
                                    <textarea
                                        className="w-full bg-transparent border-none focus:ring-0 resize-none h-32 placeholder:text-muted-foreground/50 text-base"
                                        placeholder="Paste your script here... The AI will generate visuals to match your exact words."
                                    />
                                </TabsContent>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/50">
                                    <button className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                                        <Wand2 className="w-3 h-3" /> Improve Prompt
                                    </button>
                                    <span className="text-xs text-muted-foreground">0/500</span>
                                </div>
                            </div>
                        </div>
                    </Tabs>

                    {/* Narrator Selection */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Mic className="w-4 h-4 text-primary" /> Narrator
                            </h3>
                            <button className="text-xs text-primary hover:underline">View all voices</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {NARRATORS.map((voice) => (
                                <div
                                    key={voice.id}
                                    onClick={() => setSelectedNarrator(voice.id)}
                                    className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 ${selectedNarrator === voice.id
                                            ? 'bg-primary/5 border-primary ring-1 ring-primary'
                                            : 'bg-card border-border/50 hover:border-primary/50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 text-xs font-bold text-white border border-white/10">
                                                {voice.name[0]}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-sm flex items-center gap-1">
                                                    {voice.name}
                                                    {selectedNarrator === voice.id && <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>}
                                                </div>
                                                <div className="text-[10px] text-muted-foreground">{voice.description}</div>
                                            </div>
                                        </div>
                                        <button className="w-6 h-6 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                                            <Play className="w-3 h-3 fill-current" />
                                        </button>
                                    </div>
                                    {selectedNarrator === voice.id && (
                                        <div className="w-full h-1 bg-primary/20 rounded-full mt-2 overflow-hidden">
                                            <div className="h-full bg-primary w-1/2 animate-pulse"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Duration Selection */}
                    <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                            <Clock className="w-4 h-4 text-primary" /> Target Duration
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {DURATIONS.map((duration) => (
                                <button
                                    key={duration.id}
                                    onClick={() => setSelectedDuration(duration.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${selectedDuration === duration.id
                                            ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20'
                                            : 'bg-card border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {duration.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Art Direction Selection */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Palette className="w-4 h-4 text-primary" /> Art Direction
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {ART_STYLES.map((style) => (
                                <div
                                    key={style.id}
                                    onClick={() => setSelectedStyle(style.id)}
                                    className={`group relative aspect-video rounded-xl cursor-pointer overflow-hidden border-2 transition-all duration-200 ${selectedStyle === style.id
                                            ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                                            : 'border-transparent hover:border-primary/50'
                                        }`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>

                                    <div className="absolute bottom-2 left-2 font-bold text-white text-sm drop-shadow-md">
                                        {style.label}
                                    </div>

                                    {selectedStyle === style.id && (
                                        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                                            <Sparkles className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Generate Button */}
                    <div className="pt-4">
                        <Button
                            onClick={handleGenerate}
                            className="w-full h-12 text-lg font-bold btn-gradient shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                        >
                            <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                            GENERATE VIDEO
                            <span className="ml-2 text-xs bg-black/20 px-2 py-0.5 rounded text-white/80 font-medium">5 Credits</span>
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ScriptToVideo;
