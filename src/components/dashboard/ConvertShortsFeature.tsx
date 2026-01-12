import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Youtube, 
  Upload, 
  Link, 
  Sparkles, 
  Clock, 
  Film,
  ArrowRight,
  CheckCircle2,
  Loader2,
  X,
  User
} from 'lucide-react';
import { useConvertShorts, useFileUpload } from '@/hooks/useVideoProcessing';
import { useYouTubeMetadata } from '@/hooks/useYouTubeMetadata';
import type { InputMode } from '@/types/video';

const ConvertShortsFeature = () => {
  const [inputMode, setInputMode] = useState<InputMode>('url');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  
  const { uploadedFile, setUploadedFile } = useFileUpload();
  const { isProcessing, process, error } = useConvertShorts();
  const { 
    isLoading: isLoadingMetadata, 
    metadata, 
    error: metadataError, 
    fetchMetadata,
    reset: resetMetadata 
  } = useYouTubeMetadata();

  // Debounced fetch when URL changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (youtubeUrl && inputMode === 'url') {
        fetchMetadata(youtubeUrl);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [youtubeUrl, inputMode, fetchMetadata]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleClearUrl = () => {
    setYoutubeUrl('');
    resetMetadata();
  };

  const handleConvert = async () => {
    await process({
      inputMode,
      youtubeUrl: inputMode === 'url' ? youtubeUrl : undefined,
      videoFile: inputMode === 'upload' ? uploadedFile ?? undefined : undefined,
    });
  };

  const features = [
    { icon: Clock, text: 'Auto-detect best moments' },
    { icon: Film, text: 'Vertical format (9:16)' },
    { icon: Sparkles, text: 'AI-enhanced clips' },
  ];

  const isDisabled = isProcessing || (inputMode === 'url' ? !youtubeUrl || !metadata : !uploadedFile);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          Convert YouTube Video to Shorts
        </h2>
        <p className="text-muted-foreground">
          Paste a YouTube URL or upload a video to automatically extract the best viral moments
        </p>
      </div>

      {/* Input Mode Toggle */}
      <div className="flex gap-2 p-1 bg-secondary/50 rounded-xl w-fit">
        <button
          onClick={() => {
            setInputMode('url');
            setUploadedFile(null);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            inputMode === 'url'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Link className="w-4 h-4" />
          YouTube URL
        </button>
        <button
          onClick={() => {
            setInputMode('upload');
            handleClearUrl();
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            inputMode === 'upload'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload Video
        </button>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        {inputMode === 'url' ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-url">YouTube Video URL</Label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                  <Input
                    id="youtube-url"
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="pl-11 pr-10 h-12 bg-secondary/50 border-border focus:border-primary"
                  />
                  {youtubeUrl && (
                    <button
                      onClick={handleClearUrl}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoadingMetadata && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border"
              >
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                <span className="text-sm text-muted-foreground">Fetching video info...</span>
              </motion.div>
            )}

            {/* Video Preview */}
            {metadata && !isLoadingMetadata && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 p-4 rounded-xl bg-secondary/30 border border-primary/30"
              >
                <div className="relative w-40 sm:w-48 flex-shrink-0">
                  <img
                    src={metadata.thumbnailUrl}
                    alt={metadata.title}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs text-green-500 font-medium">Video found</span>
                  </div>
                  <h3 className="font-medium text-foreground line-clamp-2 text-sm sm:text-base">
                    {metadata.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span className="truncate">{metadata.authorName}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Metadata Error */}
            {metadataError && !isLoadingMetadata && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-destructive/10 border border-destructive/30"
              >
                <p className="text-sm text-destructive">{metadataError}</p>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Label>Upload Video File</Label>
            <label
              htmlFor="video-upload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-secondary/30 transition-all"
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
                  <p className="text-xs text-muted-foreground">Click to change file</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 rounded-full bg-secondary">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-foreground">Drop your video here</p>
                    <p className="text-sm text-muted-foreground">or click to browse</p>
                  </div>
                  <p className="text-xs text-muted-foreground">MP4, MOV, AVI up to 500MB</p>
                </div>
              )}
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Features List */}
      <div className="flex flex-wrap gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <feature.icon className="w-4 h-4 text-primary" />
            {feature.text}
          </motion.div>
        ))}
      </div>

      {/* Convert Button */}
      <Button
        variant="gradient"
        size="lg"
        onClick={handleConvert}
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
            Convert to Shorts
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default ConvertShortsFeature;
