"use client";
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Copy, 
  ShieldCheck, 
  Code2, 
  Sparkles,
  Loader2,
  CheckCircle2,
  Mail
} from 'lucide-react';
import Link from 'next/link';
import { useOutreachStore } from '@/store/useOutreachStore';
import axios from 'axios';
import { useParams } from 'next/navigation';

const API_BASE = 'http://127.0.0.1:8000';

export default function CompanyDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [emailBody, setEmailBody] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const { updateStatus } = useOutreachStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/outreach/${id}`);
        setData(res.data);
        setEmailBody(res.data.email_body || '');
        setEmailSubject(res.data.email_subject || '');
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch detail:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.patch(`${API_BASE}/outreach/${id}`, {
        email_body: emailBody,
        email_subject: emailSubject
      });
      setSaving(false);
    } catch (err) {
      console.error("Failed to save:", err);
      setSaving(false);
    }
  };

  const handleMarkSent = async () => {
    await updateStatus(parseInt(id), 'sent');
    setData(prev => ({ ...prev, status: 'sent' }));
  };

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4 text-muted-foreground">
      <Loader2 className="animate-spin" size={48} />
      <p className="text-lg font-medium">Fetching detailed analysis...</p>
    </div>
  );

  if (!data) return (
    <div className="text-center py-20">
      <p className="text-xl font-bold text-destructive">Company analysis not found.</p>
      <Link href="/" className="text-primary hover:underline mt-4 inline-block">Return to Dashboard</Link>
    </div>
  );

  const fullResult = JSON.parse(data.full_result || '{}');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
          <div className="p-2 rounded-lg group-hover:bg-accent transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span className="font-bold">Back to Control Panel</span>
        </Link>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 rounded-lg border bg-card hover:bg-accent transition-all font-bold"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            <span>Save Draft</span>
          </button>
          <button 
            onClick={handleMarkSent}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold shadow-lg shadow-primary/20"
          >
            <Send size={18} />
            <span>Send Outreach</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Intelligence */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                <Code2 size={20} />
              </div>
              Company Insights
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-3">Tech Stack Identified</label>
                <div className="flex flex-wrap gap-2">
                  {(fullResult.company_intel?.tech_stack || []).map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-muted text-foreground text-xs font-bold border">{tech}</span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-3">Hiring Signal Details</label>
                <ul className="space-y-3">
                  {(fullResult.company_intel?.hiring_signals || []).map((signal, i) => (
                    <li key={i} className="text-sm text-foreground/80 flex items-start gap-3 bg-muted/30 p-3 rounded-lg border">
                      <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" /> 
                      <span className="font-medium">{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-sm border-indigo-500/20 bg-indigo-500/[0.02]">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
               <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <ShieldCheck size={20} />
              </div>
              Match Analysis
            </h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-black text-foreground">{data.match_score}</span>
              <span className="text-xl font-bold text-muted-foreground">/ 100</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              {fullResult.match?.reasoning || "Reasoning not available."}
            </p>
          </div>
        </div>

        {/* Right Column: Email Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-2xl flex flex-col h-full shadow-lg">
            <div className="p-6 border-b bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Email Editor</h3>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Drafting personalized outreach</p>
                </div>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(emailBody)}
                className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-all"
                title="Copy body"
              >
                <Copy size={20} />
              </button>
            </div>

            <div className="p-6 flex-1 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest">Subject Line</label>
                  <span className="text-[10px] font-bold px-2 py-1 bg-indigo-500/10 text-indigo-500 rounded-md">Generated</span>
                </div>
                <input 
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full bg-muted/30 border rounded-xl px-4 py-3 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest">Message Body</label>
                <textarea 
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full bg-muted/10 border rounded-2xl p-6 min-h-[400px] font-medium text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/50 transition-all resize-none"
                  placeholder="The generated email will appear here..."
                />
              </div>
            </div>

            <div className="p-4 border-t bg-muted/10">
               <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-500" />
                  Status: {data.status}
                </span>
                <span>{emailBody.split(/\s+/).filter(x => x).length} Words</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
