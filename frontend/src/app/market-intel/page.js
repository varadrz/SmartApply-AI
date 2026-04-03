"use client";
import React from 'react';

export default function MarketIntel() {
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
               <span className="w-1.5 h-1.5 bg-tertiary rounded-full animate-pulse"></span>
               Live Data Sync
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          
          {/* Top Row: Compensation Insights */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl border border-outline-variant/10 p-8">
             <div className="flex justify-between items-start mb-8">
                <div>
                   <h3 className="text-white font-bold uppercase tracking-widest text-xs">Compensation Trend</h3>
                   <p className="text-secondary text-[10px] uppercase font-bold mt-1">Senior/Staff Backend Infrastructure in SF/NYC</p>
                </div>
                <div className="bg-surface-container-high px-2 py-1 rounded">
                   <select className="bg-transparent text-white text-[10px] font-bold uppercase tracking-widest outline-none border-none">
                      <span className="material-symbols-outlined text-[10px]">expand_more</span>
                      <option>Last 6 Months</option>
                      <option>Last Year</option>
                   </select>
                </div>
             </div>
             
             {/* Chart representation */}
             <div className="h-48 relative flex items-end justify-between px-2">
                {[240, 245, 240, 255, 260, 275].map((val, i) => (
                   <div key={i} className="w-1/6 flex justify-center group relative">
                      <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded font-mono">${val}k</div>
                      <div 
                         className={`w-4/5 rounded-t-sm transition-all duration-500 ${i === 5 ? 'bg-tertiary' : 'bg-surface-container-high group-hover:bg-outline-variant/50'}`} 
                         style={{height: `${(val / 300) * 100}%`}}
                      ></div>
                   </div>
                ))}
             </div>
             <div className="flex justify-between text-[10px] text-outline font-bold uppercase tracking-widest mt-4">
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span className="text-tertiary">Oct</span>
             </div>
             
             <div className="mt-8 pt-6 border-t border-outline-variant/10 grid grid-cols-3 gap-6">
                <div>
                   <p className="text-[10px] uppercase text-outline font-bold tracking-widest mb-1">Base Avg (Current)</p>
                   <p className="text-2xl font-black text-white">$275,000</p>
                </div>
                <div>
                   <p className="text-[10px] uppercase text-outline font-bold tracking-widest mb-1">Equity Avg (4yr)</p>
                   <p className="text-2xl font-black text-white">$650,000</p>
                </div>
                <div>
                   <p className="text-[10px] uppercase text-outline font-bold tracking-widest mb-1">Market Temperature</p>
                   <div className="flex items-center gap-2 mt-1">
                      <span className="material-symbols-outlined text-tertiary text-xl" style={{fontVariationSettings: "'FILL' 1"}}>whatshot</span>
                      <span className="text-sm font-bold text-tertiary uppercase tracking-widest">Highly Liquid</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Top Row: Trending Stacks */}
          <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-xl border border-outline-variant/10 p-8">
             <div className="flex justify-between items-start mb-6">
                <h3 className="text-white font-bold uppercase tracking-widest text-xs">High-Velocity Tech</h3>
                <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
             </div>
             <p className="text-[10px] text-secondary font-medium leading-relaxed mb-6 border-b border-outline-variant/10 pb-4">
                Keywords experiencing the highest week-over-week mention increase in Senior target roles.
             </p>
             
             <div className="space-y-4">
                <div className="flex items-center justify-between group">
                   <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-white uppercase tracking-wider">Golang</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] text-tertiary font-bold">+14%</span>
                     <div className="w-16 h-1 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary w-full"></div>
                     </div>
                   </div>
                </div>
                
                <div className="flex items-center justify-between group">
                   <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-white uppercase tracking-wider">Rust</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] text-tertiary font-bold">+11%</span>
                     <div className="w-16 h-1 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary w-[80%]"></div>
                     </div>
                   </div>
                </div>

                <div className="flex items-center justify-between group">
                   <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-white uppercase tracking-wider">LangChain</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] text-tertiary font-bold">+9%</span>
                     <div className="w-16 h-1 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary w-[65%]"></div>
                     </div>
                   </div>
                </div>

                <div className="flex items-center justify-between group opacity-60">
                   <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-white uppercase tracking-wider">GraphQL</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] text-error font-bold">-4%</span>
                     <div className="w-16 h-1 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-error w-[30%]"></div>
                     </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Bottom Row: Startup vs Big Tech Hiring Index */}
          <div className="col-span-12 bg-surface-container-low rounded-xl border border-outline-variant/10 p-8 relative overflow-hidden">
             
             <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-surface-container to-transparent pointer-events-none"></div>
             
             <div className="flex justify-between items-center mb-8 relative z-10 w-2/3">
                <h3 className="text-white font-bold uppercase tracking-widest text-xs">Sector Hiring Liquidity Index</h3>
                <div className="flex gap-4">
                   <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-outline">
                      <span className="w-2 h-2 bg-[#ffb4ab]"></span> Enterprise / Big Tech
                   </div>
                   <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-outline">
                      <span className="w-2 h-2 bg-white"></span> Tier 1 Startups (Series A-C)
                   </div>
                </div>
             </div>

             <div className="h-[2px] w-full bg-surface-container-highest relative my-12">
                {/* Horizontal timeline representation */}
                <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                <div className="absolute left-[50%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                <div className="absolute left-[80%] top-1/2 -translate-y-1/2 w-4 h-4 bg-tertiary border-2 border-surface-container-low rounded-full shadow-[0_0_12px_rgba(98,255,150,0.5)] z-10"></div>
                
                {/* Enterprise nodes (trending down/plateau) */}
                <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ffb4ab]/50 rounded-full"></div>
                <div className="absolute left-[65%] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ffb4ab]/50 rounded-full"></div>
             </div>

             <div className="grid grid-cols-3 gap-8 relative z-10">
                <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/5">
                   <p className="text-[10px] text-outline font-bold uppercase tracking-widest mb-1">Time to Hire Avg (Startups)</p>
                   <p className="text-xl font-bold text-white">18 Days <span className="text-tertiary text-xs">↓ -4</span></p>
                </div>
                <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/5">
                   <p className="text-[10px] text-outline font-bold uppercase tracking-widest mb-1">Time to Hire Avg (Enterprise)</p>
                   <p className="text-xl font-bold text-white">42 Days <span className="text-error text-xs">↑ +3</span></p>
                </div>
                <div className="p-6">
                   <p className="text-xs text-secondary leading-relaxed border-l-2 border-tertiary/50 pl-4 py-1">
                      <strong className="text-white">Analysis:</strong> AI-first startups are bypassing standard recruiter screens in favor of direct technical assessments. Expect faster, highly-dense interview loops.
                   </p>
                </div>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
}
