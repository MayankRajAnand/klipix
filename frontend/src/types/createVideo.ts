export type InputType = 'prompt' | 'script' | 'topic';
export type VideoSourceType = 'ai-generated' | 'gameplay' | 'viral';
export type GenderFilter = 'all' | 'male' | 'female';

export interface FormPayload {
    inputType: InputType;
    content: string;           // Text for prompt/script, or topic key for topic
    duration: string;
    narrator: string;
    videoSource: {
        type: VideoSourceType;
        style?: string;        // Theme key (for ai-generated)
        game?: string;         // Game key (for gameplay)
        category?: string;     // Category key (for viral)
    };
}

export interface ValidationErrors {
    content: boolean;
    narrator: boolean;
    videoSource: boolean;
}
