import type { VoiceOption, CaptionColorPreset, VisualStyle, CaptionStyle } from '@/types/video';

export const VOICE_OPTIONS: VoiceOption[] = [
  { id: 'male-1', label: 'Male Voice 1', gender: 'male' },
  { id: 'male-2', label: 'Male Voice 2', gender: 'male' },
  { id: 'female-1', label: 'Female Voice 1', gender: 'female' },
  { id: 'female-2', label: 'Female Voice 2', gender: 'female' },
];

export const VISUAL_STYLES: { id: VisualStyle; label: string; description: string }[] = [
  { id: 'realistic', label: 'Realistic', description: 'Photo-realistic AI visuals' },
  { id: 'animated', label: 'Animated', description: 'Stylized animations' },
  { id: 'stock', label: 'Stock Footage', description: 'Curated stock videos' },
];

export const CAPTION_STYLES: { id: CaptionStyle; label: string; preview: string }[] = [
  { id: 'viral', label: 'Viral Pop', preview: 'Bold, animated' },
  { id: 'minimal', label: 'Minimal', preview: 'Clean, simple' },
  { id: 'karaoke', label: 'Karaoke', preview: 'Word-by-word' },
  { id: 'subtitle', label: 'Subtitle', preview: 'Classic style' },
];

export const CAPTION_COLORS: CaptionColorPreset[] = [
  { id: 'white', color: '#FFFFFF', label: 'White' },
  { id: 'yellow', color: '#FFFF00', label: 'Yellow' },
  { id: 'cyan', color: '#00FFFF', label: 'Cyan' },
  { id: 'gradient', color: 'linear-gradient(135deg, #8B5CF6, #00D4FF)', label: 'Gradient' },
];

export const TOPIC_SUGGESTIONS = [
  'Motivational quotes',
  'Fun facts about science',
  'Life hacks for productivity',
  'Daily affirmations',
];

export const SUPPORTED_VIDEO_FORMATS = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime'];
export const MAX_FILE_SIZE_MB = 500;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
