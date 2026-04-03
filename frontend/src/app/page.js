"use client";
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  ExternalLink, 
  Mail, 
  Copy, 
  MoreHorizontal,
  Loader2,
  AlertCircle,
  LayoutDashboard
} from 'lucide-react';
import { useOutreachStore } from '@/store/useOutreachStore';
import Link from 'next/link';

const StatusBadge = ({ status }) => {
  const styles = {
    draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
    sent: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    replied: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${styles[status] || styles.draft}`}>
      {status}
    </span>
  );
};

const MatchScore = ({ score }) => {
  const color = score >= 80 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-rose-500';
  return <span className={`font-bold ${color}`}>{score}%</span>;
};

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const { companies, loading, error, fetchCompanies, analyzeCompany } = useOutreachStore();

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    try {
      await analyzeCompany(url);
      setUrl('');
    } catch (err) {
      // Error is handled in store
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Outreach Control</h2>
        <p className="text-muted-foreground text-lg">Analyze companies and generate personalized emails in seconds.</p>
      </div>

      {/* Analysis UI */}
      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input 
              type="url" 
              placeholder="Enter company website URL (e.g., https://openai.com)" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-background border rounded-lg pl-10 pr-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
            <span>Analyze</span>
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Companies Table */}
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Company Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Match Score</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Prob</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-lg group-hover:text-primary transition-colors">
                      {company.company_name || 'Analyzing...'}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium truncate max-w-[200px]">
                      {company.company_url}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <MatchScore score={company.match_score} />
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {company.selection_probability || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={company.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Link 
                        href={`/company/${company.id}`}
                        className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-all"
                        title="View Analysis"
                      >
                        <ExternalLink size={18} />
                      </Link>
                      <button className="p-2 rounded-lg hover:bg-emerald-500/10 text-muted-foreground hover:emerald-500 transition-all font-bold">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-all">
                        <Copy size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {companies.length === 0 && !loading && (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-3">
                      <LayoutDashboard size={48} className="opacity-20" />
                      <p className="text-lg font-medium">No companies analyzed yet. Start by entering a URL above.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
