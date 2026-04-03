"use client";

import React from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function Header() {
  const { user } = useAppStore();

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-[#131313]/70 backdrop-blur-xl flex justify-between items-center px-8 shadow-2xl shadow-black/50 border-b border-outline-variant/10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-xl group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">search</span>
          <input 
            className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-outline/50 font-body text-on-surface" 
            placeholder="Search insights..." 
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-tertiary/10 rounded-full">
          <div className="w-1.5 h-1.5 bg-tertiary rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary font-headline">G-Sync Active</span>
        </div>
        <button className="text-secondary hover:text-white transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-tertiary rounded-full"></span>
        </button>
        <div className="h-6 w-px bg-outline-variant/20"></div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30 bg-tertiary/20 flex items-center justify-center">
            {user?.full_name ? (
              <span className="text-xs font-bold text-tertiary">{user.full_name.charAt(0)}</span>
            ) : (
              <span className="material-symbols-outlined text-sm text-tertiary">person</span>
            )}
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="text-xs font-bold text-white leading-none">{user?.full_name || 'Anonymous User'}</span>
            <span className="text-[10px] text-secondary mt-1 tracking-widest uppercase">
              {user?.id ? `ID_${user.id.slice(-4)}` : 'GUEST_00'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
