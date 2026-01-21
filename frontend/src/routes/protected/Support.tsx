import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    HeadphonesIcon,
    Bug,
    Lightbulb,
    MessageSquare,
    UserCog,
    Send,
    Loader2,
    Mail,
    FileText,
    CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface FeedbackType {
    id: string;
    label: string;
    description: string;
    icon: React.ElementType;
}

const feedbackTypes: FeedbackType[] = [
    {
        id: 'bug',
        label: 'Bug Report',
        description: 'Something isn\'t working correctly',
        icon: Bug,
    },
    {
        id: 'feature',
        label: 'Feature Request',
        description: 'Suggest a new feature or improvement',
        icon: Lightbulb,
    },
    {
        id: 'general',
        label: 'General Feedback',
        description: 'Share your thoughts with us',
        icon: MessageSquare,
    },
    {
        id: 'account',
        label: 'Account Issue',
        description: 'Help with your account or billing',
        icon: UserCog,
    },
];

const Support = () => {
    const { user } = useAuth();
    const [selectedType, setSelectedType] = useState<string>('general');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState(user?.email || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim() || !message.trim() || !email.trim()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setSelectedType('general');
        setSubject('');
        setMessage('');
        setIsSubmitted(false);
    };

    return (
        <DashboardLayout>
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <HeadphonesIcon className="w-5 h-5 text-primary" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                        Support
                    </h1>
                </div>
                <p className="text-muted-foreground mt-1">
                    We're here to help. Send us your feedback or report an issue.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form Section */}
                <div className="lg:col-span-2">
                    {isSubmitted ? (
                        /* Success State */
                        <div className="rounded-2xl border border-border/50 bg-card p-8">
                            <div className="text-center py-8">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mb-3">
                                    Thank you for your feedback!
                                </h2>
                                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                    We've received your message and will get back to you within 24-48 hours.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={handleReset}
                                >
                                    Send another message
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Feedback Type Selection */}
                            <div className="rounded-2xl border border-border/50 bg-card p-6">
                                <h2 className="text-lg font-semibold text-foreground mb-4">
                                    What can we help you with?
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {feedbackTypes.map((type) => {
                                        const Icon = type.icon;
                                        const isSelected = selectedType === type.id;

                                        return (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => setSelectedType(type.id)}
                                                className={`
                                                    group relative flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200
                                                    ${isSelected
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-border/50 bg-background hover:border-primary/30 hover:bg-muted/50'
                                                    }
                                                `}
                                            >
                                                {/* Selection indicator */}
                                                <div className={`
                                                    absolute top-3 right-3 w-4 h-4 rounded-full border-2 transition-colors
                                                    ${isSelected
                                                        ? 'border-primary bg-primary'
                                                        : 'border-muted-foreground/30'
                                                    }
                                                `}>
                                                    {isSelected && (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className={`
                                                    w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                                                    ${isSelected
                                                        ? 'bg-primary/10'
                                                        : 'bg-muted'
                                                    }
                                                `}>
                                                    <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                                                </div>

                                                <div className="flex-1 min-w-0 pr-6">
                                                    <h3 className={`font-medium ${isSelected ? 'text-foreground' : 'text-foreground/80'}`}>
                                                        {type.label}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mt-0.5">
                                                        {type.description}
                                                    </p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="rounded-2xl border border-border/50 bg-card p-6 space-y-5">
                                <h2 className="text-lg font-semibold text-foreground mb-4">
                                    Tell us more
                                </h2>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        Email address
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="h-11"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1.5">
                                        We'll respond to this email address
                                    </p>
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <label htmlFor="subject" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                        <FileText className="w-4 h-4 text-muted-foreground" />
                                        Subject
                                    </label>
                                    <Input
                                        id="subject"
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Brief description of your issue or feedback"
                                        required
                                        className="h-11"
                                    />
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Please provide as much detail as possible. Include steps to reproduce if reporting a bug."
                                        required
                                        rows={6}
                                        className="w-full px-3 py-3 rounded-md border border-input bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] resize-none dark:bg-input/30 text-sm"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        variant="gradient"
                                        className="w-full sm:w-auto h-11 px-8"
                                        disabled={isSubmitting || !subject.trim() || !message.trim() || !email.trim()}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Send Feedback
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {/* Sidebar - Quick Help */}
                <div className="space-y-6">
                    {/* Response Time Card */}
                    <div className="rounded-2xl border border-border/50 bg-card p-6">
                        <h3 className="font-semibold text-foreground mb-3">Response Time</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-sm text-muted-foreground">
                                    Bug reports: <span className="text-foreground">24 hours</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <span className="text-sm text-muted-foreground">
                                    Account issues: <span className="text-foreground">24 hours</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-purple-500" />
                                <span className="text-sm text-muted-foreground">
                                    Feature requests: <span className="text-foreground">48 hours</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                <span className="text-sm text-muted-foreground">
                                    General feedback: <span className="text-foreground">48 hours</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Tips Card */}
                    <div className="rounded-2xl border border-border/50 bg-card p-6">
                        <h3 className="font-semibold text-foreground mb-3">Tips for faster support</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>Include specific steps to reproduce bugs</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>Mention the browser and device you're using</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>Share relevant project or video IDs if applicable</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>Check your spam folder for our response</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Card */}
                    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
                        <h3 className="font-semibold text-foreground mb-2">Need urgent help?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            For critical issues affecting your account or billing, reach out directly.
                        </p>
                        <a
                            href="mailto:support@klipix.io"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                            <Mail className="w-4 h-4" />
                            support@klipix.io
                        </a>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Support;
