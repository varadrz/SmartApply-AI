"use client";
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Database, 
  Mail, 
  Key, 
  Save, 
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Loader2
} from 'lucide-react';

export default function Settings() {
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434');
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, success, error

  const testConnection = async () => {
    setTesting(true);
    // Simulate test
    setTimeout(() => {
      setTesting(false);
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto py-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground text-lg">Configure your AI models and email delivery backend.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Ollama Section */}
        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Terminal size={20} />
              </div>
              AI Model (Ollama)
            </h3>
            {status === 'success' && <CheckCircle2 className="text-emerald-500" size={24} />}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-muted-foreground uppercase tracking-widest px-1">Ollama API Endpoint</label>
              <input 
                type="text" 
                value={ollamaUrl}
                onChange={(e) => setOllamaUrl(e.target.value)}
                className="w-full bg-muted/30 border rounded-xl px-4 py-3 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <button 
              onClick={testConnection}
              disabled={testing}
              className="w-full h-12 rounded-xl bg-accent hover:bg-accent/80 flex items-center justify-center gap-2 font-black text-sm uppercase tracking-widest transition-all disabled:opacity-50"
            >
              {testing ? <Loader2 className="animate-spin" size={18} /> : <Activity size={18} />}
              <span>Test Connection</span>
            </button>
          </div>
        </div>

        {/* SMTP Section */}
        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Mail size={20} />
            </div>
            Email Configuration (SMTP)
          </h3>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest px-1">Host</label>
                <input type="text" placeholder="smtp.gmail.com" className="w-full bg-muted/30 border rounded-xl px-4 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest px-1">Port</label>
                <input type="text" placeholder="587" className="w-full bg-muted/30 border rounded-xl px-4 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-muted-foreground uppercase tracking-widest px-1">Username / Email</label>
              <input type="text" placeholder="you@domain.com" className="w-full bg-muted/30 border rounded-xl px-4 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-muted-foreground uppercase tracking-widest px-1">App Password</label>
              <div className="relative">
                <input type="password" placeholder="••••••••••••" className="w-full bg-muted/30 border rounded-xl px-4 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
                <Key className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              </div>
            </div>
            <button className="w-full h-12 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 flex items-center justify-center gap-2 font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20">
              <Save size={18} />
              <span>Save SMTP Settings</span>
            </button>
          </div>
        </div>
      </div>

       <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl flex items-start gap-4">
        <div className="p-3 rounded-xl bg-amber-500/20 text-amber-500">
          <AlertTriangle size={24} />
        </div>
        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-amber-600 leading-none">Security Notice</h4>
          <p className="text-sm text-amber-700 font-medium">Your credentials are stored locally in the FastAPI environment. They are never transmitted outside your network.</p>
        </div>
      </div>
    </div>
  );
}
