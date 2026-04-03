"use client";
import React, { useEffect } from 'react';
import { useOutreachStore } from '@/store/useOutreachStore';
import { useAppStore } from '@/store/useAppStore';

export default function Dashboard() {
  const { companies, fetchCompanies } = useOutreachStore();
  const { opportunities, fetchOpportunities, analytics, fetchAnalytics } = useAppStore();

  useEffect(() => {
    fetchCompanies();
    fetchOpportunities();
    fetchAnalytics();
  }, [fetchCompanies, fetchOpportunities, fetchAnalytics]);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pt-8">
      <div className="p-8">
        {/* Bento Grid Hero Section */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* Outreach Funnel */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="font-headline text-3xl font-extrabold tracking-tighter mb-8 text-white">Outreach Intelligence</h2>
              <div className="flex items-end gap-12">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-2">Total Tracked</p>
                  <p className="text-5xl font-headline font-black text-white">{analytics.total_tracked || companies.length}</p>
                </div>
                <div className="flex-1 max-w-xs h-16 flex items-end gap-1 mb-1">
                  <div className="w-2 bg-outline-variant/20 h-1/3"></div>
                  <div className="w-2 bg-outline-variant/20 h-2/3"></div>
                  <div className="w-2 bg-outline-variant/20 h-1/2"></div>
                  <div className="w-2 bg-tertiary h-full"></div>
                  <div className="w-2 bg-tertiary h-4/5"></div>
                  <div className="w-2 bg-tertiary h-5/6"></div>
                  <div className="w-2 bg-outline-variant/20 h-2/3"></div>
                  <div className="w-2 bg-outline-variant/20 h-1/3"></div>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-tertiary mb-2">Opportunities</p>
                  <p className="text-5xl font-headline font-black text-white">{opportunities.length}</p>
                  <p className="text-[10px] text-tertiary mt-1 font-bold">Scanning active</p>
                </div>
              </div>
            </div>
            {/* Aesthetic background pattern */}
            <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <span className="material-symbols-outlined text-[300px]" style={{fontVariationSettings: "'FILL' 1"}}>insights</span>
            </div>
          </div>

          {/* Avg. Selection Probability */}
          <div className="col-span-12 lg:col-span-4 bg-surface-container p-8 rounded-xl flex flex-col justify-between border border-outline-variant/10">
            <div className="flex justify-between items-start">
              <p className="font-label text-[10px] uppercase tracking-widest text-outline">Skill Selection Match</p>
              <span className="material-symbols-outlined text-tertiary">bolt</span>
            </div>
            <div className="my-6">
              <p className="text-7xl font-headline font-black text-white">{analytics.match_rate || 0}<span className="text-3xl text-tertiary">%</span></p>
              <div className="mt-4 h-1 w-full bg-outline-variant/20 rounded-full overflow-hidden">
                <div className="h-full bg-tertiary transition-all duration-1000" style={{width: `${analytics.match_rate || 0}%`}}></div>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
            Match probability is <span className="text-white font-bold">trending up</span> based on your recent skill set update in the SmartApply AI Core.
            </p>
          </div>
        </div>

        {/* Dashboard Split Layout */}
        <div className="grid grid-cols-12 gap-8 mb-16">
          {/* Outreach Timeline (Left Column) */}
          <div className="col-span-12 xl:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline text-xl font-bold tracking-tight text-white">Outreach Timeline</h3>
              <a href="/company" className="text-xs font-label uppercase tracking-widest text-tertiary flex items-center gap-1 active:scale-95 transition-transform">
                  View Full Queue <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            <div className="space-y-4">
              {companies.slice(0, 3).map((company, idx) => (
                <div key={company.id || idx} className="bg-surface-container-low hover:bg-surface-bright transition-all duration-200 p-6 rounded-xl border border-outline-variant/5 flex items-center gap-6 group cursor-pointer" onClick={() => window.location.href = `/company/${company.id}`}>
                  <div className="w-12 h-12 flex items-center justify-center bg-surface-container rounded-lg border border-outline-variant/20 group-hover:border-tertiary/30 transition-colors">
                    <span className="material-symbols-outlined text-tertiary">
                      {company.status === 'sent' ? 'check_circle' : company.status === 'replied' ? 'forum' : 'mail'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-outline mb-1">{company.status || 'Discovered'}</p>
                    <h4 className="font-bold text-white">{company.company_name}</h4>
                    <p className="text-sm text-on-surface-variant mt-1 italic truncate max-w-md">
                      {company.analysis_summary || "Target identified for outreach."}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">Active</p>
                    <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">
                       {company.match_score ? `${company.match_score}% Match` : "Scoring..."}
                    </p>
                  </div>
                </div>
              ))}
              {companies.length === 0 && (
                <div className="p-12 text-center border border-dashed border-outline-variant/20 rounded-xl opacity-50">
                   <p className="text-sm">No outreach activity yet. Use Opportunity Scout to begin.</p>
                </div>
              )}
            </div>

            {/* Probability Trend Chart */}
            <div className="mt-12 p-8 bg-surface-container-low rounded-xl border border-outline-variant/10">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h4 className="font-headline text-lg font-bold text-white">Skill Matching Evolution</h4>
                  <p className="text-xs text-on-surface-variant">Improving accuracy based on feedback loops</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                  <span className="text-[10px] uppercase font-label text-outline">Match Prob.</span>
                </div>
              </div>
              
              <div className="h-48 w-full flex items-end gap-4 px-2">
                {(analytics.trend || []).map((t, i) => (
                  <div key={i} className="flex-1 bg-tertiary rounded-t relative group transition-all hover:opacity-80" style={{height: `${t.value}%`, opacity: i === (analytics.trend.length - 1) ? 1 : 0.4}}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold hidden group-hover:block text-white">{t.value}%</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 px-2">
                {(analytics.trend || []).map((t, i) => (
                  <span key={i} className="text-[9px] uppercase font-label text-outline tracking-widest">{t.date}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Opportunity Quick View (Right Column) */}
          <div className="col-span-12 xl:col-span-4">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-lg">local_fire_department</span>
                <h3 className="font-headline text-xl font-bold tracking-tight text-white">Hot Opportunities</h3>
              </div>
              <a href="/opportunities" className="text-[10px] font-bold text-outline uppercase hover:text-white transition-colors">View All</a>
            </div>
            
            <div className="space-y-4">
              {opportunities.slice(0, 3).map((opp, idx) => (
                <div key={opp.id || idx} className="bg-surface-container p-5 rounded-xl border border-outline-variant/10 hover:border-tertiary/20 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-tertiary/10 text-tertiary text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest">{opp.priority_score || 85}% Match</div>
                    <span className="material-symbols-outlined text-outline text-sm cursor-pointer hover:text-white transition-colors">bookmark</span>
                  </div>
                  <h5 className="font-bold text-white text-lg">{opp.title}</h5>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{opp.company_name}</p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] text-outline uppercase tracking-widest">Deadline</p>
                      <p className="text-xs font-bold text-white">{opp.deadline || 'Ongoing'}</p>
                    </div>
                    <button onClick={() => window.open(opp.url, '_blank')} className="bg-white hover:bg-secondary text-black w-10 h-10 flex items-center justify-center rounded-lg transition-colors active:scale-95">
                      <span className="material-symbols-outlined text-xl">open_in_new</span>
                    </button>
                  </div>
                </div>
              ))}

              {opportunities.length === 0 && (
                <div className="p-8 text-center border border-dashed border-outline-variant/20 rounded-xl opacity-50">
                  <p className="text-xs">No hot opportunities found. Run a scan in Opportunity Scout.</p>
                </div>
              )}

              {/* Mini Stats Footer */}
              <div className="mt-8 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-widest">Total Active</p>
                    <p className="text-3xl font-headline font-black text-white">{opportunities.length}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-outline uppercase tracking-widest">Success Rate</p>
                    <p className="text-xs font-bold text-tertiary">{Math.round((analytics.replied / (analytics.total_sent || 1)) * 100)}% Conversion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Home FAB context action */}
      <button onClick={() => window.location.href = '/company'} className="fixed bottom-8 right-8 w-14 h-14 bg-tertiary rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.3)] flex items-center justify-center text-on-tertiary-container hover:scale-95 transition-transform z-50 focus:outline-none">
        <span className="material-symbols-outlined font-bold text-3xl">add</span>
      </button>
    </div>
  );
}
