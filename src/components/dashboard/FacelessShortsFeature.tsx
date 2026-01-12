import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Sparkles, 
  Wand2, 
  Image, 
  Music, 
  Mic,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { useFacelessShorts, useScriptGeneration } from '@/hooks/useVideoProcessing';
import { VISUAL_STYLES, VOICE_OPTIONS, TOPIC_SUGGESTIONS } from '@/constants/videoOptions';
import type { VisualStyle } from '@/types/video';

const FacelessShortsFeature = () => {
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<VisualStyle | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  
  const { isProcessing, process, error } = useFacelessShorts();
  const { isGenerating, generate: generateScript } = useScriptGeneration();

  const styleIcons = {
    realistic: Image,
    animated: Sparkles,
    stock: Wand2,
  };

  const handleGenerateScript = async () => {
    if (topic) {
      const generatedScript = await generateScript(topic);
      if (generatedScript) {
        setScript(generatedScript);
      }
    }
  };

  const handleGenerate = async () => {
    if (!selectedStyle || !selectedVoice) return;
    
    await process({
      topic,
      script: script || undefined,
      visualStyle: selectedStyle,
      voiceId: selectedVoice,
    });
  };

  const isDisabled = isProcessing || !topic || !selectedStyle || !selectedVoice;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          Create Faceless Shorts
        </h2>
        <p className="text-muted-foreground">
          Generate AI-powered videos with voiceover and visuals - no camera required
        </p>
      </div>

      {/* Topic Input */}
      <div className="space-y-3">
        <Label htmlFor="topic">Topic or Niche</Label>
        <div className="relative">
          <Lightbulb className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="topic"
            type="text"
            placeholder="e.g., Motivational quotes, Fun facts..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="pl-11 h-12 bg-secondary/50 border-border focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {TOPIC_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setTopic(suggestion)}
              className="px-3 py-1.5 text-xs rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Script Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="script">Script (Optional)</Label>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary gap-1 h-8"
            onClick={handleGenerateScript}
            disabled={!topic || isGenerating}
          >
            <Wand2 className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Auto-generate'}
          </Button>
        </div>
        <Textarea
          id="script"
          placeholder="Enter your script here or let AI generate one based on your topic..."
          value={script}
          onChange={(e) => setScript(e.target.value)}
          className="min-h-[120px] bg-secondary/50 border-border focus:border-primary resize-none"
        />
      </div>

      {/* Visual Style */}
      <div className="space-y-3">
        <Label>Visual Style</Label>
        <div className="grid grid-cols-3 gap-3">
          {VISUAL_STYLES.map((style) => {
            const IconComponent = styleIcons[style.id];
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                  selectedStyle === style.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-secondary/30 hover:border-primary/30'
                }`}
              >
                <IconComponent className={`w-6 h-6 ${
                  selectedStyle === style.id ? 'text-primary' : 'text-muted-foreground'
                }`} />
                <span className={`text-sm font-medium ${
                  selectedStyle === style.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {style.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Voice Selection */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Mic className="w-4 h-4" />
          AI Voice
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {VOICE_OPTIONS.map((voice) => (
            <button
              key={voice.id}
              onClick={() => setSelectedVoice(voice.id)}
              className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                selectedVoice === voice.id
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-secondary/30 text-muted-foreground hover:border-primary/30 hover:text-foreground'
              }`}
            >
              {voice.label}
            </button>
          ))}
        </div>
      </div>

      {/* Background Music */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border">
        <div className="p-2 rounded-lg bg-primary/20">
          <Music className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground text-sm">Background Music</p>
          <p className="text-xs text-muted-foreground">Add trending background music</p>
        </div>
        <Button variant="outline" size="sm">
          Browse
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Generate Button */}
      <Button
        variant="gradient"
        size="lg"
        onClick={handleGenerate}
        disabled={isDisabled}
        className="w-full sm:w-auto gap-2"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Short
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default FacelessShortsFeature;
