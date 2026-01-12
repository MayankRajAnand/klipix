import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  LogOut, 
  Youtube, 
  Upload, 
  Sparkles, 
  Type,
  ChevronRight,
  User
} from 'lucide-react';
import ConvertShortsFeature from '@/components/dashboard/ConvertShortsFeature';
import FacelessShortsFeature from '@/components/dashboard/FacelessShortsFeature';
import AutoCaptionFeature from '@/components/dashboard/AutoCaptionFeature';

type FeatureTab = 'convert' | 'faceless' | 'captions';

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FeatureTab>('convert');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return null;

  const features = [
    {
      id: 'convert' as const,
      label: 'Convert to Shorts',
      icon: Youtube,
      description: 'From YouTube or uploaded video',
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 'faceless' as const,
      label: 'Faceless Shorts',
      icon: Sparkles,
      description: 'AI-generated content',
      color: 'from-primary to-accent',
    },
    {
      id: 'captions' as const,
      label: 'Auto Captions',
      icon: Type,
      description: 'Add viral captions',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-display">KlipIx</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                  {user.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Welcome to <span className="gradient-text">KlipIx</span>
          </h1>
          <p className="text-muted-foreground">
            Choose a feature below to start creating viral shorts
          </p>
        </motion.div>

        {/* Feature Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {features.map((feature, index) => (
            <motion.button
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveTab(feature.id)}
              className={`relative group text-left p-5 rounded-2xl border transition-all duration-300 ${
                activeTab === feature.id
                  ? 'border-primary/50 bg-primary/10'
                  : 'border-border bg-secondary/30 hover:border-primary/30 hover:bg-secondary/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform ${
                  activeTab === feature.id ? 'text-primary rotate-90' : 'text-muted-foreground group-hover:translate-x-1'
                }`} />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{feature.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
              
              {activeTab === feature.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-2xl border-2 border-primary pointer-events-none"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Feature Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 sm:p-8"
          >
            {activeTab === 'convert' && <ConvertShortsFeature />}
            {activeTab === 'faceless' && <FacelessShortsFeature />}
            {activeTab === 'captions' && <AutoCaptionFeature />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
