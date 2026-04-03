"use client";
import React, { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function MarketIntel() {
  const { marketTrends, techVelocity, marketLoading, fetchMarketIntel } = useAppStore();

  useEffect(() => {
    fetchMarketIntel();
  }, [fetchMarketIntel]);

  const latestSalary = marketTrends.length > 0 ? marketTrends[marketTrends.length - 1].average_salary : 0;
  const maxSalary = Math.max(...marketTrends.map(t => t.average_salary), 300000);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pt-8">
      <div className="p-8 pb-32 max-w-[1400px] mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter text-white mb-2 font-headline">Market Intelligence</h1>
            <p className="text-secondary font-body">Macro-level hiring trends, compensation bands, and high-demand skill extraction.</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-tertiary/10 text-tertiary px-3 py-1.5 font-bold uppercase tracking-widest text-[10px] rounded border border-tertiary/20 flex items-center gap-2">
               <span className={`w-1.5 h-1.5 bg-tertiary rounded-full ${marketLoading ? 'animate-pulse' : ''}`}></span>
               {marketLoading ? 'Syncing...' : 'Live Data Sync'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          
          {/* Top Row: Compensation Insights */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl border border-outline-variant/10 p-8">
             <div className="flex justify-between items-start mb-8">
                <div>
                   <h3 className="text-white font-bold uppercase tracking-widest text-xs">Compensation Trend</h3>
                   <p className="text-secondary text-[10px] uppercase font-bold mt-1">Trend Analysis: {marketTrends[0]?.role_category || 'Global Markets'}</p>
                </div>
                <div className="bg-surface-container-high px-3 py-1.5 rounded flex items-center gap-2">
                   <span className="text-white text-[10px] font-bold uppercase tracking-widest">Postgres Sync</span>
                   <span className="material-symbols-outlined text-[10px] text-tertiary">check_circle</span>
                </div>
             </div>
             
             {/* Chart representation */}
             <div className="h-48 relative flex items-end justify-between px-2 gap-2">
                {marketTrends.length === 0 && !marketLoading && (
                   <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <p className="text-[10px] font-bold uppercase tracking-widest">No Trend Data Logged</p>
                   </div>
                )}
                {marketTrends.map((trend, i) => (
                   <div key={i} className="flex-1 flex justify-center group relative">
                      <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded font-mono border border-outline-variant/10 z-10 whitespace-nowrap">
                        ${trend.average_salary.toLocaleString()}
                      </div>
                      <div 
                         className={`w-full rounded-t-lg transition-all duration-700 ${i === (marketTrends.length - 1) ? 'bg-tertiary' : 'bg-surface-container-high group-hover:bg-outline-variant/50'}`} 
                         style={{height: `${(trend.average_salary / maxSalary) * 100}%`}}
                      ></div>
                   </div>
                ))}
             </div>
             <div className="flex justify-between text-[9px] text-outline font-black uppercase tracking-tighter mt-6 px-1">
                {marketTrends.map((trend, i) => (
                   <span key={i} className={i === (marketTrends.length - 1) ? 'text-tertiary' : ''}>{trend.month}</span>
                ))}
             </div>
             
             <div className="mt-8 pt-8 border-t border-outline-variant/10 grid grid-cols-3 gap-6">
                <div>
                   <p className="text-[10px] uppercase text-outline font-bold tracking-widest mb-1">Average Base</p>
                   <p className="text-2xl font-black text-white">${latestSalary.toLocaleString()}</p>
                </div>
                <div>
                   <p className="text-[10px] uppercase text-outline font-bold tracking-widest mb-1">Growth Index</p>
                   <p className="text-2xl font-black text-white">+{marketTrends.length > 1 ? Math.round(((latestSalary - marketTrends[0].average_salary) / marketTrends[0].average_salary) * 100) : 0}%</p>
                </div>
                <div>
                   <p className="text-[10px] uppercase text-outline font-bold tracking-widest mb-1">Market Volatility</p>
                   <div className="flex items-center gap-2 mt-1">
                      <span className="material-symbols-outlined text-tertiary text-xl" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                      <span className="text-xs font-bold text-tertiary uppercase tracking-widest">Optimized</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Top Row: Trending Stacks */}
          <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-xl border border-outline-variant/10 p-8">
             <div className="flex justify-between items-start mb-6">
                <h3 className="text-white font-bold uppercase tracking-widest text-xs">High-Velocity Tech</h3>
                <span className="material-symbols-outlined text-tertiary text-sm">bolt</span>
             </div>
             <p className="text-[10px] text-secondary font-bold leading-relaxed mb-6 border-b border-outline-variant/10 pb-4 uppercase tracking-tighter italic">
                Keywords experiencing the highest velocity in active target roles.
             </p>
             
             <div className="space-y-5">
                {techVelocity.map((tech, idx) => (
                  <div key={idx} className="flex flex-col gap-2 group">
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-black text-white uppercase tracking-wider">{tech.keyword}</span>
                       <span className={`text-[10px] font-bold ${tech.growth_percentage > 0 ? 'text-tertiary' : 'text-error'}`}>
                         {tech.growth_percentage > 0 ? '+' : ''}{tech.growth_percentage}%
                       </span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                       <div 
                         className={`h-full transition-all duration-1000 ${tech.growth_percentage > 0 ? 'bg-tertiary' : 'bg-error'}`}
                         style={{width: `${Math.min(Math.abs(tech.growth_percentage) * 5, 100)}%`}}
                       ></div>
                    </div>
                  </div>
                ))}
                {techVelocity.length === 0 && !marketLoading && (
                   <div className="py-10 text-center opacity-20">
                      <p className="text-[10px] font-bold uppercase tracking-widest">Scanning Market...</p>
                   </div>
                )}
             </div>
          </div>

          {/* Bottom Row Indicator */}
          <div className="col-span-12 bg-surface-container-low rounded-xl border border-outline-variant/10 p-10 flex items-center justify-between relative overflow-hidden group">
             <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-tertiary/10 to-transparent pointer-events-none"></div>
             <div>
                <h3 className="text-3xl font-headline font-black text-white tracking-tighter mb-2 italic">Intelligence Overdrive</h3>
                <p className="text-secondary text-sm max-w-xl font-medium leading-relaxed">
                  Your profile has a <span className="text-tertiary font-bold">84% Match</span> with the high-velocity technologies identified above. The system recommends prioritizing TypeScript and distributed systems opportunities.
                </p>
             </div>
             <button onClick={() => window.location.href = '/skills'} className="bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-tertiary transition-all active:scale-95 shadow-xl relative z-10">
                Update Skills Profile
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
