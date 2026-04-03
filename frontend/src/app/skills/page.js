"use client";
import React, { useEffect, useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function SkillsProfile() {
  const { resumeAnalysis, portfolio, resLoading, portLoading, fetchPortfolio } = useAppStore();

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const aggregatedSkills = useMemo(() => {
    const skills = new Map();
    
    // 1. Add skills from Portfolio
    portfolio.forEach(project => {
      (project.tech_stack || []).forEach(tech => {
        const current = skills.get(tech) || { count: 0, level: 70, type: 'portfolio' };
        skills.set(tech, { ...current, count: current.count + 1, level: Math.min(95, current.level + 5) });
      });
    });

    // 2. Add skills from Resume Analysis
    if (resumeAnalysis?.analysis?.matching_skills) {
      resumeAnalysis.analysis.matching_skills.forEach(skill => {
        const name = typeof skill === 'string' ? skill : skill.name;
        const current = skills.get(name) || { count: 0, level: 85, type: 'resume' };
        skills.set(name, { ...current, level: 90, type: 'resume' });
      });
    }

    return Array.from(skills.entries()).map(([name, data]) => ({ name, ...data }));
  }, [portfolio, resumeAnalysis]);

  const sortedSkills = [...aggregatedSkills].sort((a, b) => b.level - a.level).slice(0, 8);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pt-8">
      <div className="p-8 pb-24 max-w-[1400px] mx-auto flex flex-col gap-8">
        
        {/* Hero Section / Sync Status */}
        <section className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-5xl font-extrabold tracking-tighter mb-4 text-white font-headline">Skill Architecture</h1>
            <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
                The neural core of your professional footprint. Obsidian AI continuously scrapes your connected repositories and portfolios to maintain a live delta of your competencies.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col items-end gap-4">
            <div className="bg-surface-container-low p-6 rounded-lg w-full flex flex-col gap-4 border border-outline-variant/10">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-secondary font-bold">Last Intel Sync</span>
                <span className="text-xs font-bold text-tertiary">Real-time</span>
              </div>
              <button 
                onClick={() => fetchPortfolio()}
                disabled={portLoading || resLoading}
                className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 font-bold uppercase tracking-widest text-[10px] rounded hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
              >
                <span className={`material-symbols-outlined text-sm ${portLoading ? 'animate-spin' : ''}`}>sync</span>
                {portLoading ? 'Syncing...' : 'Crawl GitHub/Portfolio'}
              </button>
            </div>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Active Skills Module */}
          <div className="col-span-12 lg:col-span-7 bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
            <div className="flex justify-between items-center mb-10">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold tracking-tight text-white font-headline">Active Skills</h2>
                <p className="text-xs text-secondary/60 uppercase tracking-widest mt-1">AI-Detected Proficiency Levels</p>
              </div>
              <span className="material-symbols-outlined text-tertiary text-2xl">insights</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {sortedSkills.length === 0 && (
                <div className="col-span-2 py-10 text-center opacity-20 border border-dashed border-outline-variant/20 rounded-lg">
                   <p className="text-xs uppercase font-black tracking-widest">No Skills Indexed Yet</p>
                   <p className="text-[10px] mt-2">Upload a resume or connect a portfolio to begin.</p>
                </div>
              )}
              {sortedSkills.map((skill, idx) => (
                <div key={idx} className="flex flex-col gap-3 group">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-lg text-white group-hover:text-tertiary transition-colors">{skill.name}</span>
                    <div className="bg-tertiary/15 px-2 py-0.5 rounded flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px] text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">{skill.level}% Match</span>
                    </div>
                  </div>
                  <div className="h-1 bg-surface-container-highest w-full rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-tertiary transition-all duration-1000" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[9px] text-secondary/70 uppercase font-bold tracking-widest">
                       Source: {skill.type === 'resume' ? 'Resume Analysis' : 'Portfolio Artifact'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Match Relevance Settings */}
          <div className="col-span-12 lg:col-span-5 bg-surface-container p-8 rounded-xl flex flex-col gap-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-tertiary/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-white font-headline">Relevance Logic</h2>
              <p className="text-xs text-on-surface-variant leading-relaxed">Configure how the AI prioritizes your incoming opportunities based on company profile and growth trajectory.</p>
            </div>
            
            <div className="space-y-6 mt-4 relative z-10">
              <div className="p-5 bg-surface-container-lowest rounded border border-outline-variant/10 hover:border-tertiary/30 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black tracking-widest text-tertiary">Active Priority</span>
                    <span className="text-sm font-bold text-white">Startup Agility (Series A-C)</span>
                  </div>
                  <div className="w-10 h-5 bg-tertiary rounded-full relative flex items-center px-1 border border-tertiary/50">
                    <div className="w-3 h-3 bg-black rounded-full ml-auto"></div>
                  </div>
                </div>
                <p className="text-[11px] text-secondary/70">Filters for engineering velocity, high equity upside, and zero legacy technical debt.</p>
              </div>

              <div className="p-5 bg-surface-container-lowest rounded border border-outline-variant/10 group-hover:bg-surface-container-high transition-all cursor-pointer opacity-60">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black tracking-widest text-secondary">Inactive</span>
                    <span className="text-sm font-bold text-white">Enterprise Stability</span>
                  </div>
                  <div className="w-10 h-5 bg-surface-container-high rounded-full relative flex items-center px-1 border border-outline-variant/20">
                    <div className="w-3 h-3 bg-outline rounded-full"></div>
                  </div>
                </div>
                <p className="text-[11px] text-secondary/70">Suppress all hybrid or location-bound opportunities regardless of salary match.</p>
              </div>
            </div>
            
            <button className="mt-auto relative z-10 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-secondary hover:text-white transition-colors py-2 border-t border-outline-variant/10 pt-6 group/btn">
                Advanced Filtering Parameters
                <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">tune</span>
            </button>
          </div>

          {/* Showcase Projects - Re-linked from Portfolio */}
          <div className="col-span-12 flex flex-col gap-6 mt-6">
            <div className="flex items-end justify-between px-2">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white font-headline">Linked Assets</h2>
                <p className="text-sm text-secondary/60">Verified architectural contributions powering your skill index</p>
              </div>
              <button 
                onClick={() => window.location.href = '/portfolio'}
                className="text-[10px] uppercase font-black tracking-widest px-6 py-2 border border-tertiary/40 hover:bg-tertiary hover:text-black transition-all rounded active:scale-95 text-tertiary"
              >
                Manage Vault
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portfolio.slice(0, 3).map((project, idx) => (
                <div key={project.id || idx} className="group bg-surface-container hover:bg-surface-bright p-6 rounded-lg transition-all duration-500 flex flex-col gap-4 border border-outline-variant/5 hover:border-tertiary/20">
                  <div className="relative aspect-video rounded overflow-hidden mb-2 bg-black/40 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-outline-variant group-hover:text-tertiary transition-colors">deployed_code</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-tertiary transition-colors font-headline">{project.title}</h3>
                  <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                      {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {(project.tech_stack || []).slice(0, 3).map(tech => (
                      <span key={tech} className="text-[8px] uppercase font-black tracking-tighter bg-surface-container-high px-2 py-1 border border-outline-variant/10 text-white rounded">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
              {portfolio.length === 0 && (
                <div className="col-span-3 py-20 text-center bg-surface-container-low rounded-xl border border-dashed border-outline-variant/10 opacity-30">
                   <span className="material-symbols-outlined text-4xl mb-2">folder_off</span>
                   <p className="text-xs uppercase font-bold tracking-widest">No Projects Linked</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contextual Footer Stats */}
        <footer className="mt-8 grid grid-cols-4 gap-4 border-t border-outline-variant/20 pt-8">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-secondary mb-1">Indexed Skills</span>
            <span className="text-2xl font-bold text-white">{aggregatedSkills.length}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-secondary mb-1">Market Match</span>
            <span className="text-2xl font-bold text-tertiary">84%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-secondary mb-1">Portfolio Depth</span>
            <span className="text-2xl font-bold text-white">{portfolio.length} Projects</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-secondary mb-1">Intel Delta</span>
            <span className="text-2xl font-bold text-white">+12%</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
