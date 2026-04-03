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
import { useEmailStore } from '@/store/useEmailStore';
import axios from 'axios';
import { useParams } from 'next/navigation';

const API_BASE = 'http://127.0.0.1:8001/api/v1';

import { toast } from 'react-hot-toast';

export default function CompanyDetail() {
  const { id } = useParams();
  const { selectedCompany: data, fetchCompanyDetail, loading } = useOutreachStore();
  const { sendEmail, emailStatus } = useEmailStore();
  
  const [saving, setSaving] = useState(false);
  const [emailBody, setEmailBody] = useState('');
  const [emailSubject, setEmailSubject] = useState('');

  useEffect(() => {
    const load = async () => {
      const res = await fetchCompanyDetail(id);
      if (res) {
        setEmailBody(res.email_body || '');
        setEmailSubject(res.email_subject || '');
      }
    };
    load();
  }, [id, fetchCompanyDetail]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.patch(`${API_BASE}/company/${id}`, {
        email_body: emailBody,
        email_subject: emailSubject
      });
      toast.success("Draft saved successfully");
      setSaving(false);
    } catch (err) {
      toast.error("Failed to save draft");
      console.error("Failed to save:", err);
      setSaving(false);
    }
  };

  const handleSend = async () => {
    const success = await sendEmail(id);
    if (success) {
      toast.success("Outreach email sent!");
    } else {
      toast.error("Failed to send email");
    }
  };

  if (loading || !data) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4 text-muted-foreground">
      <Loader2 className="animate-spin text-tertiary" size={48} />
      <p className="text-lg font-medium">Fetching detailed analysis...</p>
    </div>
  );

  const fullResult = data.full_result || {};

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-outline hover:text-white transition-colors group">
          <div className="p-2 rounded-lg group-hover:bg-surface-container transition-colors border border-transparent group-hover:border-outline-variant/20">
            <ArrowLeft size={20} />
          </div>
          <span className="font-bold uppercase tracking-widest text-xs">Control Panel</span>
        </Link>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 rounded-lg border border-outline-variant/20 bg-surface-container-low hover:bg-surface-container transition-all font-bold text-white text-sm"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            <span>Save Draft</span>
          </button>
          <button 
            onClick={handleSend}
            disabled={emailStatus === 'sending'}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-tertiary text-on-tertiary hover:opacity-90 transition-all font-bold shadow-lg shadow-tertiary/10 text-sm"
          >
            {emailStatus === 'sending' ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            <span>Send Outreach</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Intelligence */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
              <div className="p-2 rounded-lg bg-tertiary/10 text-tertiary border border-tertiary/20">
                <Code2 size={20} />
              </div>
              Target Intelligence
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-outline uppercase tracking-widest block mb-3">Tech Stack Detected</label>
                <div className="flex flex-wrap gap-2">
                  {(fullResult.tech_stack || []).map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-surface-container text-white text-xs font-bold border border-outline-variant/10">{tech}</span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-outline uppercase tracking-widest block mb-3">Hiring Signal Details</label>
                <ul className="space-y-3">
                  {(fullResult.hiring_signals || []).map((signal, i) => (
                    <li key={i} className="text-sm text-on-surface-variant flex items-start gap-3 bg-surface-container/30 p-3 rounded-lg border border-outline-variant/5">
                      <CheckCircle2 size={16} className="text-tertiary mt-0.5 shrink-0" /> 
                      <span className="font-medium">{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low border border-tertiary/20 rounded-2xl p-6 bg-tertiary/[0.02]">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-white">
               <div className="p-2 rounded-lg bg-tertiary/10 text-tertiary border border-tertiary/10">
                <ShieldCheck size={20} />
              </div>
              Match Analysis
            </h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-black text-white">{data.match_score}</span>
              <span className="text-xl font-bold text-outline">/ 100</span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
              {data.analysis_summary || "Automated reasoning based on extracted job requirements and profile matching."}
            </p>
          </div>
        </div>

        {/* Right Column: Email Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl flex flex-col h-full shadow-lg overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 bg-surface-container/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-tertiary/10 text-tertiary border border-tertiary/20">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Email Editor</h3>
                  <p className="text-[10px] text-outline font-bold uppercase tracking-widest">Drafting personalized outreach</p>
                </div>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(emailBody)}
                className="p-2 rounded-lg hover:bg-surface-container text-outline hover:text-white transition-all border border-transparent hover:border-outline-variant/20"
                title="Copy body"
              >
                <Copy size={20} />
              </button>
            </div>

            <div className="p-6 flex-1 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-outline uppercase tracking-widest">Subject Line</label>
                  <span className="text-[8px] font-bold px-2 py-1 bg-tertiary/10 text-tertiary rounded-md border border-tertiary/20">AI OPTIMIZED</span>
                </div>
                <input 
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full bg-surface-container/30 border border-outline-variant/20 rounded-xl px-4 py-4 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-tertiary/10 focus:border-tertiary transition-all text-white placeholder:text-outline/50"
                  placeholder="Subject line..."
                />
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <label className="text-[10px] font-black text-outline uppercase tracking-widest">Message Body</label>
                <textarea 
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full bg-surface-container/10 border border-outline-variant/10 rounded-2xl p-6 min-h-[450px] font-medium text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-tertiary/5 focus:border-tertiary/30 transition-all resize-none text-on-surface-variant scrollbar-thin"
                  placeholder="The generated email will appear here..."
                />
              </div>
            </div>

            <div className="p-4 border-t border-outline-variant/10 bg-surface-container/20">
               <div className="flex items-center justify-between text-[10px] font-bold text-outline uppercase tracking-widest px-2">
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className="text-tertiary" />
                  Status: <span className={data.status === 'sent' ? 'text-tertiary' : 'text-white'}>{data.status}</span>
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
