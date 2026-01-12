import { useState } from 'react';
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
  CheckCircle2
} from 'lucide-react';

type InputMode = 'url' | 'upload';

const ConvertShortsFeature = () => {
  const [inputMode, setInputMode] = useState<InputMode>('url');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleConvert = async () => {
    setIsProcessing(true);
    // Simulate processing - this would be replaced with actual API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
  };

  const features = [
    { icon: Clock, text: 'Auto-detect best moments' },
    { icon: Film, text: 'Vertical format (9:16)' },
    { icon: Sparkles, text: 'AI-enhanced clips' },
  ];

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
          onClick={() => setInputMode('url')}
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
          onClick={() => setInputMode('upload')}
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
                  className="pl-11 h-12 bg-secondary/50 border-border focus:border-primary"
                />
              </div>
            </div>
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
        disabled={isProcessing || (inputMode === 'url' ? !youtubeUrl : !uploadedFile)}
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
