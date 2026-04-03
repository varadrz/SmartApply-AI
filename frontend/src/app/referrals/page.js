"use client";
import React from 'react';
import { Users, MessageSquare, Copy, ExternalLink, ShieldCheck, Globe } from 'lucide-react';

export default function Referrals() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto py-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">LinkedIn & Referrals</h2>
        <p className="text-muted-foreground text-lg">Leverage your network with AI-assisted referral requests.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-96">
        <div className="bg-card border rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-6 border-dashed opacity-60">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
            <Globe size={32} />
          </div>
          <div className="max-w-md">
            <h3 className="text-xl font-bold mb-2">LinkedIn Integration</h3>
            <p className="text-muted-foreground font-medium">Connect your account to see mutual connections and 1st-degree contacts at your target companies.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold">
            <Users size={18} />
            <span>Connect Profile</span>
          </button>
        </div>

        <div className="bg-card border rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-6 border-dashed opacity-60">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <MessageSquare size={32} />
          </div>
          <div className="max-w-md">
            <h3 className="text-xl font-bold mb-2">Referral Generation</h3>
            <p className="text-muted-foreground font-medium">Based on your shared history, we'll generate the perfect non-awkward referral message.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-black text-muted-foreground uppercase tracking-widest mt-4">
            <span className="px-3 py-1 bg-muted rounded-lg border">Casual</span>
            <span className="px-3 py-1 bg-muted rounded-lg border">Technical</span>
            <span className="px-3 py-1 bg-muted rounded-lg border">Direct</span>
          </div>
        </div>
      </div>
    </div>
  );
}
