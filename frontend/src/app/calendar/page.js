"use client";
import React from 'react';

export default function Calendar() {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pt-8">
      <div className="p-8 pb-32 max-w-[1400px] mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter text-white mb-2 font-headline">Command Center: Calendar</h1>
            <p className="text-secondary font-body">Synchronized with Google Workspace and Obsidian Outlook Sync.</p>
          </div>
          <button className="bg-white text-black px-6 py-3 font-bold uppercase tracking-widest text-[10px] rounded-lg hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-white/5">
            <span className="material-symbols-outlined text-sm">add</span>
            New Event Block
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Calendar Space (Abstracted for UI purposes) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Today's Schedule List */}
            <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden">
              <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest">
                <h3 className="font-headline font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary">today</span>
                  Today's Pipeline
                </h3>
                <span className="text-[10px] font-bold uppercase text-outline">Oct 14, 2023</span>
              </div>
              
              <div className="p-6 space-y-6">
                
                {/* Event 1 (Interview) */}
                <div className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-white">09:00</span>
                    <span className="text-[10px] text-outline font-bold">AM</span>
                    <div className="flex-1 w-px bg-tertiary/30 mt-2 mb-1 group-hover:bg-tertiary transition-colors"></div>
                  </div>
                  <div className="flex-1 bg-surface-container p-5 rounded-lg border-l-2 border-tertiary hover:bg-surface-bright transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-tertiary/10 text-tertiary px-2 py-0.5 rounded text-[8px] font-black uppercase">Recruiter Screen</span>
                      <span className="text-secondary text-[10px] uppercase font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">schedule</span> 30m
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-sm">Scale AI - Engineering Intro</h4>
                    <p className="text-xs text-secondary mt-1">w/ Sarah Jenkins (Lead TA)</p>
                    
                    <div className="mt-4 p-3 bg-surface-container-lowest rounded border border-outline-variant/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-sm">auto_awesome</span>
                        <span className="text-[10px] text-white font-bold uppercase tracking-tight">AI Prep Brief Active</span>
                      </div>
                      <button className="text-[10px] text-secondary hover:text-white uppercase font-bold tracking-widest border border-outline-variant/30 px-3 py-1 rounded transition-colors bg-surface-container">View PDF</button>
                    </div>
                  </div>
                </div>

                {/* Event 2 (Deep Work Session) */}
                <div className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-white">11:30</span>
                    <span className="text-[10px] text-outline font-bold">AM</span>
                    <div className="flex-1 w-px bg-outline-variant/30 mt-2 mb-1"></div>
                  </div>
                  <div className="flex-1 bg-surface-container-lowest p-5 rounded-lg border-l-2 border-outline-variant/30 hover:bg-surface-container hover:border-outline-variant/50 transition-all cursor-pointer opacity-80 group-hover:opacity-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-surface-container-high text-white px-2 py-0.5 rounded text-[8px] font-black uppercase">Deep Work Block</span>
                      <span className="text-secondary text-[10px] uppercase font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">schedule</span> 2h 00m
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-sm">Take-home Assignment: System System Design</h4>
                    <p className="text-xs text-secondary mt-1">Architecture block for Stripe interview loop</p>
                  </div>
                </div>

                {/* Event 3 (Technical Interview) */}
                <div className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-white">02:15</span>
                    <span className="text-[10px] text-outline font-bold">PM</span>
                    <div className="flex-1 w-px bg-transparent mt-2"></div>
                  </div>
                  <div className="flex-1 bg-[#1a1c1c] p-5 rounded-lg border-l-2 border-[#ffdad6]/40 hover:bg-[#201f1f] transition-all cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#ffb4ab]/5 blur-[30px]"></div>
                    <div className="flex justify-between items-start mb-2 relative z-10">
                      <span className="bg-[#93000a] text-[#ffdad6] px-2 py-0.5 rounded text-[8px] font-black uppercase">Technical Round (Hard)</span>
                      <span className="text-[#ffb4ab]/70 text-[10px] uppercase font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">videocam</span> Google Meet
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-sm relative z-10">Stripe - System Design & Architecture</h4>
                    <p className="text-xs text-[#ffb4ab]/70 mt-1 relative z-10">w/ Marcus Thorne (Staff Engineer)</p>
                    
                    <div className="mt-4 p-3 bg-black/40 rounded border border-[#ffb4ab]/10 flex flex-col gap-2 relative z-10">
                      <span className="text-[9px] uppercase tracking-widest text-[#ffdad6] font-bold">AI Threat Intel:</span>
                      <p className="text-xs text-secondary">Marcus is known for grilling candidates on <span className="text-white">Idempotency</span> and <span className="text-white">Distributed Locks</span>. Review the Stripe API documentation context loaded in Vault.</p>
                      <button className="mt-1 self-start text-[10px] bg-[#313030] text-white hover:bg-white hover:text-black uppercase font-bold tracking-widest px-3 py-1.5 rounded transition-colors">Launch Practice Protocol</button>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Full Month Calendar View */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline">calendar_month</span>
                  October 2023
                </h3>
                <div className="flex gap-2">
                  <button className="w-8 h-8 flex items-center justify-center bg-surface-container rounded hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined text-sm text-secondary">chevron_left</span></button>
                  <button className="w-8 h-8 flex items-center justify-center bg-surface-container rounded hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined text-sm text-secondary">chevron_right</span></button>
                </div>
              </div>

              {/* Days of week */}
              <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <span key={day} className="text-[10px] uppercase tracking-widest font-bold text-outline">{day}</span>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Empty slots for previous month */}
                <div className="h-16 rounded border border-transparent"></div>
                <div className="h-16 rounded border border-transparent"></div>
                <div className="h-16 rounded border border-transparent"></div>
                <div className="h-16 rounded border border-transparent"></div>

                {/* Days 1-31 */}
                {[...Array(31)].map((_, i) => {
                  const day = i + 1;
                  const isToday = day === 14;
                  const hasInterview = [3, 9, 14, 18, 22].includes(day);
                  const hasDeadline = [7, 14, 25].includes(day);

                  return (
                    <div 
                      key={day} 
                      className={`h-16 p-1 flex flex-col items-start border rounded transition-colors cursor-pointer group hover:bg-surface-container relative
                        ${isToday ? 'border-tertiary bg-tertiary/5' : 'border-outline-variant/5 bg-surface-container-lowest hover:border-outline-variant/30'}
                      `}
                    >
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isToday ? 'bg-tertiary text-black' : 'text-secondary'}`}>{day}</span>
                      
                      <div className="flex-1 w-full flex flex-col gap-0.5 justify-end mt-1 px-1">
                         {hasInterview && <div className="h-1 w-full bg-[#ffdad6] rounded-full"></div>}
                         {hasDeadline && <div className="h-1 w-full bg-error rounded-full"></div>}
                      </div>

                      {/* Tooltip on hover */}
                      {(hasInterview || hasDeadline) && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+4px)] bg-surface-container px-2 py-1 rounded text-[9px] font-bold text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap border border-outline-variant/20 tracking-widest uppercase">
                          {hasInterview ? 'Interviews ' : ''}
                          {hasDeadline ? 'Deadlines ' : ''}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 flex gap-4 pt-4 border-t border-outline-variant/10 px-2">
                 <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-outline">
                    <span className="w-2 h-2 rounded-full bg-[#ffdad6]"></span>
                    Interview Loop
                 </div>
                 <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-outline">
                    <span className="w-2 h-2 rounded-full bg-error"></span>
                    Deadline / Task
                 </div>
                 <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-outline">
                    <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                    Today
                 </div>
              </div>
            </div>
            
          </div>

          {/* Right Sidebar: Sync Config & Upcoming Deadlines */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* Sync Status Bento */}
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10 relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-6 -top-6 text-9xl text-white/5 pointer-events-none">sync</span>
              <h3 className="font-bold uppercase tracking-widest text-xs text-white mb-4">Integrations</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-surface-container-low p-3 rounded border border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" className="w-5 h-5" alt="GCal"/>
                    <span className="text-xs font-bold text-white">Google Workspace</span>
                  </div>
                  <span className="text-[10px] text-tertiary font-bold uppercase">Synced</span>
                </div>
                
                <div className="flex items-center justify-between bg-surface-container-low p-3 rounded border border-outline-variant/20 opacity-50 grayscale">
                  <div className="flex items-center gap-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg" className="w-5 h-5" alt="Outlook"/>
                    <span className="text-xs font-bold text-white">Outlook 365</span>
                  </div>
                  <button className="text-[10px] text-white hover:text-tertiary font-bold uppercase transition-colors">Connect</button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
              <h3 className="font-bold uppercase tracking-widest text-xs text-white mb-4">Availability Management</h3>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">Let AI dynamically generate single-use booking links based on your open slots and interview priority rules.</p>
              
              <button className="w-full mb-3 flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded font-bold uppercase text-[10px] tracking-widest hover:bg-secondary transition-colors">
                <span className="material-symbols-outlined text-[16px]">add_link</span> Generate Target Link
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-outline-variant/30 text-white py-2.5 rounded font-bold uppercase text-[10px] tracking-widest hover:border-white transition-colors">
                Configure Rule Engine
              </button>
            </div>

            {/* Action Items */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
              <h3 className="font-bold uppercase tracking-widest text-xs text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-error" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
                Pending Required Actions
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <button className="mt-0.5 w-4 h-4 rounded border border-outline-variant/50 hover:border-tertiary flex-shrink-0 transition-colors"></button>
                  <div>
                    <p className="text-xs font-bold text-white">Submit take-home repository to Vercel team</p>
                    <p className="text-[10px] text-error font-bold uppercase mt-1">Due in 5 Hours</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <button className="mt-0.5 w-4 h-4 rounded border border-outline-variant/50 hover:border-tertiary flex-shrink-0 transition-colors"></button>
                  <div>
                    <p className="text-xs font-bold text-white">Confirm interview slot with Anthropic TA</p>
                    <p className="text-[10px] text-secondary font-bold uppercase mt-1">Due Tomorrow</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
