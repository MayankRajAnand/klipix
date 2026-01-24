import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getThemes, getVoices, type StaticAsset } from '@/services/staticAssetsService';
import { BookOpen, Sparkles, Play, Pause, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const DURATIONS = [
    { id: 'short', label: 'Short (<30s)' },
    { id: 'standard', label: 'Standard (30s-60s)' },
    { id: 'long', label: 'Long (>60s)' },
];

const ScriptToVideo = () => {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [selectedNarrator, setSelectedNarrator] = useState('');
    const [selectedDuration, setSelectedDuration] = useState('standard');
    const [selectedStyle, setSelectedStyle] = useState('');

    const [narrators, setNarrators] = useState<StaticAsset[]>([]);
    const [styles, setStyles] = useState<StaticAsset[]>([]);

    // Search states
    const [narratorSearch, setNarratorSearch] = useState('');
    const [styleSearch, setStyleSearch] = useState('');

    // UI states
    const [isImagesOpen, setIsImagesOpen] = useState(true);
    const [isGameplayOpen, setIsGameplayOpen] = useState(false);
    const [isViralOpen, setIsViralOpen] = useState(false);

    // Audio Playback State
    const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const fetchAssets = async () => {
            const [themesData, voicesData] = await Promise.all([getThemes(), getVoices()]);
            setStyles(themesData);
            setNarrators(voicesData);
            if (themesData.length > 0) setSelectedStyle(themesData[0].key);
            if (voicesData.length > 0) setSelectedNarrator(voicesData[0].key);
            // Pre-warm audio? No, wait for click.
        };
        fetchAssets();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const handleGenerate = () => {
        // In real app, we would validate inputs here
        navigate('/create/faceless/script-to-video/review');
    };

    const handlePlayPreview = (e: React.MouseEvent, voice: StaticAsset) => {
        e.stopPropagation(); // Prevent row selection

        if (playingVoiceId === voice.key) {
            // Toggle pause
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
                setPlayingVoiceId(null);
            }
        } else {
            // Play new
            if (audioRef.current) {
                audioRef.current.pause();
            }

            // The DB now points to .mp3 files directly, so we can use the URL as is.
            const audioUrl = voice.publicUrl;

            if (audioUrl) {
                console.log("Attempting to play audio from:", audioUrl);

                const audio = new Audio(audioUrl);
                audio.onended = () => setPlayingVoiceId(null);
                audio.onerror = (err) => {
                    console.error("Audio playback error", err);
                    setPlayingVoiceId(null);
                }
                audio.play().catch(e => console.error("Play failed", e));
                audioRef.current = audio;
                setPlayingVoiceId(voice.key);
            }
        }
    };

    const filteredNarrators = narrators.filter(n =>
        n.label.toLowerCase().includes(narratorSearch.toLowerCase()) ||
        (n.description && n.description.toLowerCase().includes(narratorSearch.toLowerCase()))
    );

    const filteredStyles = styles.filter(s =>
        s.label.toLowerCase().includes(styleSearch.toLowerCase())
    );

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
                    {/* 1. Input Section */}
                    <Tabs defaultValue="prompt" className="w-full">
                        <TabsList className="w-full sm:w-auto grid grid-cols-2 mb-4 bg-muted/50">
                            <TabsTrigger value="prompt">Write Prompt</TabsTrigger>
                            <TabsTrigger value="script">Enter Script</TabsTrigger>
                        </TabsList>

                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                            <div className="relative bg-card border border-primary/20 rounded-2xl p-6 shadow-sm transition-all focus-within:border-primary/50 focus-within:shadow-md focus-within:shadow-primary/5">
                                <TabsContent value="prompt" className="mt-0">
                                    <textarea
                                        className="w-full bg-transparent border-none focus:ring-0 resize-none h-32 placeholder:text-muted-foreground/50 text-base p-1 leading-relaxed"
                                        placeholder="Describe the video you want to create... (e.g., A cyberpunk history of the internet in 45 seconds, dark aesthetic, fast paced)"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                    />
                                </TabsContent>
                                <TabsContent value="script" className="mt-0">
                                    <textarea
                                        className="w-full bg-transparent border-none focus:ring-0 resize-none h-32 placeholder:text-muted-foreground/50 text-base p-1 leading-relaxed"
                                        placeholder="Paste your script here... The AI will generate visuals to match your exact words."
                                    />
                                </TabsContent>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/40">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                                            <Sparkles className="w-3 h-3" /> AI Enhanced
                                        </span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">0/500</span>
                                </div>
                            </div>
                        </div>
                    </Tabs>

                    {/* 2. Duration Selection */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-base font-semibold">Duration</h3>
                            <div className="flex gap-2">
                                {DURATIONS.map((duration) => (
                                    <button
                                        key={duration.id}
                                        onClick={() => setSelectedDuration(duration.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${selectedDuration === duration.id
                                            ? 'bg-primary border-primary text-primary-foreground'
                                            : 'bg-card border-border/50 hover:bg-muted text-muted-foreground'
                                            }`}
                                    >
                                        {duration.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. Narrator Selection */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-base font-semibold">Select your narrator</h3>
                            <button className="text-xs text-muted-foreground hover:text-primary transition-colors">See all</button>
                        </div>

                        {/* Narrator Search */}
                        <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search narrator..."
                                className="pl-9 bg-card/50 border-border/50 h-9 text-sm"
                                value={narratorSearch}
                                onChange={(e) => setNarratorSearch(e.target.value)}
                            />
                        </div>

                        {/* Narrator List */}
                        <div className="max-h-64 overflow-y-auto custom-scrollbar space-y-2 pr-1">
                            {filteredNarrators.map((voice) => (
                                <div
                                    key={voice.key}
                                    onClick={() => setSelectedNarrator(voice.key)}
                                    className={`group flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${selectedNarrator === voice.key
                                        ? 'bg-primary/10 border-primary shadow-[0_0_10px_rgba(var(--primary),0.2)]'
                                        : 'bg-card border-border/50 hover:border-primary/30 hover:bg-muted/30'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={(e) => handlePlayPreview(e, voice)}
                                            className="w-8 h-8 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-sm"
                                        >
                                            {playingVoiceId === voice.key ? (
                                                <Pause className="w-3 h-3 fill-current" />
                                            ) : (
                                                <Play className="w-3 h-3 fill-current ml-0.5" />
                                            )}
                                        </button>
                                        <div>
                                            <div className="font-semibold text-sm flex items-center gap-2">
                                                {voice.label}
                                                {voice.description && (
                                                    <span className="text-xs font-normal text-muted-foreground"> • {voice.description}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${selectedNarrator === voice.key
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-secondary text-muted-foreground border-border'
                                        }`}>
                                        Narration
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. Choose Video Source (Art Direction) */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-base font-semibold">Choose video source</h3>
                        </div>

                        <div className="space-y-4">
                            {/* AI Generated Images Card */}
                            <div className="border border-border/50 rounded-2xl bg-card overflow-hidden transition-all hover:border-primary/20 hover:shadow-sm">
                                <div
                                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                                    onClick={() => setIsImagesOpen(!isImagesOpen)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Sparkles className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm">AI Generated Images</h4>
                                            <p className="text-xs text-muted-foreground">Images will be from an AI Generated Image library</p>
                                        </div>
                                    </div>
                                    <div
                                        className="transition-transform duration-300 ease-in-out"
                                        style={{ transform: isImagesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                    >
                                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                </div>

                                <div
                                    className="overflow-hidden transition-all duration-300 ease-in-out"
                                    style={{
                                        maxHeight: isImagesOpen ? '600px' : '0px',
                                        opacity: isImagesOpen ? 1 : 0
                                    }}
                                >
                                    <div className="p-4 border-t border-border/50 bg-muted/5">
                                        {/* Style Search */}
                                        <div className="relative mb-4">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Search art style..."
                                                className="pl-9 bg-background border-border/50 h-9 text-sm"
                                                value={styleSearch}
                                                onChange={(e) => setStyleSearch(e.target.value)}
                                            />
                                        </div>

                                        {/* Style Grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto custom-scrollbar pr-1">
                                            {filteredStyles.map((style) => (
                                                <div
                                                    key={style.key}
                                                    onClick={() => setSelectedStyle(style.key)}
                                                    className={`group relative aspect-video rounded-lg cursor-pointer overflow-hidden border-2 transition-all ${selectedStyle === style.key
                                                        ? 'border-primary shadow-lg shadow-primary/20 ring-1 ring-primary'
                                                        : 'border-transparent hover:border-primary/50'
                                                        }`}
                                                >
                                                    <img
                                                        src={style.publicUrl}
                                                        alt={style.label}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>

                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-[10px] font-bold text-white tracking-wider text-center px-1 uppercase drop-shadow-md">
                                                            {style.label}
                                                        </span>
                                                    </div>

                                                    {selectedStyle === style.key && (
                                                        <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-0.5">
                                                            <Sparkles className="w-2 h-2" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Gameplay Videos Card */}
                            <div className="border border-border/50 rounded-2xl bg-card overflow-hidden transition-all hover:border-primary/20 hover:shadow-sm">
                                <div
                                    className="p-4 flex items-center justify-between hover:bg-muted/30 cursor-pointer transition-colors"
                                    onClick={() => setIsGameplayOpen(!isGameplayOpen)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                            <Play className="w-4 h-4 text-orange-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm">Gameplay Videos</h4>
                                            <p className="text-xs text-muted-foreground">Images will be from a Gameplay Video library</p>
                                        </div>
                                    </div>
                                    <div
                                        className="transition-transform duration-300 ease-in-out"
                                        style={{ transform: isGameplayOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                    >
                                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                </div>

                                <div
                                    className="overflow-hidden transition-all duration-300 ease-in-out"
                                    style={{
                                        maxHeight: isGameplayOpen ? '400px' : '0px',
                                        opacity: isGameplayOpen ? 1 : 0
                                    }}
                                >
                                    <div className="p-4 border-t border-border/50 bg-muted/5">
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Minecraft', 'GTA V', 'Subway Surfers', 'Temple Run'].map((game) => (
                                                <div key={game} className="bg-card border border-border/50 rounded-lg p-4 hover:border-orange-500/50 transition-all cursor-pointer group">
                                                    <div className="aspect-video bg-muted rounded-md mb-2 group-hover:scale-105 transition-transform duration-300"></div>
                                                    <p className="text-sm font-medium">{game}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Viral Videos Card */}
                            <div className="border border-border/50 rounded-2xl bg-card overflow-hidden transition-all hover:border-primary/20 hover:shadow-sm">
                                <div
                                    className="p-4 flex items-center justify-between hover:bg-muted/30 cursor-pointer transition-colors"
                                    onClick={() => setIsViralOpen(!isViralOpen)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                            <Play className="w-4 h-4 text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm">Viral Videos</h4>
                                            <p className="text-xs text-muted-foreground">Eye catching/satisfying background videos</p>
                                        </div>
                                    </div>
                                    <div
                                        className="transition-transform duration-300 ease-in-out"
                                        style={{ transform: isViralOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                    >
                                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                </div>

                                <div
                                    className="overflow-hidden transition-all duration-300 ease-in-out"
                                    style={{
                                        maxHeight: isViralOpen ? '400px' : '0px',
                                        opacity: isViralOpen ? 1 : 0
                                    }}
                                >
                                    <div className="p-4 border-t border-border/50 bg-muted/5">
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Satisfying', 'Slime', 'ASMR', 'Nature'].map((type) => (
                                                <div key={type} className="bg-card border border-border/50 rounded-lg p-4 hover:border-blue-500/50 transition-all cursor-pointer group">
                                                    <div className="aspect-video bg-muted rounded-md mb-2 group-hover:scale-105 transition-transform duration-300"></div>
                                                    <p className="text-sm font-medium">{type}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Generate Button */}
                    <div className="sticky bottom-4 z-10 pt-4">
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
