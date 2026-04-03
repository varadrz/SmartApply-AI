export default function Dashboard() {
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
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-2">Total Sent</p>
                  <p className="text-5xl font-headline font-black text-white">412</p>
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
                  <p className="font-label text-[10px] uppercase tracking-widest text-tertiary mb-2">Replied</p>
                  <p className="text-5xl font-headline font-black text-white">89</p>
                  <p className="text-[10px] text-tertiary mt-1 font-bold">+14% conversion rate</p>
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
              <p className="text-7xl font-headline font-black text-white">78<span className="text-3xl text-tertiary">%</span></p>
              <div className="mt-4 h-1 w-full bg-outline-variant/20 rounded-full overflow-hidden">
                <div className="h-full bg-tertiary w-[78%]"></div>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
                Match probability is <span className="text-white font-bold">trending up</span> based on your recent skill set update in the AI Core.
            </p>
          </div>
        </div>

        {/* Dashboard Split Layout */}
        <div className="grid grid-cols-12 gap-8 mb-16">
          {/* Outreach Timeline (Left Column) */}
          <div className="col-span-12 xl:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline text-xl font-bold tracking-tight text-white">Outreach Timeline</h3>
              <button className="text-xs font-label uppercase tracking-widest text-tertiary flex items-center gap-1 active:scale-95 transition-transform">
                  View Full Queue <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="space-y-4">
              {/* Timeline Item 1 */}
              <div className="bg-surface-container-low hover:bg-surface-bright transition-all duration-200 p-6 rounded-xl border border-outline-variant/5 flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container rounded-lg border border-outline-variant/20 group-hover:border-tertiary/30 transition-colors">
                  <span className="material-symbols-outlined text-tertiary">mail</span>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-outline mb-1">Scheduled Email</p>
                  <h4 className="font-bold text-white">Series A Fintech Lead - CTO</h4>
                  <p className="text-sm text-on-surface-variant mt-1 italic">"Regarding the Distributed Systems opening..."</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">Tomorrow, 09:15</p>
                  <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">In 14 hours</p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="bg-surface-container-low hover:bg-surface-bright transition-all duration-200 p-6 rounded-xl border border-outline-variant/5 flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center bg-tertiary-container/10 rounded-lg border border-tertiary/20">
                  <span className="material-symbols-outlined text-tertiary">forum</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[10px] uppercase tracking-widest text-tertiary font-bold">New Response</p>
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                  </div>
                  <h4 className="font-bold text-white">DeepScale AI - Hiring Lead</h4>
                  <p className="text-sm text-on-surface-variant mt-1">"Hey Marcus, love your portfolio. Let's talk Monday."</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">2h ago</p>
                  <button className="mt-2 bg-white text-black px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tighter hover:bg-secondary transition-colors">Reply Now</button>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="bg-surface-container-low hover:bg-surface-bright transition-all duration-200 p-6 rounded-xl border border-outline-variant/5 flex items-center gap-6 group opacity-70 cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container rounded-lg border border-outline-variant/20">
                  <span className="material-symbols-outlined text-outline">event_note</span>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-outline mb-1">Deadline Reminder</p>
                  <h4 className="font-bold text-white">HackMIT Submission Window</h4>
                  <p className="text-sm text-on-surface-variant mt-1">Project refinement needed before 11:59 PM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">Today</p>
                  <span className="text-[10px] text-error font-bold uppercase tracking-widest">Urgent</span>
                </div>
              </div>
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
                <div className="flex-1 bg-surface-container h-[40%] rounded-t relative group transition-all hover:opacity-80"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold hidden group-hover:block text-white">55%</div></div>
                <div className="flex-1 bg-surface-container h-[45%] rounded-t relative group transition-all hover:opacity-80"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold hidden group-hover:block text-white">58%</div></div>
                <div className="flex-1 bg-surface-container h-[58%] rounded-t relative group transition-all hover:opacity-80"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold hidden group-hover:block text-white">62%</div></div>
                <div className="flex-1 bg-tertiary/40 h-[65%] rounded-t relative group transition-all hover:opacity-80"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold hidden group-hover:block text-white">68%</div></div>
                <div className="flex-1 bg-tertiary/60 h-[72%] rounded-t relative group transition-all hover:opacity-80"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold hidden group-hover:block text-white">74%</div></div>
                <div className="flex-1 bg-tertiary h-[78%] rounded-t relative group transition-all hover:opacity-80"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold hidden group-hover:block text-white">78%</div></div>
              </div>
              <div className="flex justify-between mt-4 px-2">
                <span className="text-[9px] uppercase font-label text-outline tracking-widest">Oct 01</span>
                <span className="text-[9px] uppercase font-label text-outline tracking-widest">Oct 07</span>
                <span className="text-[9px] uppercase font-label text-outline tracking-widest">Oct 14</span>
                <span className="text-[9px] uppercase font-label text-outline tracking-widest">Today</span>
              </div>
            </div>
          </div>

          {/* Opportunity Quick View (Right Column) */}
          <div className="col-span-12 xl:col-span-4">
            <div className="mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-lg">local_fire_department</span>
              <h3 className="font-headline text-xl font-bold tracking-tight text-white">Hot Opportunities</h3>
            </div>
            
            <div className="space-y-4">
              {/* Opp Card 1 */}
              <div className="bg-surface-container p-5 rounded-xl border border-outline-variant/10 hover:border-tertiary/20 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-tertiary/10 text-tertiary text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest">94% Match</div>
                  <span className="material-symbols-outlined text-outline text-sm cursor-pointer hover:text-white transition-colors">bookmark</span>
                </div>
                <h5 className="font-bold text-white text-lg">NextGen AI Hackathon</h5>
                <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">Premium 48-hour event focused on LLM optimization and RAG architectures. VC judging panel.</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-widest">Registration Ends</p>
                    <p className="text-xs font-bold text-white">Oct 24, 2023</p>
                  </div>
                  <button className="bg-white hover:bg-secondary text-black w-10 h-10 flex items-center justify-center rounded-lg transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-xl">calendar_add_on</span>
                  </button>
                </div>
              </div>

              {/* Opp Card 2 */}
              <div className="bg-surface-container p-5 rounded-xl border border-outline-variant/10 hover:border-tertiary/20 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-tertiary/10 text-tertiary text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest">88% Match</div>
                  <span className="material-symbols-outlined text-outline text-sm cursor-pointer hover:text-white transition-colors">bookmark</span>
                </div>
                <h5 className="font-bold text-white text-lg">Scale AI | Engineering Drive</h5>
                <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">Priority hiring event for Senior Frontend & AI/ML integration roles in San Francisco.</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-widest">Interview Slots</p>
                    <p className="text-xs font-bold text-white">Available Now</p>
                  </div>
                  <button className="bg-white hover:bg-secondary text-black w-10 h-10 flex items-center justify-center rounded-lg transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-xl">calendar_add_on</span>
                  </button>
                </div>
              </div>

              {/* Opp Card 3 */}
              <div className="bg-surface-container p-5 rounded-xl border border-outline-variant/10 hover:border-tertiary/20 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-tertiary/10 text-tertiary text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest">82% Match</div>
                  <span className="material-symbols-outlined text-outline text-sm cursor-pointer hover:text-white transition-colors">bookmark</span>
                </div>
                <h5 className="font-bold text-white text-lg">ETH Global Istanbul</h5>
                <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">World-class blockchain developer gathering. Multiple tracks for AI/ZK implementations.</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-widest">Travel Grants</p>
                    <p className="text-xs font-bold text-white">Closes in 2 days</p>
                  </div>
                  <button className="bg-white hover:bg-secondary text-black w-10 h-10 flex items-center justify-center rounded-lg transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-xl">calendar_add_on</span>
                  </button>
                </div>
              </div>

              {/* Mini Stats Footer */}
              <div className="mt-8 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-outline uppercase tracking-widest">New Found Today</p>
                    <p className="text-3xl font-headline font-black text-white">12</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-outline uppercase tracking-widest">Queue Status</p>
                    <p className="text-xs font-bold text-tertiary">98% Analyzed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Home FAB context action */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-tertiary rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.3)] flex items-center justify-center text-on-tertiary-container hover:scale-95 transition-transform z-50 focus:outline-none">
        <span className="material-symbols-outlined font-bold text-3xl">add</span>
      </button>
    </div>
  );
}
