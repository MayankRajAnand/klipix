import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
    Activity,
    Zap,
    Calendar,
    Download,
    Filter,
    Search,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    Info,
    Gem,
    History
} from 'lucide-react';

// Mock Data for Transaction History
const transactions = [
    {
        id: 'PID-9928',
        projectName: 'The Amphibious Tiger',
        category: 'Faceless Short',
        date: 'Oct 24, 2023',
        time: '14:30 PM',
        credits: -15,
        status: 'completed'
    },
    {
        id: 'PID-3321',
        projectName: 'The Blue Whale',
        category: 'Series Video',
        date: 'Oct 22, 2023',
        time: '09:15 AM',
        credits: -40,
        status: 'completed'
    },
    {
        id: 'PID-8821',
        projectName: 'Mars Colony Ep 1',
        category: 'Series Video',
        date: 'Oct 20, 2023',
        time: '11:42 AM',
        credits: -40,
        status: 'completed'
    },
    {
        id: 'PID-1102',
        projectName: 'Cat Falls Comp',
        category: 'Faceless Short',
        date: 'Oct 18, 2023',
        time: '16:20 PM',
        credits: -15,
        status: 'completed'
    },
    {
        id: 'PID-5590',
        projectName: 'AI News Daily',
        category: 'Faceless Short',
        date: 'Oct 15, 2023',
        time: '08:05 AM',
        credits: -25,
        status: 'completed'
    },
    {
        id: 'PID-4421',
        projectName: 'Crypto Update',
        category: 'Series Video',
        date: 'Oct 12, 2023',
        time: '13:15 PM',
        credits: -25,
        status: 'completed'
    }
];

const CreditsAndUsage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const getCategoryBadgeColor = (category: string) => {
        switch (category) {
            case 'Faceless Short':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'Series Video':
                return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            default:
                return 'bg-primary/10 text-primary border-primary/20';
        }
    };

    return (
        <DashboardLayout>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    Credits & Usage
                </h1>
                <p className="text-muted-foreground">
                    Monitor your subscription consumption and view detailed transaction history.
                </p>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

                {/* Current Plan Card */}
                <div className="rounded-2xl border border-border/50 bg-card p-6 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Gem className="w-24 h-24 text-primary" />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Current Plan</span>
                            <span className="px-2 py-1 rounded text-[10px] font-bold bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-wide">
                                Active
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-1">Master Plan</h2>
                        <p className="text-sm text-muted-foreground">$49/month • Billed Annually</p>
                    </div>

                    <div className="mt-8">
                        <Button variant="outline" className="w-full justify-between group-hover:border-primary/50 transition-colors">
                            Manage Subscription
                            <ArrowUpRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Available Balance Card */}
                <div className="rounded-2xl border border-border/50 bg-card p-6 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <Zap className="w-5 h-5 text-purple-500" />
                    </div>

                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-4">Available Balance</span>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-4xl font-bold text-foreground">4,250</span>
                            <span className="text-lg text-muted-foreground">/ 5,000</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 rounded-full bg-secondary mb-2 overflow-hidden">
                            <div className="h-full bg-purple-500 w-[85%] rounded-full relative">
                                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/20"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>85% Remaining</span>
                            <span>Resets Nov 1st</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/20">
                            + Buy More Credits
                        </Button>
                    </div>
                </div>

                {/* Cycle Reset Card */}
                <div className="rounded-2xl border border-border/50 bg-card p-6 flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-4">Cycle Reset</span>

                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                                <Calendar className="w-6 h-6 text-foreground" />
                            </div>
                            <div>
                                <span className="text-3xl font-bold text-foreground block">12 Days</span>
                                <span className="text-sm text-muted-foreground">until monthly refill</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10 text-xs text-muted-foreground">
                            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p>Unused credits do not roll over. <span className="text-primary cursor-pointer hover:underline">Learn more</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History Section */}
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <History className="w-4 h-4 text-primary" />
                        </div>
                        <h2 className="text-lg font-semibold text-foreground">Transaction History</h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative hidden sm:block">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                className="h-9 pl-9 pr-4 rounded-md border border-input bg-transparent text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="w-4 h-4" />
                            Export CSV
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="w-4 h-4" />
                            All Categories
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-medium">
                                <tr>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Project Name</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Project ID</th>
                                    <th className="px-6 py-4 text-right">Credits Used</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {transactions.map((qt) => (
                                    <tr key={qt.id} className="group hover:bg-muted/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground">{qt.date}</span>
                                                <span className="text-xs text-muted-foreground">{qt.time}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {/* Icon placeholder based on category */}
                                                <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center
                                                    ${qt.category.includes('Short') ? 'bg-orange-500/10 text-orange-500' :
                                                        qt.category.includes('Series') ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'}
                                                `}>
                                                    {qt.category.includes('Short') ? <Zap className="w-4 h-4" /> :
                                                        qt.category.includes('Series') ? <Activity className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                                                </div>
                                                <span className="font-medium text-foreground">{qt.projectName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryBadgeColor(qt.category)}`}>
                                                {qt.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                                            {qt.id}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-purple-500/10 text-purple-500 font-medium text-xs">
                                                {qt.credits}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground bg-muted/20">
                        <span>Showing 6 of 128 transactions</span>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8 disabled:opacity-50" disabled>
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 hover:bg-primary hover:text-primary-foreground hover:border-primary">
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CreditsAndUsage;
