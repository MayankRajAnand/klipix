import { create } from 'zustand';

interface UserState {
    credits: number | null;
    setCredits: (credits: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
    credits: null,
    setCredits: (credits) => set({ credits }),
}));
