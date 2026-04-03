"use client";
import React from 'react';

export default function Interviews() {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pt-8 flex flex-col h-[calc(100vh-4rem)]">
      <div className="px-8 pb-4 max-w-[1600px] w-full mx-auto flex-shrink-0">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter text-white font-headline">Active Pipeline</h1>
            <p className="text-secondary font-body mt-1">Manage advancing processes and configure AI prep parameters.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container px-4 py-2 border border-outline-variant/20 rounded flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary">
              <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(98,255,150,0.5)]"></span>
              4 Active
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 overflow-x-auto no-scrollbar px-8 pb-8 max-w-[1600px] w-full mx-auto flex gap-6 items-start mt-6">
        
        {/* Column 1: Screening */}
        <div className="w-[380px] flex-shrink-0 flex flex-col bg-surface-container-lowest/50 rounded-xl border border-outline-variant/5 min-h-[500px]">
          <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center sticky top-0 bg-[#131313]/90 backdrop-blur z-10 rounded-t-xl">
            <span className="font-bold text-white text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-outline">support_agent</span>
              Recruiter Screen
            </span>
            <span className="bg-surface-container-high text-outline text-[10px] px-2 py-0.5 rounded font-bold">2</span>
          </div>
          
          <div className="p-3 space-y-3">
            {/* Card */}
            <div className="bg-surface-container rounded-lg border border-outline-variant/10 p-4 hover:border-tertiary/30 transition-all group cursor-grab">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-black uppercase bg-surface-container-high text-white px-2 py-0.5 rounded">Scale AI</span>
                <span className="material-symbols-outlined text-outline text-sm hover:text-white cursor-pointer transition-colors">more_horiz</span>
              </div>
              <h4 className="font-bold text-white text-sm mb-1 line-clamp-2 leading-tight font-headline">Senior Staff ML Engineer, Infrastructure</h4>
              <p className="text-[11px] text-secondary font-medium mb-3">Target: $280k - $320k Base</p>
              
              <div className="flex items-center gap-2 p-2 bg-surface-container-low rounded border border-outline-variant/10 mb-4 mt-2 group-hover:bg-surface-bright transition-colors">
                <span className="material-symbols-outlined text-xs text-outline">event</span>
                <span className="text-[10px] font-bold text-outline">Oct 14, 09:00 AM</span>
              </div>

              <div className="flex justify-between items-end border-t border-outline-variant/10 pt-3">
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase font-bold text-outline tracking-widest mb-0.5">Win Prob.</span>
                  <span className="text-xs font-black text-white">42%</span>
                </div>
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-surface-container-highest border-2 border-surface-container flex items-center justify-center text-[8px] text-white font-bold">AI</div>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="bg-surface-container rounded-lg border border-outline-variant/10 p-4 hover:border-tertiary/30 transition-all group cursor-grab opacity-80 hover:opacity-100">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-black uppercase bg-surface-container-high text-white px-2 py-0.5 rounded">Databricks</span>
                <span className="material-symbols-outlined text-outline text-sm hover:text-white cursor-pointer transition-colors">more_horiz</span>
              </div>
              <h4 className="font-bold text-white text-sm mb-1 line-clamp-2 leading-tight font-headline">Software Engineer (L5), Distributed Systems</h4>
              
              <div className="flex items-center gap-2 p-2 bg-error-container/10 rounded border border-error/20 mb-4 mt-2">
                <span className="material-symbols-outlined text-xs text-error">notification_important</span>
                <span className="text-[10px] font-bold text-error">Schedule Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Technical Assessment */}
        <div className="w-[380px] flex-shrink-0 flex flex-col bg-surface-container-lowest/50 rounded-xl border border-outline-variant/5 min-h-[500px]">
          <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center sticky top-0 bg-[#131313]/90 backdrop-blur z-10 rounded-t-xl">
            <span className="font-bold text-white text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-tertiary">code_blocks</span>
              Technical Assesment
            </span>
            <span className="bg-tertiary/20 text-tertiary text-[10px] px-2 py-0.5 rounded font-bold">1</span>
          </div>
          
          <div className="p-3 space-y-3">
            {/* Card */}
            <div className="bg-surface-container rounded-lg border-l-2 border-l-tertiary border-y-outline-variant/10 border-r-outline-variant/10 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.5)] group cursor-grab relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-6xl">videocam</span>
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-black uppercase bg-white text-black px-2 py-0.5 rounded">Stripe</span>
                  <span className="material-symbols-outlined text-outline text-sm hover:text-white cursor-pointer transition-colors">more_horiz</span>
                </div>
                <h4 className="font-bold text-white text-sm mb-1 leading-tight font-headline">Enterprise Architect / SWE</h4>
                <div className="bg-surface-container-highest px-2 py-1 rounded inline-block mt-2">
                  <span className="text-[9px] font-bold text-outline uppercase tracking-wider">Round 2: System Architecture</span>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-surface-container-low rounded border border-outline-variant/10 mb-4 mt-4">
                  <span className="material-symbols-outlined text-xs text-secondary">event</span>
                  <span className="text-[10px] font-bold text-secondary">Tomorrow, 02:15 PM</span>
                </div>

                <div className="flex justify-between items-end border-t border-outline-variant/10 pt-3 mt-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase font-bold text-outline tracking-widest mb-0.5">Win Prob.</span>
                    <span className="text-xs font-black text-tertiary">68%</span>
                  </div>
                  <button className="text-[9px] bg-tertiary text-black px-2 py-1 uppercase tracking-widest font-black rounded hover:opacity-90 transition-opacity">Prep Docs</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Onsite / Final */}
        <div className="w-[380px] flex-shrink-0 flex flex-col bg-surface-container-lowest/50 rounded-xl border border-outline-variant/5 min-h-[500px]">
          <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center sticky top-0 bg-[#131313]/90 backdrop-blur z-10 rounded-t-xl">
             <span className="font-bold text-white text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#ffb4ab]">meeting_room</span>
              Final / Onsite
            </span>
            <span className="bg-surface-container-high text-outline text-[10px] px-2 py-0.5 rounded font-bold">1</span>
          </div>
          
          <div className="p-3 space-y-3">
             {/* Card */}
             <div className="bg-surface-container rounded-lg border border-outline-variant/10 p-4 hover:border-[#ffb4ab]/30 transition-all group cursor-grab">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-black uppercase bg-[#2a2a2a] text-[#c6c6c6] px-2 py-0.5 rounded">Anthropic</span>
                <span className="material-symbols-outlined text-outline text-sm hover:text-white cursor-pointer transition-colors">more_horiz</span>
              </div>
              <h4 className="font-bold text-white text-sm mb-1 leading-tight font-headline">Research Engineer, Alignment</h4>
              
              <div className="p-3 bg-surface-container-low rounded border border-outline-variant/10 mb-4 mt-4">
                <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-2 border-b border-outline-variant/20 pb-1">Loop Schedule</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-outline">1. Behavioral (Manager)</span>
                    <span className="text-secondary line-through">Done</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-bold">2. Deep Learning Math</span>
                    <span className="text-tertiary font-bold">Today</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-outline">3. Executive Chat</span>
                    <span className="text-outline">Thu</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-outline-variant/10 pt-3">
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase font-bold text-outline tracking-widest mb-0.5">Win Prob.</span>
                  <span className="text-xs font-black text-white">24% <span className="text-[9px] font-normal text-secondary">(Highly Competitive)</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 4: Offer */}
        <div className="w-[380px] flex-shrink-0 flex flex-col bg-surface-container-lowest/50 rounded-xl border border-outline-variant/5 min-h-[500px]">
          <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center sticky top-0 bg-[#131313]/90 backdrop-blur z-10 rounded-t-xl opactiy-50">
             <span className="font-bold text-outline text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-outline">contract</span>
              Offer Stage
            </span>
            <span className="bg-transparent text-outline text-[10px] px-2 py-0.5 rounded font-bold border border-outline-variant/20">0</span>
          </div>
          <div className="p-4 flex-1 flex flex-col items-center justify-center text-center opacity-30">
            <span className="material-symbols-outlined text-4xl mb-2">hourglass_empty</span>
            <p className="text-xs font-bold uppercase tracking-widest">Awaiting Candidates</p>
          </div>
        </div>

      </div>
    </div>
  );
}
