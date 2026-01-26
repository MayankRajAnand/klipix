import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { canAccessPlan, type StaticAsset } from '@/services/staticAssetsService';
import { useStaticAssets } from '@/hooks/useStaticAssets';
import { useAudioCache } from '@/hooks/useAudioCache';
import { PageLoader } from '@/components/common/Loader';
import { BookOpen, Sparkles, Play, Pause, Search, ChevronDown, Filter, Lock, Crown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { InputType, FormPayload, ValidationErrors, GenderFilter } from '@/types/createVideo';
import { DURATIONS, GENDER_OPTIONS } from '@/constants/createVideo';
import { VideoSourceCard } from '@/components/create/VideoSourceCard';
import { getPlanBadge } from '@/lib/utils';

// ============================================================================
// COMPONENT
// ============================================================================

const ScriptToVideo = () => {
    const navigate = useNavigate();

    // Data from API with loading state
    const { themes, voices: narrators, topics, userProfile, isLoading } = useStaticAssets();

    // Form State
    const [form, setForm] = useState<FormPayload>({
        inputType: 'topic',
        content: '',
        duration: 'standard',
        narrator: '',
        videoSource: { type: 'ai-generated' },
    });

    // Validation
    const [errors, setErrors] = useState<ValidationErrors>({
        content: false,
        narrator: false,
        videoSource: false,
    });
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

    // UI State
    const [narratorSearch, setNarratorSearch] = useState('');
    const [themeSearch, setThemeSearch] = useState('');
    const [genderFilter, setGenderFilter] = useState<GenderFilter>('all');

    // Audio cache for preloading and caching voice previews
    const { preload, play, stop, isLoading: isAudioLoading, currentlyPlaying } = useAudioCache();

    const userPlan = userProfile?.plan || 'free';

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            stop();
        };
    }, [stop]);

    // Refs for scrolling
    const inputSectionRef = useRef<HTMLElement>(null);
    const narratorSectionRef = useRef<HTMLElement>(null);
    const videoSourceSectionRef = useRef<HTMLElement>(null);

    // ========================================================================
    // FORM HELPERS
    // ========================================================================

    const updateForm = <K extends keyof FormPayload>(key: K, value: FormPayload[K]) => {
        setForm(prev => ({ ...prev, [key]: value }));
        if (hasAttemptedSubmit) {
            setErrors(prev => ({ ...prev, [key === 'content' ? 'content' : key === 'narrator' ? 'narrator' : 'videoSource']: false }));
        }
    };

    const updateVideoSource = (updates: Partial<FormPayload['videoSource']>) => {
        setForm(prev => ({
            ...prev,
            videoSource: { ...prev.videoSource, ...updates },
        }));
        if (hasAttemptedSubmit) {
            setErrors(prev => ({ ...prev, videoSource: false }));
        }
    };

    const handleInputTypeChange = (type: InputType) => {
        setForm(prev => ({ ...prev, inputType: type, content: '' }));
    };

    // ========================================================================
    // VALIDATION
    // ========================================================================

    const validate = (): boolean => {
        const newErrors: ValidationErrors = {
            content: !form.content.trim(),
            narrator: !form.narrator,
            videoSource: form.videoSource.type === 'ai-generated' && !form.videoSource.style,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    const handleGenerate = () => {
        setHasAttemptedSubmit(true);
        if (validate()) {
            console.log('Form Payload:', form);
            navigate('/create/faceless/script-to-video/review');
        } else {
            // Scroll to the first error
            if (!form.content.trim()) {
                inputSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (!form.narrator) {
                narratorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (form.videoSource.type === 'ai-generated' && !form.videoSource.style) {
                videoSourceSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    // ========================================================================
    // AUDIO PREVIEW
    // ========================================================================

    const handlePlayPreview = (e: React.MouseEvent, voice: StaticAsset) => {
        e.stopPropagation();
        if (voice.publicUrl) {
            play(voice.publicUrl);
        }
    };

    const handleVoiceHover = (voice: StaticAsset) => {
        if (voice.publicUrl) {
            preload(voice.publicUrl);
        }
    };

    // ========================================================================
    // FILTERS
    // ========================================================================

    const filteredNarrators = narrators.filter(n => {
        const matchesSearch = n.label.toLowerCase().includes(narratorSearch.toLowerCase()) ||
            n.description?.toLowerCase().includes(narratorSearch.toLowerCase());
        const matchesGender = genderFilter === 'all' || n.gender === genderFilter;
        return matchesSearch && matchesGender;
    });

    const filteredThemes = themes.filter(t =>
        t.label.toLowerCase().includes(themeSearch.toLowerCase())
    );

    // ========================================================================
    // HELPERS
    // ========================================================================

    const isLocked = (plan?: 'free' | 'pro' | 'premium') =>
        !canAccessPlan(userPlan, plan || 'free');

    // ========================================================================
    // RENDER
    // ========================================================================

    if (isLoading) {
        return (
            <DashboardLayout>
                <PageLoader text="Loading..." />
            </DashboardLayout>
        );
    }

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

                <div className="space-y-8">
                    {/* ================================================================
                        1. INPUT SECTION (Topic / Prompt / Script)
                    ================================================================ */}
                    <section ref={inputSectionRef}>
                        <Tabs value={form.inputType} onValueChange={(v) => handleInputTypeChange(v as InputType)} className="w-full">
                            <TabsList className="w-full sm:w-auto grid grid-cols-3 mb-4 bg-muted/50">
                                <TabsTrigger value="topic">Choose Topic</TabsTrigger>
                                <TabsTrigger value="prompt">Write Prompt</TabsTrigger>
                                <TabsTrigger value="script">Enter Script</TabsTrigger>
                            </TabsList>

                            <div className="relative group rounded-2xl">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                                <div className="relative bg-card border border-primary/20 rounded-2xl p-6 shadow-sm">
                                    {/* Topic Selection */}
                                    <TabsContent value="topic" className="mt-0">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto pr-1">
                                            {topics.map((topic) => {
                                                const locked = isLocked(topic.required_plan);
                                                const badge = getPlanBadge(topic.required_plan);
                                                const isSelected = form.content === topic.key;

                                                return (
                                                    <div
                                                        key={topic.key}
                                                        onClick={() => !locked && updateForm('content', topic.key)}
                                                        className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${locked
                                                            ? 'bg-card/40 border-border/30 cursor-not-allowed opacity-50'
                                                            : isSelected
                                                                ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10'
                                                                : 'bg-card border-border/50 hover:border-primary/40 hover:bg-muted/30'
                                                            }`}
                                                    >
                                                        {badge && (
                                                            <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                                                                <Crown className="w-2.5 h-2.5 text-amber-500" />
                                                                <span className="text-[8px] font-bold text-amber-500">{badge}</span>
                                                            </div>
                                                        )}
                                                        <p className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                                            {topic.label}
                                                        </p>
                                                        {topic.description && (
                                                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{topic.description}</p>
                                                        )}
                                                        {isSelected && (
                                                            <div className="absolute bottom-2 right-2">
                                                                <Sparkles className="w-4 h-4 text-primary" />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </TabsContent>

                                    {/* Prompt Input */}
                                    <TabsContent value="prompt" className="mt-0">
                                        <textarea
                                            className="w-full bg-transparent border-none outline-none resize-none h-32 placeholder:text-muted-foreground/50 text-base p-1 leading-relaxed"
                                            placeholder="Describe the video you want to create..."
                                            value={form.inputType === 'prompt' ? form.content : ''}
                                            onChange={(e) => updateForm('content', e.target.value)}
                                        />
                                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/40">
                                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                                                <Sparkles className="w-3 h-3" /> AI Enhanced
                                            </span>
                                            <span className="text-xs text-muted-foreground">{form.content.length}/500</span>
                                        </div>
                                    </TabsContent>

                                    {/* Script Input */}
                                    <TabsContent value="script" className="mt-0">
                                        <textarea
                                            className="w-full bg-transparent border-none outline-none resize-none h-32 placeholder:text-muted-foreground/50 text-base p-1 leading-relaxed"
                                            placeholder="Paste your script here..."
                                            value={form.inputType === 'script' ? form.content : ''}
                                            onChange={(e) => updateForm('content', e.target.value)}
                                        />
                                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/40">
                                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                                                <Sparkles className="w-3 h-3" /> AI Enhanced
                                            </span>
                                            <span className="text-xs text-muted-foreground">{form.content.length}/500</span>
                                        </div>
                                    </TabsContent>
                                </div>
                            </div>
                        </Tabs>
                        {errors.content && hasAttemptedSubmit && (
                            <p className="text-red-400 text-sm mt-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                {form.inputType === 'topic' ? 'Please select a topic' : `Please enter your ${form.inputType}`}
                            </p>
                        )}
                    </section>

                    {/* ================================================================
                        2. DURATION
                    ================================================================ */}
                    <section>
                        <h3 className="text-base font-semibold mb-3">Duration</h3>
                        <div className="flex gap-2">
                            {DURATIONS.map((d) => (
                                <button
                                    key={d.id}
                                    onClick={() => updateForm('duration', d.id)}
                                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${form.duration === d.id
                                        ? 'bg-primary/10 border-primary text-primary shadow-sm'
                                        : 'bg-card/50 border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/30'
                                        }`}
                                >
                                    {d.label}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* ================================================================
                        3. NARRATOR SELECTION
                    ================================================================ */}
                    <section ref={narratorSectionRef}>
                        <h3 className="text-base font-semibold mb-3">Select your narrator</h3>

                        {/* Search & Filter */}
                        <div className="flex gap-2 mb-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search narrator..."
                                    className="pl-9 bg-card/50 border-border/50 h-9 text-sm"
                                    value={narratorSearch}
                                    onChange={(e) => setNarratorSearch(e.target.value)}
                                />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="h-9 px-3 gap-2 bg-card/50 border-border/50 hover:bg-muted/30">
                                        <Filter className="w-4 h-4" />
                                        <span className="text-sm">{GENDER_OPTIONS.find(g => g.value === genderFilter)?.label}</span>
                                        <ChevronDown className="w-3 h-3 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuRadioGroup value={genderFilter} onValueChange={(v) => setGenderFilter(v as GenderFilter)}>
                                        {GENDER_OPTIONS.map(opt => (
                                            <DropdownMenuRadioItem key={opt.value} value={opt.value}>{opt.label}</DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Narrator List */}
                        <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                            {filteredNarrators.map((voice) => {
                                const locked = isLocked(voice.required_plan);
                                const badge = getPlanBadge(voice.required_plan);
                                const isSelected = form.narrator === voice.key;
                                const isPlaying = currentlyPlaying === voice.publicUrl;
                                const isLoadingAudio = voice.publicUrl ? isAudioLoading(voice.publicUrl) : false;

                                return (
                                    <div
                                        key={voice.key}
                                        onClick={() => !locked && updateForm('narrator', voice.key)}
                                        onMouseEnter={() => !locked && handleVoiceHover(voice)}
                                        className={`group flex items-center justify-between p-3 rounded-xl border transition-all ${locked
                                            ? 'bg-card/40 border-border/30 cursor-not-allowed opacity-60'
                                            : isSelected
                                                ? 'bg-primary/10 border-primary shadow-[0_0_10px_rgba(var(--primary),0.2)] cursor-pointer'
                                                : 'bg-card border-border/50 hover:border-primary/30 hover:bg-muted/30 cursor-pointer'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={(e) => !locked && handlePlayPreview(e, voice)}
                                                disabled={locked || isLoadingAudio}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${locked ? 'bg-muted cursor-not-allowed' : 'bg-secondary hover:bg-primary hover:text-white'
                                                    }`}
                                            >
                                                {isLoadingAudio ? (
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                ) : isPlaying ? (
                                                    <Pause className="w-3 h-3 fill-current" />
                                                ) : (
                                                    <Play className="w-3 h-3 fill-current ml-0.5" />
                                                )}
                                            </button>
                                            <div className="font-semibold text-sm flex items-center gap-2">
                                                {voice.label}
                                                {voice.description && (
                                                    <span className="text-xs font-normal text-muted-foreground"> • {voice.description}</span>
                                                )}
                                            </div>
                                        </div>
                                        {badge ? (
                                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                                                <Crown className="w-2.5 h-2.5 text-amber-500" />
                                                <span className="text-[9px] font-bold text-amber-500">{badge}</span>
                                            </div>
                                        ) : (
                                            <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isSelected
                                                ? 'bg-primary text-primary-foreground border-primary'
                                                : 'bg-secondary text-muted-foreground border-border'
                                                }`}>
                                                Narration
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {errors.narrator && hasAttemptedSubmit && (
                            <p className="text-red-400 text-sm mt-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                Please select a narrator
                            </p>
                        )}
                    </section>

                    {/* ================================================================
                        4. VIDEO SOURCE
                    ================================================================ */}
                    <section ref={videoSourceSectionRef}>
                        <h3 className="text-base font-semibold mb-3">Choose video source</h3>

                        <div className="space-y-4">
                            {/* AI Generated Images */}
                            <VideoSourceCard
                                title="AI Generated Images"
                                description="Images will be from an AI Generated Image library"
                                icon={<Sparkles className="w-4 h-4 text-primary" />}
                                iconBg="bg-primary/10"
                                isSelected={form.videoSource.type === 'ai-generated'}
                                onSelect={() => updateVideoSource({ type: 'ai-generated', style: undefined })}
                            >
                                <div className="relative mb-4">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search art style..."
                                        className="pl-9 bg-background border-border/50 h-9 text-sm"
                                        value={themeSearch}
                                        onChange={(e) => setThemeSearch(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto pr-1">
                                    {filteredThemes.map((theme) => {
                                        const locked = isLocked(theme.required_plan);
                                        const badge = getPlanBadge(theme.required_plan);
                                        const isSelected = form.videoSource.style === theme.key;

                                        return (
                                            <div
                                                key={theme.key}
                                                onClick={() => !locked && updateVideoSource({ style: theme.key })}
                                                className={`group relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${locked
                                                    ? 'border-border/30 cursor-not-allowed'
                                                    : isSelected
                                                        ? 'border-primary shadow-lg shadow-primary/20 ring-1 ring-primary cursor-pointer'
                                                        : 'border-transparent hover:border-primary/50 cursor-pointer'
                                                    }`}
                                            >
                                                <img src={theme.publicUrl} alt={theme.label} className={`w-full h-full object-cover transition-transform duration-500 ${locked ? '' : 'group-hover:scale-110'}`} />
                                                <div className={`absolute inset-0 transition-colors ${locked ? 'bg-black/60' : 'bg-black/40 group-hover:bg-black/20'}`} />

                                                {locked ? (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/30 to-orange-500/30 border border-amber-500/40 mb-1">
                                                            <Crown className="w-2.5 h-2.5 text-amber-400" />
                                                            <span className="text-[8px] font-bold text-amber-400">{badge}</span>
                                                        </div>
                                                        <Lock className="w-4 h-4 text-white/70 mb-1" />
                                                        <span className="text-[10px] font-bold text-white tracking-wider text-center px-1 uppercase drop-shadow-md">{theme.label}</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className="text-[10px] font-bold text-white tracking-wider text-center px-1 uppercase drop-shadow-md">{theme.label}</span>
                                                        </div>
                                                        {badge && (
                                                            <div className="absolute top-1 left-1 flex items-center gap-0.5 px-1 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                                                                <Crown className="w-2 h-2 text-amber-500" />
                                                                <span className="text-[7px] font-bold text-amber-500">{badge}</span>
                                                            </div>
                                                        )}
                                                        {isSelected && (
                                                            <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-0.5">
                                                                <Sparkles className="w-2 h-2" />
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </VideoSourceCard>

                            {/* Gameplay Videos */}
                            <VideoSourceCard
                                title="Gameplay Videos"
                                description="Videos from a Gameplay Video library"
                                icon={<Play className="w-4 h-4 text-orange-500" />}
                                iconBg="bg-orange-500/10"
                                isSelected={form.videoSource.type === 'gameplay'}
                                onSelect={() => updateVideoSource({ type: 'gameplay', style: undefined })}
                            >
                                <div className="grid grid-cols-2 gap-3">
                                    {['minecraft', 'gta-v', 'subway-surfers', 'temple-run'].map((game) => (
                                        <div
                                            key={game}
                                            onClick={() => updateVideoSource({ game })}
                                            className={`bg-card border rounded-lg p-4 transition-all cursor-pointer group ${form.videoSource.game === game
                                                ? 'border-orange-500 bg-orange-500/10'
                                                : 'border-border/50 hover:border-orange-500/50'
                                                }`}
                                        >
                                            <div className="aspect-video bg-muted rounded-md mb-2 group-hover:scale-105 transition-transform duration-300" />
                                            <p className="text-sm font-medium capitalize">{game.replace('-', ' ')}</p>
                                        </div>
                                    ))}
                                </div>
                            </VideoSourceCard>

                            {/* Viral Videos */}
                            <VideoSourceCard
                                title="Viral Videos"
                                description="Eye catching/satisfying background videos"
                                icon={<Play className="w-4 h-4 text-blue-500" />}
                                iconBg="bg-blue-500/10"
                                isSelected={form.videoSource.type === 'viral'}
                                onSelect={() => updateVideoSource({ type: 'viral', style: undefined })}
                            >
                                <div className="grid grid-cols-2 gap-3">
                                    {['satisfying', 'slime', 'asmr', 'nature'].map((cat) => (
                                        <div
                                            key={cat}
                                            onClick={() => updateVideoSource({ category: cat })}
                                            className={`bg-card border rounded-lg p-4 transition-all cursor-pointer group ${form.videoSource.category === cat
                                                ? 'border-blue-500 bg-blue-500/10'
                                                : 'border-border/50 hover:border-blue-500/50'
                                                }`}
                                        >
                                            <div className="aspect-video bg-muted rounded-md mb-2 group-hover:scale-105 transition-transform duration-300" />
                                            <p className="text-sm font-medium capitalize">{cat}</p>
                                        </div>
                                    ))}
                                </div>
                            </VideoSourceCard>
                        </div>
                        {errors.videoSource && hasAttemptedSubmit && (
                            <p className="text-red-400 text-sm mt-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                Please select a video style
                            </p>
                        )}
                    </section>

                    {/* ================================================================
                        GENERATE BUTTON
                    ================================================================ */}
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
