"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'react-hot-toast';

export default function Sidebar() {
  const pathname = usePathname();
  const { fetchOpportunities, fetchInterviews, fetchPortfolio, fetchMarketIntel, fetchAnalytics } = useAppStore();

  const handleGlobalSync = async () => {
    toast.promise(
      Promise.all([
        fetchOpportunities(),
        fetchInterviews(),
        fetchPortfolio(),
        fetchMarketIntel(),
        fetchAnalytics()
      ]),
      {
        loading: 'Synchronizing Intelligence...',
        success: 'Local context updated',
        error: 'Sync failed'
      }
    );
  };

  const linkGroups = [
    {
      title: "Core Strategy",
      links: [
        { name: 'Dashboard', path: '/', icon: 'dashboard' },
        { name: 'Opportunity Scout', path: '/opportunities', icon: 'explore' },
        { name: 'Target Analysis', path: '/company', icon: 'business' },
      ]
    },
    {
      title: "Execution",
      links: [
        { name: 'Resume Optimizer', path: '/resume', icon: 'document_scanner' },
        { name: 'Interviews', path: '/interviews', icon: 'record_voice_over' },
        { name: 'Calendar', path: '/calendar', icon: 'calendar_month' },
      ]
    },
    {
      title: "Intel & Assets",
      links: [
        { name: 'Network Map', path: '/network', icon: 'hub' },
        { name: 'Market Intel', path: '/market-intel', icon: 'query_stats' },
        { name: 'Portfolio Vault', path: '/portfolio', icon: 'folder_special' },
        { name: 'Skills Profile', path: '/skills', icon: 'psychology' },
        { name: 'Analytics', path: '/analytics', icon: 'leaderboard' },
      ]
    }
  ];

  return (
    <aside className="fixed left-0 top-0 flex flex-col h-screen py-6 bg-[#131313] text-white w-64 border-r border-[#474747]/20 z-50 overflow-y-auto no-scrollbar">
      <div className="px-6 mb-6">
        <h1 className="text-xl font-bold tracking-tighter text-white uppercase font-headline">SmartApply AI</h1>
        <p className="text-[10px] uppercase tracking-widest text-tertiary mt-1 font-label italic">Next-Gen Career Intelligence</p>
      </div>
      
      <div className="flex-1 px-4 pb-8">
        {linkGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-outline">{group.title}</h3>
            <nav className="space-y-0.5">
              {group.links.map((link) => {
                const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
                
                return (
                  <Link 
                    key={link.name} 
                    href={link.path} 
                    className={`flex items-center gap-3 px-3 py-2 transition-all duration-200 active:scale-95 rounded-lg ${
                      isActive 
                        ? 'text-tertiary font-bold border-r-2 border-tertiary bg-surface-container-high/30' 
                        : 'text-secondary hover:text-white hover:bg-surface-container-high relative overflow-hidden group'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
                    <span className="text-[11px] uppercase tracking-wider font-bold whitespace-nowrap">{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="px-6 mt-auto space-y-4 pt-4 border-t border-outline-variant/10 bg-[#131313]">
        <button 
          onClick={handleGlobalSync}
          className="w-full bg-white text-on-primary py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider active:scale-95 transition-transform shadow-lg shadow-white/5 hover:shadow-white/10"
        >
          Sync Global Data
        </button>
        <div className="pt-4 border-t border-outline-variant/10 space-y-1 flex flex-col">
          <Link href="/settings" className="flex items-center py-2 px-3 gap-3 text-secondary hover:text-white transition-colors rounded-lg hover:bg-surface-container-high">
            <span className="material-symbols-outlined text-[18px]">settings</span>
            <span className="text-[11px] uppercase tracking-wider font-bold">Settings</span>
          </Link>
          <button className="flex items-center py-2 px-3 gap-3 text-secondary hover:text-white transition-colors rounded-lg hover:bg-surface-container-high text-left">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="text-[11px] uppercase tracking-wider font-bold">Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
