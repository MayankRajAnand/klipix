import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface VideoSourceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    iconBg: string;
    isSelected: boolean;
    onSelect: () => void;
    children: React.ReactNode;
}

export const VideoSourceCard = ({ title, description, icon, iconBg, isSelected, onSelect, children }: VideoSourceCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        onSelect();
        setIsOpen(true);
    };

    return (
        <div className={`border rounded-2xl bg-card overflow-hidden transition-all ${isSelected ? 'border-primary/50 shadow-sm' : 'border-border/50 hover:border-primary/20'}`}>
            <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={handleClick}
            >
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>{icon}</div>
                    <div>
                        <h4 className="font-medium text-sm">{title}</h4>
                        <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {isSelected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">Selected</span>
                    )}
                    <div
                        className="transition-transform duration-300"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                    >
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                </div>
            </div>

            <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: isOpen ? '600px' : '0px', opacity: isOpen ? 1 : 0 }}
            >
                <div className="p-4 border-t border-border/50 bg-muted/5">{children}</div>
            </div>
        </div>
    );
};
