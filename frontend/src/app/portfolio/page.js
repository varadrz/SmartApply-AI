"use client";
import React from 'react';

export default function Portfolio() {
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
            <button className="bg-surface-container text-white px-6 py-3 font-bold uppercase tracking-widest text-[10px] rounded-lg border border-outline-variant/20 hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-sm align-middle mr-2">link</span>
              Connected GitHub
            </button>
            <button className="bg-white text-black px-6 py-3 font-bold uppercase tracking-widest text-[10px] rounded-lg hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-white/5">
              <span className="material-symbols-outlined text-sm">cloud_upload</span>
              Add Case Study
            </button>
          </div>
        </div>

        {/* Categories / Filters */}
        <div className="flex gap-2 pb-4 border-b border-outline-variant/10">
          <button className="px-4 py-1.5 bg-tertiary/10 text-tertiary rounded font-bold text-xs uppercase tracking-widest border border-tertiary/20">All Artifacts</button>
          <button className="px-4 py-1.5 bg-transparent text-secondary hover:text-white rounded font-bold text-xs uppercase tracking-widest border border-transparent hover:border-outline-variant/20 transition-all">Distributed Systems</button>
          <button className="px-4 py-1.5 bg-transparent text-secondary hover:text-white rounded font-bold text-xs uppercase tracking-widest border border-transparent hover:border-outline-variant/20 transition-all">AI / LLM Architecture</button>
          <button className="px-4 py-1.5 bg-transparent text-secondary hover:text-white rounded font-bold text-xs uppercase tracking-widest border border-transparent hover:border-outline-variant/20 transition-all">Frontend Engineering</button>
        </div>

        {/* Vault Grid */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* Main Showcase Item */}
          <div className="col-span-12 group">
            <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden hover:border-tertiary/40 transition-all duration-500">
              <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-7 relative h-64 lg:h-auto overflow-hidden bg-black flex items-center justify-center border-r border-outline-variant/10">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 group-hover:scale-105"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-transparent to-transparent hidden lg:block z-10 w-32 left-0 -scale-x-100 right-0 ml-auto"></div>
                  <span className="material-symbols-outlined text-white/50 text-6xl relative z-10 font-[100]">dns</span>
                </div>
                <div className="col-span-12 lg:col-span-5 p-10 flex flex-col justify-center bg-gradient-to-l from-surface-container-low to-surface-container relative z-20">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-tertiary text-black text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-widest">Flagship</span>
                    <span className="text-xs uppercase font-bold text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">visibility</span> 1.2k
                    </span>
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-white mb-2">Neural-Lattice Engine</h3>
                  <p className="text-secondary text-sm mb-6 leading-relaxed">
                    A distributed RAG framework built for large-scale enterprise documentation querying. Reduces embedding latency by 45% using a custom Go microservice architecture.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="text-[10px] uppercase font-black bg-surface-container-high border border-outline-variant/20 px-2 py-1 rounded text-white">Golang</span>
                    <span className="text-[10px] uppercase font-black bg-surface-container-high border border-outline-variant/20 px-2 py-1 rounded text-white">gRPC</span>
                    <span className="text-[10px] uppercase font-black bg-surface-container-high border border-outline-variant/20 px-2 py-1 rounded text-white">PostgreSQL</span>
                    <span className="text-[10px] uppercase font-black bg-surface-container-high border border-outline-variant/20 px-2 py-1 rounded text-white">Kubernetes</span>
                  </div>
                  
                  <div className="flex gap-4 mt-auto">
                     <button className="flex-1 bg-white text-black py-2.5 rounded text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity text-center items-center justify-center flex gap-2">
                        <span className="material-symbols-outlined text-sm">description</span> Read Case Study
                     </button>
                     <button className="w-12 h-10 flex items-center justify-center bg-surface-container border border-outline-variant/20 rounded hover:border-white transition-colors text-white">
                        <span className="material-symbols-outlined text-sm">code</span>
                     </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Items */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6 h-full flex flex-col group hover:border-outline-variant/30 transition-all cursor-pointer">
              <div className="mb-6 h-32 bg-surface-container rounded-lg border border-outline-variant/10 flex items-center justify-center relative overflow-hidden">
                <span className="material-symbols-outlined text-4xl text-outline relative z-10 group-hover:text-white transition-colors">monitoring</span>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-tertiary/10 rounded-full blur-[40px]"></div>
              </div>
              <h4 className="font-headline font-bold text-white text-lg mb-2">Vault-Pulse Observability</h4>
              <p className="text-xs text-secondary leading-relaxed flex-1">Real-time observability dashboard for financial microservices handling massive transactional volume.</p>
              <div className="mt-6 pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Rust • InfluxDB</span>
                <span className="material-symbols-outlined text-secondary text-sm group-hover:text-white transition-colors group-hover:translate-x-1">arrow_forward</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6 h-full flex flex-col group hover:border-outline-variant/30 transition-all cursor-pointer">
              <div className="mb-6 h-32 bg-surface-container rounded-lg border border-outline-variant/10 flex items-center justify-center relative overflow-hidden">
                <span className="material-symbols-outlined text-4xl text-outline relative z-10 group-hover:text-white transition-colors">data_object</span>
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-[40px]"></div>
              </div>
               <h4 className="font-headline font-bold text-white text-lg mb-2">Shadow-State Protocol</h4>
              <p className="text-xs text-secondary leading-relaxed flex-1">Experimental state management library optimizing for zero-re-render cycles in high-frequency data applications.</p>
              <div className="mt-6 pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                <span className="text-[10px] font-bold text-outline uppercase tracking-widest">TypeScript</span>
                <span className="material-symbols-outlined text-secondary text-sm group-hover:text-white transition-colors group-hover:translate-x-1">arrow_forward</span>
              </div>
            </div>
          </div>
          
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 border-dashed p-6 h-full flex flex-col items-center justify-center text-center hover:bg-surface-container transition-colors cursor-pointer opacity-70 hover:opacity-100 min-h-[300px]">
              <div className="w-16 h-16 rounded-full bg-surface-container-high border border-outline-variant/20 mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-secondary">add</span>
              </div>
              <h4 className="font-bold text-white text-sm mb-1 uppercase tracking-widest">Compile New Project</h4>
              <p className="text-xs text-secondary px-4">Import repository from GitHub and generate AI case study summary automatically.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
