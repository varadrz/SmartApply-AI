"use client";
import React, { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function Interviews() {
  const { interviews, intLoading, fetchInterviews, updateInterviewStage } = useAppStore();

  useEffect(() => {
    fetchInterviews();
  }, [fetchInterviews]);

  const stages = [
    { id: 'Recruiter Screen', label: 'Recruiter Screen', icon: 'support_agent', color: 'text-outline' },
    { id: 'Technical Assessment', label: 'Technical Assessment', icon: 'code_blocks', color: 'text-tertiary' },
    { id: 'Final/Onsite', label: 'Final/Onsite', icon: 'meeting_room', color: 'text-[#ffb4ab]' },
    { id: 'Offer', label: 'Offer Stage', icon: 'contract', color: 'text-outline' },
  ];

  const getInterviewsByStage = (stageId) => interviews.filter(i => i.stage === stageId);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pt-8 flex flex-col h-[calc(100vh-4rem)]">
      <div className="px-8 pb-4 max-w-[1600px] w-full mx-auto flex-shrink-0">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter text-white font-headline">Active Pipeline</h1>
            <p className="text-secondary font-body mt-1">Manage advancing processes and configure AI prep parameters.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container px-4 py-2 border border-outline-variant/20 rounded-lg flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary">
              <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(98,255,150,0.5)]"></span>
              {interviews.length} Active Processes
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto no-scrollbar px-8 pb-8 max-w-[1600px] w-full mx-auto flex gap-6 items-start mt-6">
        {stages.map(stage => (
          <div key={stage.id} className="w-[380px] flex-shrink-0 flex flex-col bg-surface-container-lowest/50 rounded-xl border border-outline-variant/5 min-h-[600px]">
             <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center sticky top-0 bg-surface/90 backdrop-blur z-10 rounded-t-xl">
               <span className="font-black text-white text-[10px] uppercase tracking-widest flex items-center gap-2">
                 <span className={`material-symbols-outlined text-sm ${stage.color}`}>{stage.icon}</span>
                 {stage.label}
               </span>
               <span className="bg-surface-container-high text-outline text-[10px] px-2 py-0.5 rounded font-black border border-outline-variant/10">
                 {getInterviewsByStage(stage.id).length}
               </span>
             </div>

             <div className="p-3 space-y-4">
               {intLoading && interviews.length === 0 ? (
                 <div className="py-20 text-center opacity-20 animate-pulse">
                    <span className="material-symbols-outlined text-4xl mb-2">hourglass_empty</span>
                 </div>
               ) : getInterviewsByStage(stage.id).length === 0 ? (
                 <div className="py-20 text-center opacity-20">
                    <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Stage</p>
                 </div>
               ) : (
                 getInterviewsByStage(stage.id).map(interview => (
                   <div key={interview.id} className="bg-surface-container rounded-xl border border-outline-variant/10 p-5 hover:border-tertiary/30 transition-all group cursor-pointer shadow-lg hover:shadow-tertiary/5">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[9px] font-black uppercase bg-surface-container-high text-white px-2 py-1 rounded-sm tracking-tighter border border-outline-variant/20">{interview.company_name}</span>
                        <span className="material-symbols-outlined text-outline text-sm hover:text-white transition-colors">more_horiz</span>
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1 line-clamp-2 leading-tight font-headline">{interview.role_title}</h4>
                      
                      <div className="flex items-center gap-2 p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/10 mb-4 mt-3 group-hover:bg-surface-bright transition-colors">
                        <span className="material-symbols-outlined text-xs text-outline">event</span>
                        <span className="text-[10px] font-bold text-outline uppercase">{new Date(interview.scheduled_at).toLocaleDateString()} at {new Date(interview.scheduled_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>

                      <div className="flex justify-between items-end border-t border-outline-variant/10 pt-4 mt-2">
                        <div className="flex flex-col">
                          <span className="text-[8px] uppercase font-black text-outline tracking-wider mb-1">Win Probability</span>
                          <span className={`text-sm font-black ${interview.win_probability > 50 ? 'text-tertiary' : 'text-white'}`}>{interview.win_probability}%</span>
                        </div>
                        <button className="text-[9px] bg-white text-black px-3 py-1.5 uppercase tracking-widest font-black rounded-lg hover:bg-tertiary transition-all active:scale-95">Intelligence Prep</button>
                      </div>
                   </div>
                 ))
               )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
