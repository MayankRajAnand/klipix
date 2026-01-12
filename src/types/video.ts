// Video conversion types
export type InputMode = 'url' | 'upload';

export interface ConvertShortsRequest {
  youtubeUrl?: string;
  videoFile?: File;
  inputMode: InputMode;
}

export interface ConvertShortsResponse {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  shorts: GeneratedShort[];
}

export interface GeneratedShort {
  id: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  title: string;
}

// Faceless shorts types
export type VisualStyle = 'realistic' | 'animated' | 'stock';

export interface VoiceOption {
  id: string;
  label: string;
  gender: 'male' | 'female';
}

export interface FacelessShortsRequest {
  topic: string;
  script?: string;
  visualStyle: VisualStyle;
  voiceId: string;
  backgroundMusicId?: string;
}

export interface FacelessShortsResponse {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  thumbnailUrl?: string;
}

// Auto caption types
export type CaptionStyle = 'viral' | 'minimal' | 'karaoke' | 'subtitle';
export type CaptionPosition = 'center' | 'bottom';

export interface CaptionColorPreset {
  id: string;
  color: string;
  label: string;
}

export interface AutoCaptionRequest {
  videoFile: File;
  style: CaptionStyle;
  colorPresetId: string;
  position: CaptionPosition;
}

export interface AutoCaptionResponse {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  captions?: CaptionSegment[];
}

export interface CaptionSegment {
  startTime: number;
  endTime: number;
  text: string;
}

// Job status types
export interface JobStatus {
  id: string;
  type: 'convert' | 'faceless' | 'captions';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  completedAt?: string;
  error?: string;
}
