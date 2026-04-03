"use client";
import React, { useState } from 'react';
import { useOutreachStore } from '@/store/useOutreachStore';

export default function CompanyAnalysis() {
  const [urlInput, setUrlInput] = useState('');
  const [activeAnalysis, setActiveAnalysis] = useState(null);
  
  const { analyzeCompany, loading, error, companies } = useOutreachStore();

  const handleAnalyze = async () => {
    if (!urlInput) return;
    try {
      const result = await analyzeCompany(urlInput);
      setActiveAnalysis(result);
      setUrlInput('');
    } catch (e) {
      console.error(e);
    }
  };

  const dataToDisplay = activeAnalysis || (companies.length > 0 ? companies[0] : null);

  const matchScore = dataToDisplay?.match?.match_score || 85;
  const matchLabel = matchScore > 80 ? "Optimal Match" : matchScore > 50 ? "Average Match" : "Low Match";
  const selectionProb = dataToDisplay?.match?.selection_probability || "65%";
  
  const techStack = dataToDisplay?.company_intel?.tech_stack?.length > 0 
    ? dataToDisplay.company_intel.tech_stack 
    : ["React 18", "Golang", "Kubernetes", "PostgreSQL", "gRPC", "Kafka"];
    
  const hiringSignals = dataToDisplay?.company_intel?.hiring_signals?.length > 0
    ? dataToDisplay.company_intel.hiring_signals
    : ["Series B Expansion: Growing engineering team by 40% QoQ.", 
       "Recent Tech Migration: Moving legacy PHP to Go microservices.", 
       "Talent Shortage: Position open for >45 days. High leverage."];
       
  const emailContent = dataToDisplay?.email?.body || `Subject: Solving the Go Microservices scaling at Obsidian Forge

Hi Marcus,

I noticed Obsidian Forge is currently migrating its legacy core to a Go-based architecture. Having recently led the migration of a high-throughput payment gateway from Monolith to K8s-orchestrated Go services at Helios, I understand the challenges around gRPC latency and state management you're likely facing.

My skill set aligns 85% with your recent Senior Backend listing, particularly your focus on Kafka for event-driven consistency. I've documented a few patterns I used to reduce latency by 30% in similar environments.

Would you be open to a 10-minute technical sync next Tuesday?

Best,
Alex Sterling`;

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pt-8">
      <div className="p-8 pb-32 max-w-[1400px] mx-auto">
        {/* Input Section: URL Analysis */}
        <section className="mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight mb-2 text-white">Target Intelligence</h2>
            <p className="text-secondary mb-6 font-body text-md">Enter a LinkedIn Job URL or Company Career Page to begin deep analysis.</p>
            <div className="flex gap-4 p-2 bg-surface-container-low rounded-xl border border-outline-variant/10">
              <div className="flex-1 flex items-center bg-surface-container-lowest rounded-lg border border-outline-variant/20 focus-within:border-white/40 transition-colors">
                <span className="material-symbols-outlined pl-4 text-outline">link</span>
                <input 
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface py-4 px-3 placeholder:text-outline font-body" 
                  placeholder="https://www.linkedin.com/jobs/view/..." 
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                />
              </div>
              <button 
                onClick={handleAnalyze}
                disabled={loading || !urlInput}
                className="bg-primary text-on-primary px-8 py-4 font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                    <span className="material-symbols-outlined animate-spin" style={{fontVariationSettings: "'FILL' 1"}}>sync</span>
                ) : (
                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>psychology</span>
                )}
                ANALYZE
              </button>
            </div>
            {error && (
              <div className="mt-4 p-4 bg-error-container/20 border border-error/50 rounded-lg text-error text-sm font-medium">
                {error}
              </div>
            )}
          </div>
        </section>

        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left: Analysis Result */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Skill Match Card */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-white">verified</span>
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">Skill Match Score</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-headline font-black text-tertiary">{matchScore}%</span>
                  <span className="text-sm text-tertiary/70 font-medium">{matchLabel}</span>
                </div>
                <div className="mt-4 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary transition-all duration-1000" style={{width: `${matchScore}%`}}></div>
                </div>
              </div>
            </div>

            {/* Tech Stack Extraction */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
              <h3 className="text-xs font-label uppercase tracking-widest text-secondary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">terminal</span> Tech Stack Detected
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 bg-surface-container rounded-md text-xs font-medium border border-outline-variant/20 text-white">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Hiring Signals */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
              <h3 className="text-xs font-label uppercase tracking-widest text-secondary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">sensors</span> Intelligence Signals
              </h3>
              <ul className="space-y-4">
                {hiringSignals.map((signal, i) => {
                  const parts = signal.includes(':') ? signal.split(':') : [signal, ''];
                  const title = parts[0];
                  const desc = parts.slice(1).join(':').trim();
                  
                  return (
                    <li key={i} className="flex gap-3">
                      <span className="material-symbols-outlined text-tertiary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>
                        check_circle
                      </span>
                      <div className="text-sm">
                        <p className="text-white font-medium">{title}</p>
                        {desc && <p className="text-outline text-xs mt-0.5">{desc}</p>}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Right: AI Email Composer */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            {/* Email Composer */}
            <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 flex flex-col flex-1 min-h-[500px]">
              <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container rounded-t-xl">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">mail</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-white">Hyper-Personalized Draft</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-surface-container-high rounded transition-colors text-secondary hover:text-white">
                    <span className="material-symbols-outlined text-xl">edit</span>
                  </button>
                  <button className="p-2 hover:bg-surface-container-high rounded transition-colors text-secondary hover:text-white">
                    <span className="material-symbols-outlined text-xl">refresh</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 p-6">
                <textarea 
                  className="w-full h-full bg-transparent border-none focus:ring-0 text-on-surface font-mono text-sm leading-relaxed resize-none" 
                  spellCheck="false"
                  value={emailContent}
                  readOnly
                />
              </div>
              <div className="p-6 border-t border-outline-variant/10 flex justify-between items-center bg-surface-container-low rounded-b-xl">
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-surface-bright text-white text-sm font-bold rounded-lg transition-all active:scale-95 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-lg">auto_awesome</span>
                  Generate with Ollama
                </button>
                <button className="bg-tertiary-container text-on-tertiary-container px-8 py-3 font-black rounded-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined">send</span>
                  SEND VIA SMTP
                </button>
              </div>
            </div>

            {/* Selection Probability Bento Block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 flex flex-col justify-center items-center text-center">
                <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-1">Heuristic Estimate</p>
                <div className="text-4xl font-headline font-black text-white">{selectionProb}</div>
                <p className="text-xs text-secondary mt-1">Selection Probability</p>
              </div>
              <div className="md:col-span-2 bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
                <p className="text-[10px] font-label uppercase tracking-widest text-secondary mb-4">Probability Breakdown</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-outline">Skill Match</span>
                      <span className="text-tertiary font-bold">High ({matchScore}%)</span>
                    </div>
                    <div className="h-1 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary transition-all" style={{width: `${matchScore}%`}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-outline">Project Relevance</span>
                      <span className="text-white font-bold">Medium (60%)</span>
                    </div>
                    <div className="h-1 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-white transition-all" style={{width: '60%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-outline">Email Quality</span>
                      <span className="text-white font-bold">Exceptional (92%)</span>
                    </div>
                    <div className="h-1 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-white transition-all" style={{width: '92%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
