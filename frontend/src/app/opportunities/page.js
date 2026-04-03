"use client";
import React, { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function Opportunities() {
  const { opportunities, oppLoading, fetchOpportunities, runScan } = useAppStore();
  const [filter, setFilter] = React.useState('All Sources');

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  const filteredOpps = filter === 'All Sources' 
    ? opportunities 
    : opportunities.filter(o => o.source?.toLowerCase().includes(filter.toLowerCase()));

  const highPriorityCount = opportunities.filter(o => o.priority === 'high' || (o.priority_score && o.priority_score > 80)).length;

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pt-8">
      <div className="p-8 pb-32 max-w-[1400px] mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter text-white mb-2 font-headline">Opportunity Scout</h1>
            <p className="text-secondary font-body max-w-xl">Synchronized tracking across global job boards, hackathons, and internship portals.</p>
          </div>
          <button 
            onClick={() => runScan()}
            disabled={oppLoading}
            className="group relative flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-tertiary transition-all active:scale-95 disabled:opacity-50"
          >
            {oppLoading ? (
              <span className="animate-spin material-symbols-outlined">sync</span>
            ) : (
              <span className="material-symbols-outlined">radar</span>
            )}
            <span>{oppLoading ? "Scanning Network..." : "Start Deep Scan"}</span>
          </button>
        </div>

        {/* Filters & Stats */}
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-8 flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {['All Sources', 'LinkedIn', 'Devfolio', 'Unstop', 'Internshala', 'Direct Hire'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full border transition-all whitespace-nowrap text-[10px] font-bold uppercase tracking-widest ${filter === cat ? 'bg-white text-black border-white' : 'border-outline-variant/20 text-outline hover:text-white hover:border-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="col-span-12 lg:col-span-4 flex justify-end gap-8">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Priority Matches</p>
              <p className="text-2xl font-black text-tertiary">
                {highPriorityCount}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Total Discovered</p>
              <p className="text-2xl font-black text-white">{opportunities.length}</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        {oppLoading && opportunities.length === 0 ? (
          <div className="h-96 flex flex-col items-center justify-center gap-6 opacity-40">
             <div className="w-16 h-16 border-4 border-tertiary/20 border-t-tertiary rounded-full animate-spin"></div>
             <p className="font-bold uppercase tracking-[0.2em] text-xs">Initializing Global Crawler</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOpps.map((opp, idx) => (
              <div 
                key={opp.id || idx} 
                className="group bg-surface-container-low border border-outline-variant/10 rounded-2xl p-8 hover:bg-surface-bright transition-all duration-500 hover:shadow-2xl hover:shadow-black/50 relative overflow-hidden"
              >
                {(opp.priority === 'high' || (opp.priority_score && opp.priority_score > 80)) && (
                  <div className="absolute top-0 right-0 px-4 py-1 bg-tertiary text-black text-[10px] font-black uppercase tracking-widest rounded-bl-xl z-10 shadow-lg">
                    High Match
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center border border-outline-variant/20 text-tertiary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">
                      {opp.source === 'LinkedIn' ? 'work' : 'terminal'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Source</p>
                    <p className="text-xs font-bold text-white uppercase">{opp.source || 'Scanned'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold tracking-tight text-white leading-tight group-hover:text-tertiary transition-colors">{opp.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-outline">business</span>
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">{opp.company_name}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-outline-variant/5">
                    <p className="text-sm text-secondary leading-relaxed line-clamp-3 italic">
                      {opp.description || "Automated systems are currently extracting mission-critical requirements and key technology stacks for this opening."}
                    </p>
                  </div>

                  <div className="pt-6 flex flex-wrap gap-2">
                    {(opp.tags || ['Remote', 'Full-time']).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-surface-container text-[9px] font-bold uppercase tracking-widest text-outline border border-outline-variant/10">
                        {tag}
                      </span>
                    ))}
                    {opp.priority_score && (
                      <span className="px-2 py-1 bg-tertiary/10 text-[9px] font-bold uppercase tracking-widest text-tertiary border border-tertiary/20">
                        {opp.priority_score}% Match
                      </span>
                    )}
                  </div>

                  <div className="pt-8 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full border border-black bg-tertiary/20 flex items-center justify-center text-[8px] font-bold">
                        {opp.priority_score ? 'AI' : '??'}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          const params = new URLSearchParams();
                          params.append('url', opp.url);
                          window.location.href = `/company?url=${encodeURIComponent(opp.url)}`;
                        }}
                        className="p-3 bg-surface-container border border-outline-variant/10 rounded-xl text-outline hover:text-white hover:border-white transition-all"
                        title="Analyze now"
                      >
                        <span className="material-symbols-outlined text-xl">psychology</span>
                      </button>
                      <button 
                        onClick={() => opp.url && window.open(opp.url, '_blank')}
                        className="p-3 bg-white text-black rounded-xl hover:bg-tertiary transition-all active:scale-95 shadow-lg shadow-white/5"
                      >
                        <span className="material-symbols-outlined text-xl">open_in_new</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredOpps.length === 0 && !oppLoading && (
              <div className="col-span-full py-32 text-center flex flex-col items-center gap-6 opacity-40">
                <span className="material-symbols-outlined text-6xl">search_off</span>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold uppercase tracking-widest">No Intelligence Cached</h3>
                  <p className="text-sm">Initiate "Deep Scan" to synchronize with global job boards.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
