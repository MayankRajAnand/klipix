import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import KlipixLogo from '@/assets/Klipix.svg';

const MAX_NAME_LENGTH = 50;

const SignUpPage = () => {
    const { user, loading, signInWithGoogle, signInWithMagicLink, error, clearError } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [magicLinkSent, setMagicLinkSent] = useState(false);
    const [nameError, setNameError] = useState<string | null>(null);
    const navigate = useNavigate();

    // If already logged in, redirect
    if (!loading && user) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleGoogleSignIn = async () => {
        clearError();
        await signInWithGoogle();
    };

    const handleMagicLinkSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setNameError(null);

        const trimmedName = name.trim();
        if (!email.trim() || !trimmedName) return;

        if (trimmedName.length > MAX_NAME_LENGTH) {
            setNameError(`Name must be ${MAX_NAME_LENGTH} characters or less`);
            return;
        }

        setIsSubmitting(true);
        clearError();

        const { error } = await signInWithMagicLink(email, trimmedName);

        setIsSubmitting(false);
        if (!error) {
            setMagicLinkSent(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 hero-grid opacity-40" />
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" />

            <div className="relative z-10 w-full max-w-md mx-4">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <Link to="/" className="flex items-center gap-3">
                        <img src={KlipixLogo} alt="Klipix" className="w-12 h-12" />
                        <span className="font-bold text-2xl text-foreground">
                            Klip<span className="gradient-text">ix</span>
                        </span>
                    </Link>
                </div>

                {/* Heading - Outside Card */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-3">Create your account</h1>
                    <p className="text-lg text-muted-foreground">Transform your ideas into stunning videos</p>
                </div>

                {/* Card */}
                <div className="glass-card rounded-2xl p-8 border border-border shadow-2xl shadow-black/10 dark:shadow-primary/10">

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                            <p className="text-sm text-destructive">{error.message}</p>
                        </div>
                    )}

                    {magicLinkSent ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                <Mail className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-xl font-semibold text-foreground mb-2">Check your email</h2>
                            <p className="text-muted-foreground mb-4">
                                We sent a magic link to <span className="text-foreground font-medium">{email}</span>
                            </p>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setMagicLinkSent(false);
                                    setName('');
                                    setEmail('');
                                }}
                            >
                                Use a different email
                            </Button>
                        </div>
                    ) : (
                        <>
                            {/* Google Sign In */}
                            <Button
                                variant="outline"
                                className="w-full h-12 gap-3 mb-6"
                                onClick={handleGoogleSignIn}
                            >
                                <FcGoogle className="w-5 h-5" />
                                Continue with Google
                            </Button>

                            {/* Divider */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-card text-muted-foreground">or continue with email</span>
                                </div>
                            </div>

                            {/* Magic Link Form */}
                            <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                        Full name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            setNameError(null);
                                        }}
                                        placeholder="John Doe"
                                        maxLength={MAX_NAME_LENGTH}
                                        required
                                        className="w-full h-12 px-4 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                    />
                                    {nameError && (
                                        <p className="mt-1 text-sm text-destructive">{nameError}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full h-12 px-4 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    variant="gradient"
                                    className="w-full h-12"
                                    disabled={isSubmitting || !name.trim() || !email.trim()}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Sending magic link...
                                        </>
                                    ) : (
                                        <>
                                            <Mail className="w-4 h-4 mr-2" />
                                            Get started with email
                                        </>
                                    )}
                                </Button>
                            </form>
                        </>
                    )}

                    {/* Login link */}
                    <div className="mt-8 pt-6 border-t border-border text-center">
                        <p className="text-muted-foreground">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to home */}
                <div className="mt-8 text-center">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                        className="gap-2 text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
