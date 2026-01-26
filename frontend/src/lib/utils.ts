import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPlanBadge = (plan?: 'free' | 'pro' | 'premium') => {
  if (!plan || plan === 'free') return null;
  return plan === 'pro' ? 'PRO' : 'PREMIUM';
};
