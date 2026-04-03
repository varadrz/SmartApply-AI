"use client";
import React from 'react';

export default function ResumeOptimizer() {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      
      {/* Header Panel */}
      <div className="bg-[#131313] border-b border-outline-variant/10 px-8 py-4 flex-shrink-0 flex justify-between items-center z-10 shadow-md">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white font-headline flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">document_scanner</span>
            Resume Optimizer
          </h1>
          <p className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-1">Live AI Tailoring against Target Job Descriptions</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-secondary hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">history</span>
          </button>
          <div className="h-6 w-px bg-outline-variant/20"></div>
          <button className="bg-tertiary text-black px-6 py-2 text-[10px] uppercase font-black tracking-widest rounded transition-all hover:opacity-90 active:scale-95 flex items-center gap-2">
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
            <h3 className="text-xs uppercase font-bold tracking-widest text-white mb-4 relative z-10">Target Optimization Context</h3>
            <div className="flex gap-2 relative z-10">
              <input 
                type="text" 
                placeholder="Paste Job Description URL or Text..." 
                className="flex-1 bg-surface-container border border-outline-variant/20 rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-tertiary/50"
                defaultValue="https://careers.stripe.com/jobs/staff-infrastructure-engineer"
              />
              <button className="bg-surface-container-high text-white px-4 py-2 rounded text-[10px] uppercase font-bold tracking-widest border border-outline-variant/20 hover:border-white transition-colors">
                Extract Roles
              </button>
            </div>
            <div className="flex items-center gap-2 mt-4 relative z-10">
              <span className="text-[10px] text-secondary font-bold uppercase">Optimizing for:</span>
              <span className="bg-tertiary/10 text-tertiary border border-tertiary/20 px-2 py-0.5 rounded text-[10px] font-bold">Staff Infrastructure Engineer @ Stripe</span>
            </div>
          </div>

          {/* Base Resume Document View (Simulated Markdown/Rich text) */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-12 bg-[#1c1b1b]">
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Header Box */}
              <div className="border-l-4 border-outline-variant/30 pl-4 py-1 hover:border-tertiary transition-colors group cursor-text relative">
                <div className="absolute -left-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="w-6 h-6 rounded bg-surface-container flex items-center justify-center border border-outline-variant/30 text-secondary hover:text-white"><span className="material-symbols-outlined text-[14px]">edit</span></button>
                </div>
                <h2 className="text-3xl font-black text-white font-headline tracking-tighter">Marcus Thorne</h2>
                <p className="text-secondary text-sm mt-1">Staff Backend / Infrastructure Engineer</p>
                <p className="text-[11px] text-outline mt-1 font-mono">marcus@obsidian.ai | github.com/mthorne | linkedin.com/in/mthorne</p>
              </div>

              {/* Experience 1 */}
              <div className="border-l-4 border-tertiary pl-4 py-1 group relative bg-tertiary/5 rounded-r">
                <div className="absolute -left-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                   <button className="w-6 h-6 rounded bg-surface-container flex items-center justify-center border border-outline-variant/30 text-secondary hover:text-white"><span className="material-symbols-outlined text-[14px]">edit</span></button>
                   <button className="w-6 h-6 rounded bg-surface-container flex items-center justify-center border border-outline-variant/30 text-tertiary"><span className="material-symbols-outlined text-[14px]">auto_awesome</span></button>
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">Lead Software Engineer</h3>
                    <p className="text-secondary text-sm">DeepScale Systems</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-outline font-bold">2021 — Present</span>
                </div>
                
                <ul className="list-disc pl-4 space-y-2 text-sm text-on-surface-variant leading-relaxed">
                  <li>Architected and deployed a multi-region <span className="bg-tertiary/20 text-tertiary px-1 rounded font-mono">distributed tracing</span> pipeline handling 4M+ req/sec using Golang and Kafka.</li>
                  <li className="text-white border-b border-dashed border-tertiary/50 pb-0.5">Reduced p99 database latency by 45% by implementing a bespoke Redis read-through caching layer and optimizing complex Postgres joins.</li>
                  <li>Mentored a team of 6 engineers, transitioning the org from monolithic Ruby on Rails to Kubernetes-orchestrated microservices.</li>
                </ul>
              </div>

               {/* Experience 2 */}
              <div className="border-l-4 border-outline-variant/30 pl-4 py-1 hover:border-tertiary transition-colors group relative cursor-text">
                <div className="absolute -left-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="w-6 h-6 rounded bg-surface-container flex items-center justify-center border border-outline-variant/30 text-secondary hover:text-white"><span className="material-symbols-outlined text-[14px]">edit</span></button>
                </div>
                
                <div className="flex justify-between items-start mb-2 mt-4">
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">Senior Backend Engineer</h3>
                    <p className="text-secondary text-sm">FinStack Analytics</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-outline font-bold">2018 — 2021</span>
                </div>
                
                <ul className="list-disc pl-4 space-y-2 text-sm text-on-surface-variant leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                  <li>Built core payment routing REST APIs processing $50M+ daily volume using Python / FastAPI.</li>
                  <li>Migrated legacy batch processes to event-driven architectures utilizing AWS SQS and Lambda.</li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Right Pane: AI Suggestion Engine */}
        <div className="w-1/2 flex flex-col bg-surface-container relative">
          
          <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low shrink-0 z-10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
              <span className="text-xs uppercase font-bold tracking-widest text-white">Live AI Suggestions</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-outline uppercase font-bold">ATS Match Score:</span>
              <div className="w-32 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="bg-tertiary h-full w-[78%]"></div>
              </div>
              <span className="text-xs font-black text-tertiary">78%</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
            
            {/* Suggestion 1: High Priority Rewrite */}
            <div className="bg-surface-container-low rounded-xl border border-tertiary/30 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
               <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-2">
                   <span className="bg-tertiary/20 text-tertiary text-[9px] px-2 py-0.5 uppercase font-black rounded">High Impact</span>
                   <span className="text-xs font-bold text-white">Bullet Point Rewrite</span>
                 </div>
                 <span className="text-[10px] text-secondary font-medium italic">Role requirement: "Distributed Locks"</span>
               </div>
               
               <p className="text-xs text-outline mb-2 line-through">Reduced p99 database latency by 45% by implementing a bespoke Redis read-through caching layer and optimizing complex Postgres joins.</p>
               
               <div className="bg-surface-container p-3 rounded border border-tertiary/20 mb-4 relative">
                 <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-tertiary rounded-r"></div>
                 <p className="text-sm text-white font-medium pl-2">Engineered a distributed locking mechanism over Redis to prevent cache stampedes, cutting Postgres query load by 60% and reducing p99 latency by 45%.</p>
               </div>

               <div className="flex gap-2">
                 <button className="flex-1 bg-white text-black py-2 rounded text-[10px] font-black uppercase tracking-widest hover:bg-tertiary hover:text-black transition-colors">Apply Change</button>
                 <button className="px-4 py-2 bg-surface-container-highest border border-outline-variant/20 rounded text-secondary hover:text-white transition-colors"><span className="material-symbols-outlined text-[14px]">refresh</span></button>
               </div>
            </div>

            {/* Suggestion 2: Missing Keyword */}
            <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-5">
               <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-2">
                   <span className="bg-surface-container-highest text-white border border-outline-variant/20 text-[9px] px-2 py-0.5 uppercase font-black rounded">Missing Keyword</span>
                   <span className="text-xs font-bold text-white">Idempotency</span>
                 </div>
               </div>
               
               <p className="text-xs text-secondary mb-4 leading-relaxed">The Stripe JD mentions idempotency keys 3 times. Your experience at FinStack Analytic building APIs likely involved this. Consider adding a bullet point highlighting how you handled retries or duplicate payments.</p>
               
               <button className="w-full border border-outline-variant/30 text-white py-2 rounded text-[10px] font-black uppercase tracking-widest hover:border-white transition-colors flex items-center justify-center gap-2">
                 <span className="material-symbols-outlined text-xs">edit_note</span> Generate Draft Bullet
               </button>
            </div>

            {/* Overall Feedback */}
             <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-5 opacity-70">
               <div className="flex items-center gap-2 mb-3">
                 <span className="material-symbols-outlined text-secondary text-sm">fact_check</span>
                 <span className="text-xs font-bold text-white uppercase tracking-widest">Formatting Analysis</span>
               </div>
               <p className="text-xs text-secondary leading-relaxed">Your resume parses correctly through standard Workday ATS logic. Technical keywords are densely packed near the top. Keep the current structure.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
