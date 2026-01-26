import type { GenderFilter } from '@/types/createVideo';

export const DURATIONS = [
    { id: 'short', label: 'Short (<30s)' },
    { id: 'standard', label: 'Standard (30s-60s)' },
    { id: 'long', label: 'Long (>60s)' },
];

export const GENDER_OPTIONS: { value: GenderFilter; label: string }[] = [
    { value: 'all', label: 'All Voices' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
];
