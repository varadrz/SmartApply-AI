"use client";

import React from 'react';

export default function SkillsProfile() {
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
                <span className="text-xs font-bold text-tertiary">2h 45m ago</span>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 font-bold uppercase tracking-widest text-[10px] rounded hover:opacity-90 transition-all active:scale-95">
                <span className="material-symbols-outlined text-sm">refresh</span>
                Crawl GitHub/Portfolio
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
              <span className="material-symbols-outlined text-tertiary text-2xl">analytics</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {/* Skill 1 */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg text-white">React</span>
                  <div className="bg-tertiary/15 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px] text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">98% Match</span>
                  </div>
                </div>
                <div className="h-1 bg-surface-container-highest w-full rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary w-[98%]"></div>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] text-secondary/50 uppercase font-bold tracking-widest">Next.js</span>
                  <span className="text-[10px] text-secondary/50 uppercase font-bold tracking-widest">Zustand</span>
                  <span className="text-[10px] text-secondary/50 uppercase font-bold tracking-widest">Tailwind</span>
                </div>
              </div>

              {/* Skill 2 */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg text-white">Go</span>
                  <div className="bg-tertiary/15 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px] text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">84% Match</span>
                  </div>
                </div>
                <div className="h-1 bg-surface-container-highest w-full rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary w-[84%]"></div>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] text-secondary/50 uppercase font-bold tracking-widest">GRPC</span>
                  <span className="text-[10px] text-secondary/50 uppercase font-bold tracking-widest">Microservices</span>
                </div>
              </div>

              {/* Skill 3 */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg text-white">LLMs</span>
                  <div className="bg-tertiary/15 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px] text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">92% Match</span>
                  </div>
                </div>
                <div className="h-1 bg-surface-container-highest w-full rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary w-[92%]"></div>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] text-secondary/50 uppercase font-bold tracking-widest">LangChain</span>
                  <span className="text-[10px] text-secondary/50 uppercase font-bold tracking-widest">OpenAI</span>
                  <span className="text-[10px] text-secondary/50 uppercase font-bold tracking-widest">PyTorch</span>
                </div>
              </div>

              {/* Skill 4 */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg text-white">Rust</span>
                  <div className="bg-secondary/15 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px] text-secondary">rocket</span>
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">45% Growing</span>
                  </div>
                </div>
                <div className="h-1 bg-surface-container-highest w-full rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[45%]"></div>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] text-secondary/50 uppercase font-bold tracking-widest">WASM</span>
                  <span className="text-[10px] text-secondary/50 uppercase font-bold tracking-widest">Memory Safety</span>
                </div>
              </div>
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
                    <span className="text-sm font-bold text-white">Prioritize Startup roles over MNCs</span>
                  </div>
                  <div className="w-10 h-5 bg-tertiary rounded-full relative flex items-center px-1 border border-tertiary/50">
                    <div className="w-3 h-3 bg-black rounded-full ml-auto"></div>
                  </div>
                </div>
                <p className="text-[11px] text-secondary/70">Filters for agility, equity heavy compensation, and direct influence over large corporate legacy systems.</p>
              </div>

              <div className="p-5 bg-surface-container-lowest rounded border border-outline-variant/10 group-hover:bg-surface-container-high transition-all cursor-pointer opacity-60">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black tracking-widest text-secondary">Inactive</span>
                    <span className="text-sm font-bold text-white">Strict Remote-Only Filter</span>
                  </div>
                  <div className="w-10 h-5 bg-surface-container-high rounded-full relative flex items-center px-1 border border-outline-variant/20">
                    <div className="w-3 h-3 bg-outline rounded-full"></div>
                  </div>
                </div>
                <p className="text-[11px] text-secondary/70">Suppress all hybrid or location-bound opportunities regardless of salary match or tech stack alignment.</p>
              </div>
            </div>
            
            <button className="mt-auto relative z-10 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-secondary hover:text-white transition-colors py-2 border-t border-outline-variant/10 pt-6 group/btn">
                Advanced Filtering Parameters
                <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          {/* Showcase Projects */}
          <div className="col-span-12 flex flex-col gap-6 mt-6">
            <div className="flex items-end justify-between px-2">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white font-headline">Showcase Projects</h2>
                <p className="text-sm text-secondary/60">Verified architectural contributions</p>
              </div>
              <button className="text-xs uppercase font-bold tracking-widest px-6 py-2 border border-outline-variant/20 hover:border-white transition-all rounded active:scale-95 text-white">
                Add Manual Entry
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Project Card 1 */}
              <div className="group bg-surface-container hover:bg-surface-bright p-6 rounded-lg transition-all duration-300 flex flex-col gap-4 border border-outline-variant/5">
                <div className="relative aspect-video rounded overflow-hidden mb-2">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Project 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRLESIlR4N1rqDLjy1zHiGOi8pbbXjaBVH7YACNd5JWC04Q_DrmuK4MKwhXEBQJ7SMNazUoc_eprHHh3iad73Eai21oeRtR-G4cSnpwkUw6geRmXSqRLdTT_s39UwQ2YrItisOSeaS01KhrJKAND_lQctbej8Nb5GppFU1icJWSJLzV659PmcwaTQjXT9Ztz6CFdZKIjPPx3TRkUAEI7e6EsHfea4L09drhrHIxdA-wg1dJVUX93OXtpooDXS2AMpQVTu0ZwmybYQ"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] font-bold uppercase bg-tertiary text-black px-2 py-1 rounded">Main Feature</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-tertiary transition-colors font-headline">Neural-Lattice Engine</h3>
                <p className="text-sm text-secondary leading-relaxed">
                    A distributed RAG framework built for large-scale enterprise documentation querying with sub-200ms latency.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                  <span className="text-[9px] uppercase font-black tracking-tighter bg-surface-container-high px-2 py-1 border border-outline-variant/10 text-white rounded">React</span>
                  <span className="text-[9px] uppercase font-black tracking-tighter bg-surface-container-high px-2 py-1 border border-outline-variant/10 text-white rounded">Go</span>
                  <span className="text-[9px] uppercase font-black tracking-tighter bg-surface-container-high px-2 py-1 border border-outline-variant/10 text-white rounded">Pinecone</span>
                  <span className="text-[9px] uppercase font-black tracking-tighter bg-surface-container-high px-2 py-1 border border-outline-variant/10 text-white rounded">PyTorch</span>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="group bg-surface-container hover:bg-surface-bright p-6 rounded-lg transition-all duration-300 flex flex-col gap-4 border border-outline-variant/5">
                <div className="relative aspect-video rounded overflow-hidden mb-2">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Project 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVqzJtN_11oiGoDT9YqO2u69Bv2XpIkLPRIVD2kzvhe_US9z7uO-942lCbCnyvkQkSjOzkyisMu5UeExZ62iC9i4Qn1z1i72ZSznVzinJkd66tF06wOeOuLYbIfULch4xU9KQt-jUAKidVFljeYWqGAcJ6ChzF0dhDlA9P8mqEENJAjjaLebG8SggeAz9TYveLKvVspYJC3yx6h2ba4JwRG_it-LZmsrR2UMCWQDWn8y1NBCPO1CdC-KcBIt1gMd_zDgLgb8gcHd4"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-tertiary transition-colors font-headline">Vault-Pulse Monitoring</h3>
                <p className="text-sm text-secondary leading-relaxed">
                    Real-time observability dashboard for financial microservices handling $2M+ in daily transactional volume.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                  <span className="text-[9px] uppercase font-black tracking-tighter bg-surface-container-high px-2 py-1 border border-outline-variant/10 text-white rounded">Vue 3</span>
                  <span className="text-[9px] uppercase font-black tracking-tighter bg-surface-container-high px-2 py-1 border border-outline-variant/10 text-white rounded">Rust</span>
                  <span className="text-[9px] uppercase font-black tracking-tighter bg-surface-container-high px-2 py-1 border border-outline-variant/10 text-white rounded">InfluxDB</span>
                </div>
              </div>

              {/* Project Card 3 */}
              <div className="group bg-surface-container hover:bg-surface-bright p-6 rounded-lg transition-all duration-300 flex flex-col gap-4 border border-outline-variant/5">
                <div className="relative aspect-video rounded overflow-hidden mb-2">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Project 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr4-wLrFx3e4utE0dyDpfBR-sfuZSYoacB25Y_ZO2gBzZh1fQKdU9uidcqmxfavyK6W4m3R40S2C29DAe-5Biq5b7vmowAnbS2AZRrX1gLZqmkjvplaoLslMOeHUfcUFNZxrMjQGV0WUo3GE1bdhEnzxBtvZN_JqqyeLRxWuNOSUvhD1fJHp9XRssAfLBSrl429EtaMMDvo_rVcrOafXRjFYf21chGt8k5ATeP_j06tg4qYLdnJcd2gneaHt5nFe51ir0ZMCbNNdA"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-tertiary transition-colors font-headline">Shadow-State Protocol</h3>
                <p className="text-sm text-secondary leading-relaxed">
                    Experimental state management library optimizing for zero-re-render cycles in high-frequency data applications.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                  <span className="text-[9px] uppercase font-black tracking-tighter bg-surface-container-high px-2 py-1 border border-outline-variant/10 text-white rounded">TypeScript</span>
                  <span className="text-[9px] uppercase font-black tracking-tighter bg-surface-container-high px-2 py-1 border border-outline-variant/10 text-white rounded">Web Workers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contextual Footer Stats */}
        <footer className="mt-8 grid grid-cols-4 gap-4 border-t border-outline-variant/20 pt-8">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-secondary mb-1">Detected Keywords</span>
            <span className="text-2xl font-bold text-white">128</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-secondary mb-1">Market Match Avg</span>
            <span className="text-2xl font-bold text-tertiary">91.4%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-secondary mb-1">Portfolio Velocity</span>
            <span className="text-2xl font-bold text-white">+12% /mo</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-secondary mb-1">Intel Nodes Connected</span>
            <span className="text-2xl font-bold text-white">04</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
