"use client";
import React, { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function NetworkMap() {
  const { opportunities, interviews, fetchOpportunities, fetchInterviews } = useAppStore();

  useEffect(() => {
    fetchOpportunities();
    fetchInterviews();
  }, [fetchOpportunities, fetchInterviews]);

  // Derived clusters: Group opportunities by company
  const uniqueCompanies = Array.from(new Set(opportunities.map(o => o.company_name))).slice(0, 5);
  
  // High-value targets: Interviews or high-priority opportunities
  const highValueTargets = interviews.length > 0 
    ? interviews.map(i => ({ 
        name: i.interviewer_name || "Technical Lead", 
        role: `${i.job_title} @ ${i.company_name}`,
        company: i.company_name,
        prob: 85,
        degree: '1st'
      }))
    : opportunities.filter(o => o.priority === 'high').map(o => ({
        name: "Hiring Manager",
        role: `${o.title} @ ${o.company_name}`,
        company: o.company_name,
        prob: 70,
        degree: '2nd'
      })).slice(0, 3);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Central Map View */}
      <section className="flex-1 relative bg-surface-container-lowest overflow-hidden">
        {/* Grid Background Overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
        ></div>
        
        {/* Connection Map Visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Central Node (User) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-4 h-4 bg-white rounded-full node-pulse ring-8 ring-white/5 animate-[pulse_3s_ease-in-out_infinite]"></div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface-container-high px-2 py-1 rounded text-[10px] font-bold border border-white/10 uppercase tracking-widest text-white">You</div>
            </div>
            
            {/* Dynamic Company Clusters */}
            {uniqueCompanies.map((company, idx) => {
              const angle = (idx / uniqueCompanies.length) * 2 * Math.PI;
              const radius = 30; // % of screen
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              
              return (
                <div 
                  key={company}
                  className="absolute transition-all duration-1000 ease-out"
                  style={{ top: `${y}%`, left: `${x}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className="w-20 h-20 border border-tertiary/20 rounded-full flex flex-col items-center justify-center obsidian-glass relative group hover:border-tertiary/60 cursor-pointer">
                    <span className="text-tertiary text-[10px] font-black uppercase text-center px-2">{company}</span>
                    <span className="text-[8px] text-secondary font-bold uppercase tracking-widest mt-1">
                      {opportunities.filter(o => o.company_name === company).length} Roles
                    </span>
                    
                    {/* Connection Line to Center */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0">
                      <line 
                        opacity="0.1" 
                        stroke="white" 
                        strokeDasharray="4" 
                        strokeWidth="0.5" 
                        x1="50%" 
                        y1="50%" 
                        x2={`${(50 - x) * 10}%`} 
                        y2={`${(50 - y) * 10}%`}
                        className="group-hover:opacity-40 transition-opacity"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}

            {uniqueCompanies.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                 <p className="font-black uppercase tracking-widest text-sm">Waiting for Intel Inflow...</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Map Controls Overlay */}
        <div className="absolute bottom-8 left-8 flex space-x-2">
          <div className="bg-surface-container obsidian-glass p-1 rounded-lg flex border border-outline-variant/10">
            <button className="p-2 hover:bg-surface-bright rounded transition-colors text-on-surface-variant hover:text-white"><span className="material-symbols-outlined text-sm">add</span></button>
            <button className="p-2 hover:bg-surface-bright rounded transition-colors text-on-surface-variant hover:text-white"><span className="material-symbols-outlined text-sm">remove</span></button>
            <div className="w-px bg-outline-variant/20 mx-1"></div>
            <button className="p-2 hover:bg-surface-bright rounded transition-colors text-on-surface-variant hover:text-white"><span className="material-symbols-outlined text-sm">filter_center_focus</span></button>
          </div>
          <div className="bg-surface-container obsidian-glass px-3 py-2 rounded-lg flex items-center space-x-3 border border-outline-variant/10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Layer:</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary">Opportunity Cluster</span>
          </div>
        </div>
      </section>

      {/* Sidebar: High-Value Referral Targets */}
      <aside className="w-96 bg-surface-container-low flex flex-col border-l border-outline-variant/20 h-[calc(100vh-4rem)]">
        <div className="p-6 border-b border-outline-variant/10">
          <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-tertiary text-lg">target</span>
            High-Value Referral Targets
          </h2>
          <p className="text-xs text-outline mt-1 font-body">Identified AI-intent connections at target firms.</p>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
          {highValueTargets.length === 0 && (
            <div className="py-20 text-center opacity-30">
               <span className="material-symbols-outlined text-4xl mb-2">person_search</span>
               <p className="text-[10px] uppercase font-bold tracking-widest px-8">Establish active opportunities to map connection paths.</p>
            </div>
          )}
          {highValueTargets.map((target, idx) => (
            <div key={idx} className="group bg-surface-container rounded-lg p-4 border border-transparent hover:border-tertiary/20 hover:bg-surface-bright transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center border border-outline-variant/20">
                       <span className="material-symbols-outlined text-secondary">person</span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 px-1 rounded text-[8px] font-black uppercase ${target.degree === '1st' ? 'bg-tertiary text-black' : 'bg-outline-variant text-white'}`}>
                      {target.degree}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-none">{target.name}</h3>
                    <p className="text-[10px] text-outline mt-1 font-medium">{target.role}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center space-x-1 px-2 py-1 bg-tertiary/10 rounded-full">
                    <span className="material-symbols-outlined text-[10px] text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                    <span className="text-[10px] font-bold text-tertiary">{target.prob}%</span>
                  </div>
                  <span className="text-[8px] text-outline mt-1 uppercase tracking-tighter">Success Prob.</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] text-on-surface-variant font-medium">Path established via AI Intelligence</span>
              </div>
              <button 
                onClick={() => window.location.href = `/company`}
                className="w-full py-2 bg-white text-on-primary-container text-[11px] font-black uppercase tracking-widest rounded-md hover:bg-tertiary transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-lg"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                Generate Request
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar Footer Intel */}
        <div className="p-6 bg-surface-container-lowest border-t border-outline-variant/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline">Network Coverage</span>
            <span className="text-[10px] font-bold text-tertiary">
              {uniqueCompanies.length > 0 ? 'Syncing Targets' : 'Optimal'}
            </span>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
            <div 
              className="bg-tertiary h-full transition-all duration-1000" 
              style={{ width: `${Math.min(uniqueCompanies.length * 20, 100)}%` }}
            ></div>
          </div>
        </div>
      </aside>
    </div>
  );
}
