"use client";
import React from 'react';
import { Target, Calendar, ExternalLink, Filter, Search, MoreHorizontal } from 'lucide-react';

export default function Opportunities() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Opportunity Tracker</h2>
          <p className="text-muted-foreground text-lg">Hackathons, Internships, and High-Impact Roles.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-card hover:bg-accent transition-all font-bold">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold">
            <Search size={18} />
            <span>Search</span>
          </button>
        </div>
      </div>

      <div className="bg-card border rounded-2xl p-12 text-center flex flex-col items-center gap-6 border-dashed opacity-60">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Target size={32} />
        </div>
        <div className="max-w-md">
          <h3 className="text-xl font-bold mb-2">Opportunities coming soon</h3>
          <p className="text-muted-foreground font-medium">The intelligent tracker is currently scanning Devfolio, Unstop, and LinkedIn. Results will appear here in the next update.</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-black text-muted-foreground uppercase tracking-widest mt-4">
          <span className="px-3 py-1 bg-muted rounded-lg border">Devfolio</span>
          <span className="px-3 py-1 bg-muted rounded-lg border">Unstop</span>
          <span className="px-3 py-1 bg-muted rounded-lg border">MLH</span>
          <span className="px-3 py-1 bg-muted rounded-lg border">LinkedIn</span>
        </div>
      </div>
    </div>
  );
}
