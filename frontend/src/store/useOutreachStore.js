import { create } from 'zustand';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000';

export const useOutreachStore = create((set, get) => ({
  companies: [],
  loading: false,
  error: null,

  fetchCompanies: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_BASE}/outreach`);
      set({ companies: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  analyzeCompany: async (url, usePlaywright = false) => {
    set({ loading: true, error: null });
    try {
      // Assuming profile is stored in settings or hardcoded for now
      const profile = "I am a full-stack developer with expertise in React, Next.js, and FastAPI.";
      
      const response = await axios.post(`${API_BASE}/outreach/run`, {
        company_url: url,
        profile: profile,
        use_playwright: usePlaywright
      });
      
      const newCompany = response.data;
      set(state => ({ 
        companies: [newCompany, ...state.companies],
        loading: false 
      }));
      return newCompany;
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  updateStatus: async (id, status) => {
    try {
      await axios.patch(`${API_BASE}/outreach/${id}`, { status });
      set(state => ({
        companies: state.companies.map(c => c.id === id ? { ...c, status } : c)
      }));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  }
}));
