"use client";

import React from 'react';

export default function Analytics() {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pt-8">
      <div className="p-8 pb-32 space-y-8 max-w-[1400px] mx-auto">
        {/* Hero Header */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tighter text-white mb-2 font-headline">Outreach Intelligence</h2>
            <p className="text-secondary font-body">Performance funnel and A/B variant analysis for Q4 Executive Search.</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-surface-container px-4 py-2 rounded-lg flex items-center gap-3">
              <span className="text-tertiary text-xs font-bold uppercase tracking-widest">AI Confidence</span>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-tertiary/10 rounded-full">
                <span className="material-symbols-outlined text-[14px] text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                <span className="text-tertiary text-xs font-bold">98.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid: Funnel & Key Metrics */}
        <div className="grid grid-cols-12 gap-6">
          {/* Performance Funnel Visualization */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl p-8 relative overflow-hidden">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-white font-bold uppercase tracking-widest text-xs">Outreach Funnel Velocity</h3>
              <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">Last 30 Days</span>
            </div>
            
            <div className="flex items-end gap-2 h-64">
              {/* Sent */}
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-surface-container-high rounded-t-lg relative transition-all group-hover:bg-surface-bright" style={{height: '100%'}}>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/10 to-transparent h-full"></div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-white font-black text-lg">1,240</div>
                </div>
                <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-secondary">Sent</span>
              </div>
              {/* Opened */}
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-surface-container-high rounded-t-lg relative transition-all group-hover:bg-surface-bright" style={{height: '72%'}}>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/5 to-transparent h-full"></div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-white font-black text-lg">892</div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-tertiary text-[10px] font-bold">72%</div>
                </div>
                <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-secondary">Opened</span>
              </div>
              {/* Replied */}
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-tertiary rounded-t-lg relative transition-all group-hover:opacity-90" style={{height: '24%'}}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-tertiary font-black text-lg">298</div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-black text-[10px] font-bold">33%</div>
                </div>
                <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-tertiary">Replied</span>
              </div>
              {/* Interview */}
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-surface-container-high rounded-t-lg relative transition-all group-hover:bg-surface-bright" style={{height: '8%'}}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-white font-black text-lg">42</div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white/50 text-[10px] font-bold">14%</div>
                </div>
                <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-secondary">Interview</span>
              </div>
            </div>
          </div>

          {/* Reply Rate Trend Line */}
          <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-xl p-8 flex flex-col">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Reply Rate Trend</h3>
            <div className="flex-1 flex items-end justify-between gap-1 mb-4">
              <div className="w-2 bg-surface-container-high rounded-full" style={{height: '40%'}}></div>
              <div className="w-2 bg-surface-container-high rounded-full" style={{height: '55%'}}></div>
              <div className="w-2 bg-surface-container-high rounded-full" style={{height: '45%'}}></div>
              <div className="w-2 bg-outline-variant/50 rounded-full" style={{height: '70%'}}></div>
              <div className="w-2 bg-outline-variant/50 rounded-full" style={{height: '60%'}}></div>
              <div className="w-2 bg-tertiary rounded-full" style={{height: '85%'}}></div>
              <div className="w-2 bg-tertiary rounded-full" style={{height: '95%'}}></div>
            </div>
            <div className="mt-auto">
              <div className="text-4xl font-black text-white">+12.4%</div>
              <p className="text-secondary text-xs mt-1">Growth vs previous week</p>
              <div className="mt-4 pt-4 border-t border-outline-variant/20 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Peak Performance</span>
                <span className="text-tertiary font-bold text-xs">Tuesday, 10:00 AM</span>
              </div>
            </div>
          </div>

          {/* A/B Test Comparison */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-bold uppercase tracking-widest text-xs">A/B Content Variants</h3>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-white"></span>
                <span className="w-3 h-3 rounded-full bg-surface-container-high"></span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Variant A */}
              <div className="bg-surface-container rounded-xl p-6 border-l-2 border-surface-container-high group hover:bg-surface-bright transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-surface-container-high text-[10px] px-2 py-1 rounded font-bold uppercase text-secondary">Variant A</span>
                  <span className="text-secondary text-xs">Sent: 620</span>
                </div>
                <h4 className="text-white text-sm font-bold mb-3 italic">"Quick question regarding the Obsidian AI expansion..."</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-secondary">Open Rate</span>
                    <span className="text-white font-bold">68%</span>
                  </div>
                  <div className="w-full bg-surface-container-lowest h-1 rounded-full overflow-hidden">
                    <div className="bg-white h-full" style={{width: '68%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-secondary">Reply Rate</span>
                    <span className="text-white font-bold">12.4%</span>
                  </div>
                </div>
              </div>

              {/* Variant B (The Winner) */}
              <div className="bg-surface-container rounded-xl p-6 border-l-2 border-tertiary group hover:bg-surface-bright transition-all relative">
                <div className="absolute -top-3 right-4 bg-tertiary text-black text-[9px] px-2 py-0.5 font-black uppercase rounded shadow-xl">Winner</div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-tertiary/10 text-tertiary text-[10px] px-2 py-1 rounded font-bold uppercase">Variant B</span>
                  <span className="text-secondary text-xs">Sent: 620</span>
                </div>
                <h4 className="text-white text-sm font-bold mb-3 italic">"Leveraging AI to solve the [Pain Point] gap at [Company]"</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-secondary">Open Rate</span>
                    <span className="text-tertiary font-bold">84%</span>
                  </div>
                  <div className="w-full bg-surface-container-lowest h-1 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full" style={{width: '84%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-secondary">Reply Rate</span>
                    <span className="text-tertiary font-bold">28.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Winning Hooks Card View */}
          <div className="col-span-12 lg:col-span-5 bg-surface-container-low rounded-xl p-8">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Winning Hooks</h3>
            <div className="space-y-4">
              <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container transition-all">
                <div className="w-10 h-10 rounded-md bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-white font-bold">Direct Problem Solver</div>
                  <div className="text-[10px] text-secondary italic truncate">"I noticed your team is scaling infrastructure..."</div>
                </div>
                <div className="text-right">
                  <div className="text-tertiary font-black text-sm">42%</div>
                  <div className="text-[9px] uppercase tracking-tighter text-secondary font-bold">Conversion</div>
                </div>
              </div>
              
              <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container transition-all">
                <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>person_search</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-white font-bold">Mutual Context</div>
                  <div className="text-[10px] text-secondary italic truncate">"Following your recent talk at Tech Summit..."</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-black text-sm">31%</div>
                  <div className="text-[9px] uppercase tracking-tighter text-secondary font-bold">Conversion</div>
                </div>
              </div>
              
              <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container transition-all opacity-60">
                <div className="w-10 h-10 rounded-md bg-surface-container-high flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">link</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-white font-bold">Resource First</div>
                  <div className="text-[10px] text-secondary italic truncate">"Shared a case study relevant to your current..."</div>
                </div>
                <div className="text-right">
                  <div className="text-secondary font-black text-sm">18%</div>
                  <div className="text-[9px] uppercase tracking-tighter text-secondary font-bold">Conversion</div>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-2 border border-outline-variant/20 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-white hover:border-outline-variant/50 transition-all rounded">
                Generate More with AI
            </button>
          </div>
          
          {/* Campaign Health Section (Asymmetric Row) */}
          <div className="col-span-12 lg:col-span-4 bg-tertiary-container/90 rounded-xl p-8 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute -bottom-10 -right-10 opacity-20">
              <span className="material-symbols-outlined text-9xl text-black">insights</span>
            </div>
            <div className="relative z-10">
              <h4 className="text-black font-black text-3xl tracking-tighter leading-tight font-headline">Your outreach efficiency is in the top 1%.</h4>
            </div>
            <p className="text-black/80 text-sm font-medium mt-8 relative z-10 font-body">Automated A/B testing has reduced your cost-per-interview by 24% this month.</p>
          </div>

          <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl p-8 overflow-hidden relative">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-white font-bold uppercase tracking-widest text-xs">Active Campaign Trajectory</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="text-[10px] font-bold uppercase text-secondary">Hiring Partners</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/20"></span>
                  <span className="text-[10px] font-bold uppercase text-secondary">Cold Leads</span>
                </div>
              </div>
            </div>
            
            <div className="h-48 relative">
              {/* Abstract SVG Wave Chart */}
              <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#62ff96', stopOpacity: 0.2}}></stop>
                    <stop offset="100%" style={{stopColor: '#62ff96', stopOpacity: 0}}></stop>
                  </linearGradient>
                </defs>
                <path d="M0,150 C100,140 150,180 200,160 C250,140 300,80 400,100 C500,120 550,60 600,70 C700,90 750,40 800,20 L800,200 L0,200 Z" fill="url(#grad1)"></path>
                <path d="M0,150 C100,140 150,180 200,160 C250,140 300,80 400,100 C500,120 550,60 600,70 C700,90 750,40 800,20" fill="none" stroke="#62ff96" strokeWidth="3"></path>
                
                <path d="M0,180 C150,170 250,190 400,160 C550,130 650,150 800,120" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
