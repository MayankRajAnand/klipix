import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Type, 
  Upload, 
  Palette, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlignCenter,
  AlignLeft
} from 'lucide-react';
import { useAutoCaptions, useFileUpload } from '@/hooks/useVideoProcessing';
import { CAPTION_STYLES, CAPTION_COLORS } from '@/constants/videoOptions';
import type { CaptionStyle, CaptionPosition } from '@/types/video';

const AutoCaptionFeature = () => {
  const [selectedStyle, setSelectedStyle] = useState<CaptionStyle>('viral');
  const [selectedColor, setSelectedColor] = useState('white');
  const [selectedPosition, setSelectedPosition] = useState<CaptionPosition>('center');
  
  const { uploadedFile, setUploadedFile } = useFileUpload();
  const { isProcessing, process, error } = useAutoCaptions();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAddCaptions = async () => {
    if (!uploadedFile) return;
    
    await process({
      videoFile: uploadedFile,
      style: selectedStyle,
      colorPresetId: selectedColor,
      position: selectedPosition,
    });
  };

  const isDisabled = isProcessing || !uploadedFile;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          Auto Caption Videos
        </h2>
        <p className="text-muted-foreground">
          Add viral-style animated captions to your videos automatically
        </p>
      </div>

      {/* Upload Section */}
      <div className="space-y-2">
        <Label>Upload Your Video</Label>
        <label
          htmlFor="caption-video-upload"
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-secondary/30 transition-all"
        >
          {uploadedFile ? (
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-green-500/20">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-secondary">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">Drop your video here</p>
                <p className="text-sm text-muted-foreground">MP4, MOV up to 500MB</p>
              </div>
            </div>
          )}
          <input
            id="caption-video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Caption Style */}
      <div className="space-y-3">
        <Label>Caption Style</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CAPTION_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                selectedStyle === style.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-secondary/30 hover:border-primary/30'
              }`}
            >
              <Type className={`w-5 h-5 ${
                selectedStyle === style.id ? 'text-primary' : 'text-muted-foreground'
              }`} />
              <span className={`text-sm font-medium ${
                selectedStyle === style.id ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {style.label}
              </span>
              <span className="text-xs text-muted-foreground">{style.preview}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Presets */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Caption Color
        </Label>
        <div className="flex gap-3">
          {CAPTION_COLORS.map((preset) => (
            <button
              key={preset.id}
              title={preset.label}
              onClick={() => setSelectedColor(preset.id)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                selectedColor === preset.id ? 'border-primary scale-110' : 'border-border hover:border-primary'
              }`}
              style={{ 
                background: preset.color.includes('gradient') ? preset.color : preset.color
              }}
            />
          ))}
        </div>
      </div>

      {/* Position */}
      <div className="space-y-3">
        <Label>Caption Position</Label>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPosition('center')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              selectedPosition === 'center'
                ? 'border-primary bg-primary/10 text-foreground'
                : 'border-border bg-secondary/30 text-muted-foreground hover:border-primary/30'
            }`}
          >
            <AlignCenter className="w-4 h-4" />
            Center
          </button>
          <button
            onClick={() => setSelectedPosition('bottom')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              selectedPosition === 'bottom'
                ? 'border-primary bg-primary/10 text-foreground'
                : 'border-border bg-secondary/30 text-muted-foreground hover:border-primary/30'
            }`}
          >
            <AlignLeft className="w-4 h-4" />
            Bottom
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
        <div className="aspect-[9/16] max-w-[180px] mx-auto bg-background rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
          <div className={`absolute ${selectedPosition === 'center' ? 'top-1/2 -translate-y-1/2' : 'bottom-6'} left-0 right-0 text-center px-2`}>
            <span className="text-xs font-bold text-white drop-shadow-lg">
              Your captions here
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Preview</p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Add Captions Button */}
      <Button
        variant="gradient"
        size="lg"
        onClick={handleAddCaptions}
        disabled={isDisabled}
        className="w-full sm:w-auto gap-2"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground" />
            Processing...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Add Captions
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default AutoCaptionFeature;
