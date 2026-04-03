"use client";

import React from 'react';

export default function Header() {
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
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30">
            <img 
              alt="User Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRX_H3B5g7kUeyfUrLg25cKhpNrw4MH3sfUU5X6J6fr5KL0vFjd3agEFnlOAYKqPGWf5YSzHHSH0jhtT-_4C7AGVc8-fsFrnNrekgqhxC9kGtvVFO3esXfwVfC5FL0V4236MTYdaxxoMVulRUhwDo8QzRT2YNfTy_0T6uYrgpP7eHhkkElolmS-1LRPyaEio2iRHKu-NQk5rHUkwSNccE5p5jnyUwAPa1sybSfrj9BHuZUR6tHwVkiRbo68wrnB9_tVmHV5IpZpY0"
            />
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="text-xs font-bold text-white leading-none">Marcus Thorne</span>
            <span className="text-[10px] text-secondary mt-1 tracking-widest uppercase">ID_8829-00</span>
          </div>
        </div>
      </div>
    </header>
  );
}
