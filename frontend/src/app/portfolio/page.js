"use client";
import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function Portfolio() {
  const { portfolio, portLoading, fetchPortfolio, analyzeRepo } = useAppStore();
  const [repoUrl, setRepoUrl] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const handleAdd = async () => {
    if (!repoUrl) return;
    await analyzeRepo(repoUrl);
    setRepoUrl('');
    setShowAdd(false);
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pt-8">
      <div className="p-8 pb-32 max-w-[1400px] mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter text-white mb-2 font-headline">Portfolio Vault</h1>
            <p className="text-secondary font-body">Deep-dive technical case studies curated for technical hiring managers.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowAdd(!showAdd)}
              className="bg-white text-black px-6 py-3 font-bold uppercase tracking-widest text-[10px] rounded-lg hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-white/5"
            >
              <span className="material-symbols-outlined text-sm">{showAdd ? 'close' : 'cloud_upload'}</span>
              {showAdd ? 'Cancel' : 'Add Case Study'}
            </button>
          </div>
        </div>

        {showAdd && (
          <div className="bg-surface-container p-6 rounded-xl border border-tertiary/20 animate-in fade-in slide-in-from-top-4 duration-300">
             <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Analyze New Repository</h3>
             <div className="flex gap-4">
                <input 
                  type="text" 
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="flex-1 bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-tertiary transition-colors"
                />
                <button 
                  onClick={handleAdd}
                  disabled={portLoading}
                  className="bg-tertiary text-black px-6 py-2 rounded-lg font-bold uppercase tracking-widest text-[10px] hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {portLoading ? 'Analyzing...' : 'Begin Analysis'}
                </button>
             </div>
          </div>
        )}

        {/* Vault Grid */}
        <div className="grid grid-cols-12 gap-8">
          
          {portLoading && portfolio.length === 0 ? (
            <div className="col-span-12 py-20 text-center opacity-20 animate-pulse">
               <span className="material-symbols-outlined text-6xl mb-4">database</span>
               <p className="font-black uppercase tracking-widest text-sm">Synchronizing Artifacts...</p>
            </div>
          ) : (
            <>
              {portfolio.map((project, idx) => (
                <div key={project.id || idx} className={`${idx === 0 ? 'col-span-12' : 'col-span-12 lg:col-span-4'} group`}>
                  <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden hover:border-tertiary/40 transition-all duration-500 h-full flex flex-col lg:flex-row">
                    {idx === 0 && (
                      <div className="lg:w-7/12 relative h-64 lg:h-auto overflow-hidden bg-black flex items-center justify-center border-r border-outline-variant/10">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 group-hover:scale-105"></div>
                        <span className="material-symbols-outlined text-white/50 text-6xl relative z-10 font-[100]">dns</span>
                      </div>
                    )}
                    <div className={`p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-l from-surface-container-low to-surface-container relative z-20 ${idx === 0 ? 'lg:w-5/12' : 'w-full'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-widest ${idx === 0 ? 'bg-tertiary text-black' : 'bg-surface-container-high text-white'}`}>
                          {idx === 0 ? 'Flagship' : 'Asset'}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-secondary flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">event</span> {new Date(project.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-headline text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-secondary text-sm mb-6 leading-relaxed flex-1">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {(project.tech_stack || []).map(tech => (
                          <span key={tech} className="text-[9px] uppercase font-black bg-surface-container-high border border-outline-variant/20 px-2 py-1 rounded text-white tracking-tighter">{tech}</span>
                        ))}
                      </div>
                      
                      <div className="flex gap-4 mt-auto">
                         <button className="flex-1 bg-white text-black py-2.5 rounded text-[10px] font-black uppercase tracking-widest hover:bg-tertiary transition-all text-center flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">description</span> Briefing
                         </button>
                         <button 
                          onClick={() => project.github_url && window.open(project.github_url, '_blank')}
                          className="w-12 h-10 flex items-center justify-center bg-surface-container border border-outline-variant/20 rounded hover:border-white transition-colors text-white"
                         >
                            <span className="material-symbols-outlined text-sm">code</span>
                         </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-span-12 lg:col-span-4">
                <div 
                  onClick={() => setShowAdd(true)}
                  className="bg-surface-container-low rounded-xl border border-outline-variant/10 border-dashed p-6 h-full flex flex-col items-center justify-center text-center hover:bg-surface-container transition-colors cursor-pointer opacity-70 hover:opacity-100 min-h-[300px]"
                >
                  <div className="w-16 h-16 rounded-full bg-surface-container-high border border-outline-variant/20 mb-4 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-secondary">add</span>
                  </div>
                  <h4 className="font-bold text-white text-[10px] mb-1 uppercase tracking-widest underline decoration-tertiary decoration-2 underline-offset-4">Compile New Project</h4>
                  <p className="text-[10px] font-bold text-secondary px-4 mt-2">Import repository from GitHub and generate AI case study summary automatically.</p>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
