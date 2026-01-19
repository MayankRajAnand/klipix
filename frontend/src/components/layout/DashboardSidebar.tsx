import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderOpen,
    BarChart3,
    Share2,
    Sparkles,
    Layers,
    ChevronDown,
    Activity,
    HeadphonesIcon
} from 'lucide-react';
import KlipixLogo from '@/assets/Klipix.svg';

interface NavItem {
    label: string;
    icon: React.ElementType;
    path?: string;
    children?: NavItem[];
}



// Growth & distribution - used after creation
const distributionItems: NavItem[] = [
    { label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { label: 'Social Accounts', icon: Share2, path: '/social-accounts' },
];

// Configuration & admin - low frequency
const adminItems: NavItem[] = [
    { label: 'Credits & Usage', icon: Activity, path: '/usage' },
    { label: 'Support', icon: HeadphonesIcon, path: '/support' },
];

const DashboardSidebar = () => {
    const location = useLocation();
    const [expandedMenus, setExpandedMenus] = useState<string[]>(['Create']);

    const toggleMenu = (label: string) => {
        setExpandedMenus(prev =>
            prev.includes(label)
                ? prev.filter(item => item !== label)
                : [...prev, label]
        );
    };

    const isActive = (path?: string) => {
        if (!path) return false;
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    const isParentActive = (item: NavItem) => {
        if (item.children) {
            return item.children.some(child => isActive(child.path));
        }
        return false;
    };

    const renderNavItem = (item: NavItem, isChild = false) => {
        const Icon = item.icon;
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedMenus.includes(item.label);
        const active = isActive(item.path) || isParentActive(item);

        if (hasChildren) {
            return (
                <div key={item.label} className="space-y-1">
                    <button
                        onClick={() => toggleMenu(item.label)}
                        className={`
                            w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                            ${active
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover-standard'
                            }
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4" />
                            {item.label}
                        </div>
                        <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {/* Submenu */}
                    <div
                        className={`
                            ml-4 pl-3 border-l border-border/50 space-y-1 overflow-hidden transition-all duration-200
                            ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                        `}
                    >
                        {item.children?.map(child => renderNavItem(child, true))}
                    </div>
                </div>
            );
        }

        const content = (
            <>
                <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    {item.label}
                </div>
            </>
        );

        const baseClasses = `
            flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
            ${isChild ? 'py-2' : ''}
            ${isActive(item.path)
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover-standard'
            }
        `;

        return (
            <Link
                key={item.path || item.label}
                to={item.path || '#'}
                className={baseClasses}
            >
                {content}
            </Link>
        );
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border/50 flex flex-col z-40">
            {/* Logo */}
            <div className="p-6 border-b border-border/50">
                <Link to="/" className="flex items-center gap-2">
                    <img src={KlipixLogo} alt="Klipix" className="w-9 h-9" />
                    <span className="font-bold text-xl text-foreground">
                        Klip<span className="gradient-text">ix</span>
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
                {/* Dashboard & Workflow */}
                <div className="space-y-1">
                    <Link
                        to="/dashboard"
                        className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                            ${isActive('/dashboard')
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover-standard'
                            }
                        `}
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                </div>

                {/* Creation Section */}
                <div className="space-y-1">
                    <div className="px-3 py-2">
                        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                            Create
                        </h2>
                    </div>
                    <div className="space-y-1">
                        <Link
                            to="/create/faceless"
                            className={`
                                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ml-2
                                ${isActive('/create/faceless')
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover-standard'
                                }
                            `}
                        >
                            <Sparkles className="w-4 h-4" />
                            Faceless Shorts
                        </Link>
                        <Link
                            to="/create/series"
                            className={`
                                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ml-2
                                ${isActive('/create/series')
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover-standard'
                                }
                            `}
                        >
                            <Layers className="w-4 h-4" />
                            Series Shorts
                        </Link>
                    </div>
                </div>

                {/* Projects */}
                <div className="space-y-1">
                    <Link
                        to="/projects"
                        className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                            ${isActive('/projects')
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover-standard'
                            }
                        `}
                    >
                        <FolderOpen className="w-4 h-4" />
                        Projects
                    </Link>
                </div>

                {/* Visual Divider */}
                <div className="my-2">
                    <div className="h-px bg-border mx-4" />
                </div>

                {/* Growth & Distribution - Secondary */}
                <div className="space-y-1">
                    {distributionItems.map(item => renderNavItem(item))}
                </div>

                {/* Visual Divider */}
                <div className="my-2">
                    <div className="h-px bg-border mx-4" />
                </div>

                {/* Configuration & Admin - Low Frequency */}
                <div className="space-y-1">
                    {adminItems.map(item => renderNavItem(item))}
                </div>
            </nav>
        </aside>
    );
};

export default DashboardSidebar;
