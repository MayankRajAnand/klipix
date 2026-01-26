import { cn } from '@/lib/utils';

interface LoaderProps {
    /** Size of the spinner */
    size?: 'sm' | 'md' | 'lg';
    /** Optional loading text */
    text?: string;
    /** Whether to show as fullscreen overlay */
    fullScreen?: boolean;
    /** Additional className */
    className?: string;
}

const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-12 h-12 border-4',
};

export function Loader({ size = 'md', text, fullScreen = false, className }: LoaderProps) {
    const spinner = (
        <div className={cn('flex flex-col items-center gap-3', className)}>
            <div
                className={cn(
                    'border-primary border-t-transparent rounded-full animate-spin',
                    sizeClasses[size]
                )}
            />
            {text && <p className="text-muted-foreground text-sm">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                {spinner}
            </div>
        );
    }

    return spinner;
}

/** Full page loader - shows centered spinner with optional text */
export function PageLoader({ text = 'Loading...' }: { text?: string }) {
    return (
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
            <Loader size="lg" text={text} />
        </div>
    );
}

/** Inline loader for sections/cards */
export function SectionLoader({ text }: { text?: string }) {
    return (
        <div className="flex items-center justify-center py-12">
            <Loader size="md" text={text} />
        </div>
    );
}
