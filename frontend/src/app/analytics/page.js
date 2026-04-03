"use client";

import React from 'react';

import { useAppStore } from '@/store/useAppStore';

export default function Analytics() {
  const { analytics, fetchAnalytics } = useAppStore();

  React.useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const totalTracked = analytics.total_tracked || 0;
  const totalSent = analytics.total_sent || 0;
  const repliedCount = analytics.replied || 0;
  const matchRate = analytics.match_rate || 0;
  const replyRate = totalSent > 0 ? Math.round((repliedCount / totalSent) * 100) : 0;

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pt-8">
      <div className="p-8 pb-32 space-y-8 max-w-[1400px] mx-auto">
        {/* Hero Header */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tighter text-white mb-2 font-headline">Outreach Intelligence</h2>
            <p className="text-secondary font-body">Performance funnel and match analysis for your current campaign.</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-surface-container px-4 py-2 rounded-lg flex items-center gap-3">
              <span className="text-tertiary text-xs font-bold uppercase tracking-widest">Global Match</span>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-tertiary/10 rounded-full">
                <span className="material-symbols-outlined text-[14px] text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                <span className="text-tertiary text-xs font-bold">{matchRate}%</span>
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
              <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">Lifetime Stats</span>
            </div>
            
            <div className="flex items-end gap-2 h-64">
              {/* Tracked */}
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-surface-container-high rounded-t-lg relative transition-all group-hover:bg-surface-bright" style={{height: '100%'}}>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/10 to-transparent h-full"></div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-white font-black text-lg">{totalTracked}</div>
                </div>
                <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-secondary">Tracked</span>
              </div>
              {/* Sent */}
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-surface-container-high rounded-t-lg relative transition-all group-hover:bg-surface-bright" style={{height: `${totalTracked > 0 ? (totalSent / totalTracked) * 100 : 0}%`}}>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/5 to-transparent h-full"></div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-white font-black text-lg">{totalSent}</div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-tertiary text-[10px] font-bold">{totalTracked > 0 ? Math.round((totalSent / totalTracked) * 100) : 0}%</div>
                </div>
                <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-secondary">Sent</span>
              </div>
              {/* Replied */}
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-tertiary rounded-t-lg relative transition-all group-hover:opacity-90" style={{height: `${totalSent > 0 ? (repliedCount / totalSent) * 100 : 0}%`}}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-tertiary font-black text-lg">{repliedCount}</div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-black text-[10px] font-bold">{replyRate}%</div>
                </div>
                <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-tertiary">Replied</span>
              </div>
              {/* Success */}
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-surface-container-high rounded-t-lg relative transition-all group-hover:bg-surface-bright" style={{height: '10%'}}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-white font-black text-lg">-</div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white/50 text-[10px] font-bold">10%</div>
                </div>
                <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-secondary">Interviews</span>
              </div>
            </div>
          </div>

          {/* Match Rate Trend Line */}
          <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-xl p-8 flex flex-col">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Match Evolution</h3>
            <div className="flex-1 flex items-end justify-between gap-1 mb-4">
              {(analytics.trend || []).map((t, i) => (
                 <div key={i} className="w-4 bg-tertiary rounded-t-sm" style={{height: `${t.value}%`, opacity: i === (analytics.trend.length-1) ? 1 : 0.3}}></div>
              ))}
            </div>
            <div className="mt-auto">
              <div className="text-4xl font-black text-white">{matchRate}%</div>
              <p className="text-secondary text-xs mt-1">Current Skill Match Score</p>
              <div className="mt-4 pt-4 border-t border-outline-variant/20 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Efficiency</span>
                <span className="text-tertiary font-bold text-xs">Optimum</span>
              </div>
            </div>
          </div>

          {/* AI Insights & Trajectory */}
          <div className="col-span-12 lg:col-span-12 bg-tertiary-container/90 rounded-xl p-8 flex flex-col justify-between overflow-hidden relative min-h-[200px]">
            <div className="absolute -bottom-10 -right-10 opacity-20">
              <span className="material-symbols-outlined text-9xl text-black">insights</span>
            </div>
            <div className="relative z-10 max-w-2xl">
              <h4 className="text-black font-black text-3xl tracking-tighter leading-tight font-headline">Insights generated from your latest {totalTracked} applications.</h4>
              <p className="text-black/80 text-sm font-medium mt-4 font-body">Your personalized outreach is achieving a {replyRate}% reply rate, significantly higher than industry averages. Keep iterating on your tech stack presentation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
