"use client";
import React from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function Calendar() {
  const { events, calLoading, fetchEvents, addEvent } = useAppStore();
  const [showAddModal, setShowAddModal] = React.useState(false);

  React.useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pt-8">
      <div className="p-8 pb-32 max-w-[1400px] mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter text-white mb-2 font-headline">Command Center: Calendar</h1>
            <p className="text-secondary font-body">Synchronized with Google Workspace and Obsidian Outlook Sync.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-white text-black px-6 py-3 font-bold uppercase tracking-widest text-[10px] rounded-lg hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-white/5"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Event Block
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Calendar Space */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Today's Schedule List */}
            <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden">
              <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest">
                <h3 className="font-headline font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary">today</span>
                  Upcoming Pipeline
                </h3>
                <span className="text-[10px] font-bold uppercase text-outline">{new Date().toLocaleDateString()}</span>
              </div>
              
              <div className="p-6 space-y-6">
                {calLoading && events.length === 0 ? (
                  <div className="py-20 text-center opacity-40 animate-pulse">
                    <p className="text-xs font-bold uppercase tracking-widest">Synchronizing Engine...</p>
                  </div>
                ) : events.length === 0 ? (
                  <div className="py-20 text-center opacity-40">
                    <p className="text-xs font-bold uppercase tracking-widest">No Events Scheduled</p>
                  </div>
                ) : (
                  events.map((event, i) => (
                    <div key={event.id || i} className="flex gap-6 group">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-black text-white">{event.start_time?.split('T')[1]?.substring(0, 5) || '??:??'}</span>
                        <div className="flex-1 w-px bg-tertiary/30 mt-2 mb-1 group-hover:bg-tertiary transition-colors"></div>
                      </div>
                      <div className="flex-1 bg-surface-container p-5 rounded-lg border-l-2 border-tertiary hover:bg-surface-bright transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <span className="bg-tertiary/10 text-tertiary px-2 py-0.5 rounded text-[8px] font-black uppercase">{event.event_type || 'Interview'}</span>
                        </div>
                        <h4 className="text-white font-bold text-sm">{event.title}</h4>
                        <p className="text-xs text-secondary mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

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
              </div>
            </div>
          </div>
        </div>      </div>
    </div>
  );
}
