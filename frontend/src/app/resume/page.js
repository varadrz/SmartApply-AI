"use client";
import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function ResumeOptimizer() {
  const [jdInput, setJdInput] = useState('https://careers.stripe.com/jobs/staff-infrastructure-engineer');
  const { analyzeResume, resumeAnalysis, resLoading } = useAppStore();

  const handleOptimize = async () => {
    if (!jdInput) return;
    await analyzeResume(jdInput);
  };

  const matchScore = resumeAnalysis?.match_score || 0;
  const analysis = resumeAnalysis?.analysis || {};

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      
      {/* Header Panel */}
      <div className="bg-surface-container-lowest border-b border-outline-variant/10 px-8 py-4 flex-shrink-0 flex justify-between items-center z-10 shadow-md">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white font-headline flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">document_scanner</span>
            Resume Optimizer
          </h1>
          <p className="text-[10px] uppercase font-bold tracking-widest text-outline mt-1">Live AI Tailoring against Target Job Descriptions</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-outline hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">history</span>
          </button>
          <div className="h-6 w-px bg-outline-variant/20"></div>
          <button className="bg-tertiary text-on-tertiary px-6 py-2 text-[10px] uppercase font-black tracking-widest rounded transition-all hover:opacity-90 active:scale-95 flex items-center gap-2">
             <span className="material-symbols-outlined text-[14px]">download</span> Export PDF
          </button>
        </div>
      </div>

      {/* Editor Split View */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Pane: Target JD & Current Resume Structure */}
        <div className="w-1/2 border-r border-outline-variant/10 flex flex-col bg-surface-container-lowest">
          
          {/* Target JD Input Module */}
          <div className="p-6 border-b border-outline-variant/10 bg-surface-container-low shrink-0 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 opacity-10">
              <span className="material-symbols-outlined text-9xl">target</span>
            </div>
            <h3 className="text-[10px] uppercase font-black tracking-widest text-white mb-4 relative z-10">Target Optimization Context</h3>
            <div className="flex gap-2 relative z-10">
              <input 
                type="text" 
                placeholder="Paste Job Description URL or Text..." 
                className="flex-1 bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-tertiary/50 transition-all placeholder:text-outline/50"
                value={jdInput}
                onChange={(e) => setJdInput(e.target.value)}
              />
              <button 
                onClick={handleOptimize}
                disabled={resLoading}
                className="bg-white text-black px-6 py-2 rounded-lg text-[10px] uppercase font-black tracking-widest border border-white hover:bg-tertiary hover:border-tertiary transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {resLoading ? <span className="animate-spin material-symbols-outlined text-sm">sync</span> : <span className="material-symbols-outlined text-sm">psychology</span>}
                {resLoading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
            {resumeAnalysis && (
              <div className="flex items-center gap-2 mt-4 relative z-10">
                <span className="text-[10px] text-outline font-bold uppercase">Optimization Result:</span>
                <span className="bg-tertiary/10 text-tertiary border border-tertiary/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter">Match Score: {matchScore}%</span>
              </div>
            )}
          </div>

          {/* Base Resume Document View */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-12 bg-surface-container-lowest">
            <div className="max-w-2xl mx-auto space-y-8">
              
              <div className="border-l-4 border-outline-variant/10 pl-6 py-2 hover:border-tertiary transition-colors group cursor-text relative">
                <h2 className="text-4xl font-black text-white font-headline tracking-tighter">User Profile</h2>
                <p className="text-secondary text-base mt-2 opacity-80">Syncing from primary candidate profile...</p>
                <p className="text-[11px] text-outline mt-2 font-mono uppercase tracking-widest">Global Intelligence Layer Active</p>
              </div>

              {/* Placeholder Content - In production this would be editable resume data */}
              <div className="space-y-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <div className="border-l-4 border-outline-variant/5 pl-6 py-1">
                  <h3 className="text-white font-bold text-xl mb-2">Core Experience</h3>
                  <div className="h-4 w-3/4 bg-surface-container-high rounded mb-2"></div>
                  <div className="h-4 w-full bg-surface-container-high rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-surface-container-high rounded"></div>
                </div>
                <div className="border-l-4 border-outline-variant/5 pl-6 py-1">
                  <h3 className="text-white font-bold text-xl mb-2">Key Projects</h3>
                  <div className="h-4 w-full bg-surface-container-high rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-surface-container-high rounded"></div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Pane: AI Suggestion Engine */}
        <div className="w-1/2 flex flex-col bg-surface-container-low relative border-l border-outline-variant/10">
          
          <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container/50 shrink-0 z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-tertiary/10 rounded-lg">
                <span className="material-symbols-outlined text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-white block">Intelligence Engine</span>
                <span className="text-[8px] text-outline uppercase font-bold tracking-tighter">Targeted Optimization</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-outline uppercase font-bold">Match Index</span>
              <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="bg-tertiary h-full transition-all duration-1000" style={{width: `${matchScore}%`}}></div>
              </div>
              <span className="text-sm font-black text-white">{matchScore}%</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-6">
            
            {!resumeAnalysis && !resLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30 gap-4">
                <span className="material-symbols-outlined text-6xl">model_training</span>
                <p className="text-xs font-bold uppercase tracking-widest">Awaiting Optimization Context</p>
              </div>
            ) : resLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-6">
                <div className="w-12 h-12 border-2 border-tertiary/20 border-t-tertiary rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-tertiary animate-pulse">Running Deep Analysis...</p>
              </div>
            ) : (
              <>
                <div className="bg-surface-container border border-outline-variant/10 rounded-2xl p-6 shadow-xl">
                   <div className="flex justify-between items-start mb-6">
                     <div className="flex items-center gap-3">
                       <span className="bg-tertiary/10 text-tertiary text-[10px] px-3 py-1 uppercase font-black rounded-full border border-tertiary/20">Summary</span>
                       <span className="text-sm font-bold text-white">Match Feedback</span>
                     </div>
                   </div>
                   
                   <p className="text-sm text-on-surface-variant leading-relaxed mb-6 font-medium">
                     {analysis.summary || "No automated summary generated."}
                   </p>

                   <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-outline uppercase tracking-widest">Key Missing Keywords</h4>
                     <div className="flex flex-wrap gap-2">
                       {(analysis.keywords || ['No gaps detected']).map(kw => (
                         <span key={kw} className="px-3 py-1.5 bg-surface-container-high rounded-lg text-[10px] font-bold text-white border border-outline-variant/10">{kw}</span>
                       ))}
                     </div>
                   </div>
                </div>

                <div className="bg-surface-container/30 border border-outline-variant/10 rounded-2xl p-6">
                  <h4 className="text-[10px] font-black text-outline uppercase tracking-widest mb-4">Strategic Recommendations</h4>
                  <ul className="space-y-4">
                    {(analysis.recommendations || []).map((rec, i) => (
                      <li key={i} className="flex gap-4 group">
                        <div className="w-6 h-6 rounded-lg bg-surface-container-high flex items-center justify-center text-[10px] font-black group-hover:bg-tertiary group-hover:text-black transition-colors">{i+1}</div>
                        <p className="text-xs text-on-surface-variant font-medium leading-relaxed flex-1">{rec}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
